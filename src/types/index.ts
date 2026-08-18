export type RoleSlug = 
  | 'super_admin'
  | 'admin'
  | 'content_creator'
  | 'editor'
  | 'viewer';

export type UserStatus = 'ACTIVE' | 'INVITED' | 'SUSPENDED' | 'DEACTIVATED';

export type PostStatus = 'DRAFT' | 'IN_REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'QUALIFIED' | 'CLOSED';

export type SolutionCategory = 
  | 'adt-govina-ai'
  | 'orion-ai-business-os'
  | 'dienbien-today'
  | 'coffeevn-today'
  | 'partnership'
  | 'general';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  roleSlug: RoleSlug;
  roleName: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  slug: RoleSlug | string;
  description: string;
  isSystem: boolean;
  permissions: string[];
}

export interface Permission {
  id: string;
  slug: string;
  name: string;
  category: 'posts' | 'media' | 'categories' | 'users' | 'roles' | 'leads' | 'settings' | 'audit';
  description: string;
}

export interface PostFaq {
  question: string;
  answer: string;
}

export interface Citation {
  title: string;
  url: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Structured HTML or JSON string
  coverImage: string;
  coverAlt: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  categorySlug: string;
  categoryName: string;
  tags: string[];
  status: PostStatus;
  publishedAt: string | null;
  scheduledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  pinOrder?: 1 | 2 | 3 | null;
  pinExpiresAt?: string | null;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyword?: string;
  ogImage?: string;
  faqData?: PostFaq[];
  citations?: Citation[];
  viewCount: number;
  readingTimeMinutes: number;
}

export interface PostRedirect {
  id: string;
  oldSlug: string;
  newSlug: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  alt: string;
  uploaderName: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  solutionInterest: string;
  message: string;
  consent: boolean;
  status: LeadStatus;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
  notes?: string[];
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorEmail: string;
  action: string;
  entity: string;
  entityId: string;
  summary: string;
  ipAddress: string;
  userAgent?: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  taxId: string;
  address: string;
  representative: string;
  representativeTitle: string;
  phone: string;
  email: string;
  partnerContractNumber: string;
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  ogImage: string;
  socials: {
    facebook?: string;
    zalo?: string;
    linkedin?: string;
    youtube?: string;
  };
}
