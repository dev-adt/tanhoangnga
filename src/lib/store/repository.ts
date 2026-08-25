import { 
  User, Role, Permission, Post, Category, Tag, 
  MediaAsset, Lead, AuditLog, SiteSettings, PostRedirect, LeadStatus, PostStatus 
} from '@/types';
import { 
  INITIAL_SETTINGS, INITIAL_PERMISSIONS, INITIAL_ROLES, 
  INITIAL_USERS, INITIAL_CATEGORIES, INITIAL_TAGS, 
  INITIAL_POSTS, INITIAL_LEADS, INITIAL_MEDIA, INITIAL_AUDIT_LOGS 
} from './seed';

// In-memory global store with singleton pattern across hot-reloads
interface DataStore {
  settings: SiteSettings;
  permissions: Permission[];
  roles: Role[];
  users: User[];
  categories: Category[];
  tags: Tag[];
  posts: Post[];
  leads: Lead[];
  media: MediaAsset[];
  auditLogs: AuditLog[];
  redirects: PostRedirect[];
}

const globalForStore = globalThis as unknown as { __tanhoangnga_store?: DataStore };

if (!globalForStore.__tanhoangnga_store) {
  globalForStore.__tanhoangnga_store = {
    settings: { ...INITIAL_SETTINGS },
    permissions: [...INITIAL_PERMISSIONS],
    roles: [...INITIAL_ROLES],
    users: [...INITIAL_USERS],
    categories: [...INITIAL_CATEGORIES],
    tags: [...INITIAL_TAGS],
    posts: [...INITIAL_POSTS],
    leads: [...INITIAL_LEADS],
    media: [...INITIAL_MEDIA],
    auditLogs: [...INITIAL_AUDIT_LOGS],
    redirects: []
  };
}

const store = globalForStore.__tanhoangnga_store;

export const repo = {
  // SETTINGS
  getSettings(): SiteSettings {
    return { ...store.settings };
  },
  updateSettings(newSettings: Partial<SiteSettings>, actorName = 'Admin'): SiteSettings {
    store.settings = { ...store.settings, ...newSettings };
    repo.addAuditLog('SETTINGS_UPDATE', 'SiteSettings', 'global', `Cập nhật cấu hình website`, actorName);
    return { ...store.settings };
  },

  // POSTS & PINNING RULES
  getPosts(options?: { status?: PostStatus; categorySlug?: string; tagSlug?: string; search?: string; includeHiddenCategories?: boolean }): Post[] {
    let list = [...store.posts];

    // By default, exclude posts from hidden categories for public requests
    if (!options?.includeHiddenCategories) {
      const hiddenCategorySlugs = new Set(
        store.categories.filter(c => c.isHidden).map(c => c.slug)
      );
      list = list.filter(p => !hiddenCategorySlugs.has(p.categorySlug));
    }

    if (options?.status) {
      list = list.filter(p => p.status === options.status);
    }
    if (options?.categorySlug) {
      list = list.filter(p => p.categorySlug === options.categorySlug);
    }
    if (options?.tagSlug) {
      list = list.filter(p => p.tags.includes(options.tagSlug!));
    }
    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => {
      // 1. Pinned posts come first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.isPinned && b.isPinned) {
        return (a.pinOrder || 99) - (b.pinOrder || 99);
      }
      // 2. Unpinned posts sorted by newest date
      const dateA = new Date(a.publishedAt || a.createdAt).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt).getTime();
      return dateB - dateA;
    });
  },

  getPostBySlug(slug: string): Post | undefined {
    return store.posts.find(p => p.slug === slug);
  },

  getPostById(id: string): Post | undefined {
    return store.posts.find(p => p.id === id);
  },

  // Homepage featured posts: Max 3 pinned, fallback to newest published (excludes hidden categories)
  getHomepageFeaturedPosts(): Post[] {
    const hiddenCategorySlugs = new Set(
      store.categories.filter(c => c.isHidden).map(c => c.slug)
    );
    const published = store.posts.filter(p => p.status === 'PUBLISHED' && !hiddenCategorySlugs.has(p.categorySlug));
    
    // Sort pinned posts by pinOrder (1, 2, 3)
    const pinned = published
      .filter(p => p.isPinned && p.pinOrder !== null && p.pinOrder !== undefined)
      .sort((a, b) => (a.pinOrder || 99) - (b.pinOrder || 99))
      .slice(0, 3);

    const pinnedIds = new Set(pinned.map(p => p.id));
    const unpinnedNewest = published
      .filter(p => !pinnedIds.has(p.id))
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

    const result = [...pinned];
    while (result.length < 3 && unpinnedNewest.length > 0) {
      result.push(unpinnedNewest.shift()!);
    }

    return result.slice(0, 3);
  },

  createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>, actorName = 'Admin'): Post {
    const newPost: Post = {
      ...data,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0
    };

    // If marked pinned, ensure constraint
    if (newPost.isPinned && newPost.pinOrder) {
      repo.reorderPins(newPost.id, newPost.pinOrder);
    }

    store.posts.unshift(newPost);
    repo.addAuditLog('POST_CREATE', 'Post', newPost.id, `Tạo bài viết mới: "${newPost.title}"`, actorName);
    return newPost;
  },

  updatePost(id: string, data: Partial<Post>, actorName = 'Admin'): Post {
    const index = store.posts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');

    const oldPost = store.posts[index];

    // Check slug change for 301 redirect
    if (data.slug && data.slug !== oldPost.slug) {
      store.redirects.push({
        id: `red-${Date.now()}`,
        oldSlug: oldPost.slug,
        newSlug: data.slug,
        createdAt: new Date().toISOString()
      });
      repo.addAuditLog('SLUG_REDIRECT', 'Post', id, `Tạo redirect 301 từ "${oldPost.slug}" -> "${data.slug}"`, actorName);
    }

    // Pinning constraint
    if (data.isPinned && data.pinOrder) {
      repo.reorderPins(id, data.pinOrder);
    }

    const updatedPost: Post = {
      ...oldPost,
      ...data,
      updatedAt: new Date().toISOString()
    };

    store.posts[index] = updatedPost;
    repo.addAuditLog('POST_UPDATE', 'Post', id, `Cập nhật bài viết: "${updatedPost.title}"`, actorName);
    return updatedPost;
  },

  deletePost(id: string, actorName = 'Admin'): boolean {
    const index = store.posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    const post = store.posts[index];
    store.posts.splice(index, 1);
    repo.addAuditLog('POST_DELETE', 'Post', id, `Xóa bài viết: "${post.title}"`, actorName);
    return true;
  },

  reorderPins(postId: string, requestedOrder: 1 | 2 | 3): void {
    // If another post has this pin order, swap or clear it
    const existing = store.posts.find(p => p.id !== postId && p.isPinned && p.pinOrder === requestedOrder);
    if (existing) {
      existing.pinOrder = null;
      existing.isPinned = false;
    }
  },

  getRedirectForSlug(slug: string): PostRedirect | undefined {
    return store.redirects.find(r => r.oldSlug === slug);
  },

  checkSlugRedirect(slug: string): PostRedirect | undefined {
    return store.redirects.find(r => r.oldSlug === slug);
  },

  // CATEGORIES & TAGS
  getCategories(includeHidden = false): Category[] {
    let list = [...store.categories];
    if (!includeHidden) {
      list = list.filter(c => !c.isHidden);
    }
    return list.map(c => ({
      ...c,
      postCount: store.posts.filter(p => p.categorySlug === c.slug && p.status === 'PUBLISHED').length
    }));
  },

  getCategoryBySlug(slug: string): Category | undefined {
    return store.categories.find(c => c.slug === slug);
  },

  getTags(): Tag[] {
    return store.tags.map(t => ({
      ...t,
      postCount: store.posts.filter(p => p.tags.includes(t.slug) && p.status === 'PUBLISHED').length
    }));
  },

  createCategory(data: { name: string; slug: string; description: string }, actorName = 'Super Admin'): Category {
    const existing = store.categories.find(c => c.slug === data.slug);
    if (existing) throw new Error(`Chuyên mục với slug "${data.slug}" đã tồn tại.`);

    const cat: Category = { 
      id: `cat-${Date.now()}`, 
      name: data.name.trim(), 
      slug: data.slug.trim(), 
      description: data.description.trim(),
      isHidden: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.categories.push(cat);
    repo.addAuditLog('CATEGORY_CREATE', 'Category', cat.id, `Tạo chuyên mục mới: "${cat.name}" (/${cat.slug})`, actorName);
    return cat;
  },

  updateCategory(id: string, data: Partial<Category>, actorName = 'Super Admin'): Category {
    const cat = store.categories.find(c => c.id === id);
    if (!cat) throw new Error('Category not found');

    const oldName = cat.name;
    const oldSlug = cat.slug;

    if (data.name) cat.name = data.name.trim();
    if (data.slug && data.slug !== oldSlug) {
      // Update all posts belonging to this old slug
      store.posts.forEach(p => {
        if (p.categorySlug === oldSlug) {
          p.categorySlug = data.slug!.trim();
          p.categoryName = cat.name;
        }
      });
      cat.slug = data.slug.trim();
    }
    if (data.description !== undefined) cat.description = data.description.trim();
    if (data.isHidden !== undefined) cat.isHidden = data.isHidden;
    cat.updatedAt = new Date().toISOString();

    repo.addAuditLog('CATEGORY_UPDATE', 'Category', id, `Cập nhật chuyên mục: "${oldName}" -> "${cat.name}"`, actorName);
    return cat;
  },

  toggleCategoryHidden(id: string, actorName = 'Super Admin'): Category {
    const cat = store.categories.find(c => c.id === id);
    if (!cat) throw new Error('Category not found');
    cat.isHidden = !cat.isHidden;
    cat.updatedAt = new Date().toISOString();
    const actionDesc = cat.isHidden ? `Ẩn chuyên mục "${cat.name}" (bài viết được giữ trong data nhưng không hiện ra ngoài)` : `Hiện lại chuyên mục "${cat.name}"`;
    repo.addAuditLog('CATEGORY_VISIBILITY', 'Category', id, actionDesc, actorName);
    return cat;
  },

  deleteCategory(id: string, actorName = 'Super Admin'): { deletedCategory: Category; deletedPostCount: number } {
    const index = store.categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');

    const cat = store.categories[index];
    // Delete all posts belonging to this category
    const initialPostCount = store.posts.length;
    store.posts = store.posts.filter(p => p.categorySlug !== cat.slug);
    const deletedPostCount = initialPostCount - store.posts.length;

    // Remove category
    store.categories.splice(index, 1);

    repo.addAuditLog(
      'CATEGORY_DELETE', 
      'Category', 
      id, 
      `Xóa vĩnh viễn chuyên mục "${cat.name}" và toàn bộ ${deletedPostCount} bài viết trực thuộc`, 
      actorName
    );

    return { deletedCategory: cat, deletedPostCount };
  },

  // LEADS & CRM
  getLeads(options?: { status?: LeadStatus; search?: string }): Lead[] {
    let list = [...store.leads];
    if (options?.status) {
      list = list.filter(l => l.status === options.status);
    }
    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      list = list.filter(l => 
        l.fullName.toLowerCase().includes(q) || 
        l.organization.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q)
      );
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createLead(data: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const newLead: Lead = {
      ...data,
      id: `lead-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      notes: []
    };
    store.leads.unshift(newLead);
    repo.addAuditLog('LEAD_SUBMIT', 'Lead', newLead.id, `Tiếp nhận yêu cầu tư vấn mới từ ${newLead.fullName} (${newLead.organization})`, 'Public User');
    return newLead;
  },

  updateLeadStatus(id: string, status: LeadStatus, note?: string, actorName = 'Admin'): Lead {
    const lead = store.leads.find(l => l.id === id);
    if (!lead) throw new Error('Lead not found');
    lead.status = status;
    if (note) {
      lead.notes = lead.notes || [];
      lead.notes.push(`[${new Date().toLocaleDateString('vi-VN')}] ${actorName}: ${note}`);
    }
    repo.addAuditLog('LEAD_STATUS_CHANGE', 'Lead', id, `Chuyển trạng thái lead sang ${status}`, actorName);
    return lead;
  },

  // USERS & ROLES (RBAC with Super Admin Protection)
  getUsers(): User[] {
    return [...store.users];
  },

  getUserById(id: string): User | undefined {
    return store.users.find(u => u.id === id);
  },

  getUserByEmail(email: string): User | undefined {
    return store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  getRoles(): Role[] {
    return [...store.roles];
  },

  getPermissions(): Permission[] {
    return [...store.permissions];
  },

  updateRolePermissions(roleId: string, permissions: string[], actorName = 'Super Admin'): Role {
    const role = store.roles.find(r => r.id === roleId);
    if (!role) throw new Error('Role not found');
    role.permissions = permissions;
    repo.addAuditLog('ROLE_PERMISSION_UPDATE', 'Role', roleId, `Cập nhật quyền cho vai trò "${role.name}"`, actorName);
    return role;
  },

  updateUser(id: string, data: Partial<User>, actorName = 'Super Admin'): User {
    const user = store.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');

    // Protect last active Super Admin
    if (user.roleSlug === 'super_admin' && (data.roleSlug && data.roleSlug !== 'super_admin' || data.status === 'DEACTIVATED')) {
      const activeSuperAdmins = store.users.filter(u => u.roleSlug === 'super_admin' && u.status === 'ACTIVE');
      if (activeSuperAdmins.length <= 1) {
        throw new Error('Không thể hạ quyền hoặc vô hiệu hóa Super Admin duy nhất trong hệ thống.');
      }
    }

    Object.assign(user, data, { updatedAt: new Date().toISOString() });
    repo.addAuditLog('USER_UPDATE', 'User', id, `Cập nhật tài khoản: ${user.name} (${user.email})`, actorName);
    return user;
  },

  createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, actorName = 'Super Admin'): User {
    const newUser: User = {
      ...data,
      id: `u-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.users.push(newUser);
    repo.addAuditLog('USER_CREATE', 'User', newUser.id, `Tạo tài khoản mới: ${newUser.name} (${newUser.email})`, actorName);
    return newUser;
  },

  // MEDIA ASSETS
  getMedia(): MediaAsset[] {
    return [...store.media].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  createMedia(media: Omit<MediaAsset, 'id' | 'createdAt'>, actorName = 'Admin'): MediaAsset {
    const newMedia: MediaAsset = {
      ...media,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    store.media.unshift(newMedia);
    repo.addAuditLog('MEDIA_UPLOAD', 'MediaAsset', newMedia.id, `Tải lên file: ${newMedia.name}`, actorName);
    return newMedia;
  },

  // AUDIT LOGS
  getAuditLogs(limit = 100): AuditLog[] {
    return [...store.auditLogs]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },

  addAuditLog(action: string, entity: string, entityId: string, summary: string, actorName = 'Hệ thống'): void {
    store.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      actorId: 'u-1',
      actorName,
      actorEmail: 'system@tanhoangnga.vn',
      action,
      entity,
      entityId,
      summary,
      ipAddress: '127.0.0.1',
      createdAt: new Date().toISOString()
    });
  }
};
