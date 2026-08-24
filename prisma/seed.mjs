import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('==> Khởi tạo dữ liệu cơ sở dữ liệu thật (Seeding database)...');

  // 1. Roles
  const roles = [
    {
      id: 'role-super-admin',
      name: 'Tổng Giám đốc (Super Admin)',
      slug: 'super_admin',
      description: 'Toàn quyền quản trị hệ thống, nhân sự, phân quyền, cấu hình và nội dung.',
      isSystem: true,
      permissions: JSON.stringify([
        'posts.create', 'posts.edit_all', 'posts.publish', 'posts.delete', 'posts.pin',
        'media.upload', 'media.delete',
        'categories.manage',
        'users.manage', 'roles.manage',
        'leads.view', 'leads.export', 'leads.assign',
        'settings.manage', 'audit.view'
      ]),
    },
    {
      id: 'role-editor',
      name: 'Biên tập viên Trưởng (Editor)',
      slug: 'editor',
      description: 'Kiểm duyệt, chỉnh sửa mọi bài viết, xuất bản nội dung và ghim trang chủ.',
      isSystem: true,
      permissions: JSON.stringify([
        'posts.create', 'posts.edit_all', 'posts.publish', 'posts.pin',
        'media.upload', 'media.delete',
        'categories.manage',
        'leads.view',
        'audit.view'
      ]),
    },
    {
      id: 'role-creator',
      name: 'Tác giả nội dung (Creator)',
      slug: 'content_creator',
      description: 'Soạn thảo, quản lý bài viết cá nhân và gửi yêu cầu duyệt xuất bản.',
      isSystem: true,
      permissions: JSON.stringify([
        'posts.create', 'posts.edit_own',
        'media.upload'
      ]),
    },
    {
      id: 'role-viewer',
      name: 'Khách quan sát (Viewer)',
      slug: 'viewer',
      description: 'Chỉ xem báo cáo tổng quan và danh sách nội dung công khai.',
      isSystem: true,
      permissions: JSON.stringify(['leads.view']),
    },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });
  }

  // 2. Users
  const users = [
    {
      id: 'u-1',
      name: 'Bùi Thái Hoàng',
      email: 'hoang.bt@tanhoangnga.vn',
      roleSlug: 'super_admin',
      roleName: 'Tổng Giám đốc (Super Admin)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'u-2',
      name: 'Ban Biên Tập Tân Hoàng Nga',
      email: 'editor@tanhoangnga.vn',
      roleSlug: 'editor',
      roleName: 'Biên tập viên Trưởng (Editor)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'u-3',
      name: 'Chuyên viên Sáng tạo Nội dung',
      email: 'creator@tanhoangnga.vn',
      roleSlug: 'content_creator',
      roleName: 'Tác giả nội dung (Creator)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'u-4',
      name: 'Đối tác Khảo sát & Đánh giá',
      email: 'viewer@tanhoangnga.vn',
      roleSlug: 'viewer',
      roleName: 'Khách quan sát (Viewer)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }

  // 3. Categories
  const categories = [
    {
      id: 'cat-1',
      name: 'Chính quyền cơ sở & AI',
      slug: 'chinh-quyen-so',
      description: 'Ứng dụng AI tra cứu tri thức, số hoá văn bản và cải cách hành chính tại cấp phường, xã.',
      isHidden: false,
    },
    {
      id: 'cat-2',
      name: 'AI & Quản trị Doanh nghiệp',
      slug: 'quan-tri-doanh-nghiep',
      description: 'Multi-Model AI Router, CRM 360, CMS đa kênh và tự động hoá điều hành SME.',
      isHidden: false,
    },
    {
      id: 'cat-3',
      name: 'Thương hiệu Số Địa phương',
      slug: 'thuong-hieu-dia-phuong',
      description: 'Số hoá điểm đến, xúc tiến đầu tư, OCOP và kết nối cộng đồng Điện Biên toàn cầu.',
      isHidden: false,
    },
    {
      id: 'cat-4',
      name: 'Cà phê & Chuỗi cung ứng B2B',
      slug: 'nong-nghiep-xuat-khau',
      description: 'Hộ chiếu số cà phê, truy xuất nguồn gốc EUDR, kết nối trực tiếp Vùng trồng đến Buyer quốc tế.',
      isHidden: false,
    },
    {
      id: 'cat-5',
      name: 'Tin tức & Hợp tác Chiến lược',
      slug: 'tin-tuc-su-kien',
      description: 'Thông tin hợp tác cùng ADT Quốc tế, các mốc phát triển và chuyển động công nghệ mới.',
      isHidden: false,
    },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }

  // 4. Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 'global' },
    update: {
      siteName: 'Tân Hoàng Nga',
      hotline: '0981 83 2345',
      email: 'contact@tanhoangnga.vn',
      address: 'Trụ sở: Tòa nhà Cổng Thương Hiệu Số Tân Hoàng Nga, Việt Nam',
      companyTitle: 'CÔNG TY TNHH TÂN HOÀNG NGA',
      footerCopyright: '© 2026 Tân Hoàng Nga. All Rights Reserved. Hợp tác chiến lược công nghệ cùng ADT Quốc tế.',
    },
    create: {
      id: 'global',
      siteName: 'Tân Hoàng Nga',
      hotline: '0981 83 2345',
      email: 'contact@tanhoangnga.vn',
      address: 'Trụ sở: Tòa nhà Cổng Thương Hiệu Số Tân Hoàng Nga, Việt Nam',
      companyTitle: 'CÔNG TY TNHH TÂN HOÀNG NGA',
      footerCopyright: '© 2026 Tân Hoàng Nga. All Rights Reserved. Hợp tác chiến lược công nghệ cùng ADT Quốc tế.',
    },
  });

  // 5. Posts
  const posts = [
    {
      id: 'post-1',
      title: 'Mô hình Trợ lý AI Cấp Phường/Xã: Chuẩn hóa 5 tầng tri thức và 4 nhóm nghiệp vụ chuyên môn',
      slug: 'mo-hinh-tro-ly-ai-cap-phuong-xa-5-tang-tri-thuc',
      excerpt: 'Phân tích chi tiết kiến trúc giải pháp ADT Govina AI — trợ lý thông minh giúp cán bộ cấp cơ sở tra cứu nhanh, chuẩn xác luật pháp, văn bản hành chính và giảm 70% thời gian xử lý hồ sơ.',
      content: `<h2>1. Bối cảnh chuyển đổi số tại cấp cơ sở</h2><p>Cấp phường, xã là nơi tiếp nhận và xử lý trực tiếp khối lượng lớn thủ tục hành chính cho người dân và doanh nghiệp. Cán bộ cơ sở thường đối mặt với việc tra cứu chồng chéo giữa văn bản Trung ương, Tỉnh và quy định địa phương.</p><h2>2. Cấu trúc 5 tầng tri thức chuẩn hóa</h2><p>ADT Govina AI tích hợp 5 tầng dữ liệu được phân quyền chặt chẽ:</p><ul><li>Tầng 1: Luật, Nghị định, Thông tư cấp Trung ương</li><li>Tầng 2: Quyết định, Quy hoạch và Chỉ thị cấp Tỉnh/Thành phố</li><li>Tầng 3: Văn bản chỉ đạo, điều hành của UBND Phường/Xã</li><li>Tầng 4: Quy chế làm việc và biểu mẫu nội bộ</li><li>Tầng 5: Chỉ mục tra cứu và đối chiếu điều khoản tự động</li></ul>`,
      coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
      coverAlt: 'Hội nghị chuyển đổi số chính quyền cơ sở',
      authorId: 'u-1',
      authorName: 'Bùi Thái Hoàng',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      categorySlug: 'chinh-quyen-so',
      categoryName: 'Chính quyền cơ sở & AI',
      tags: JSON.stringify(['AI Phường Xã', 'Govina AI', 'Chính quyền số', 'Cải cách hành chính']),
      status: 'PUBLISHED',
      isPinned: true,
      pinOrder: 1,
      viewCount: 1420,
      readingTimeMinutes: 6,
      publishedAt: new Date('2026-08-10T08:00:00Z'),
    },
    {
      id: 'post-2',
      title: 'Hộ chiếu số Cà phê Việt Nam (CoffeeVN.Today): Đáp ứng chuẩn xanh EUDR và nâng tầm giá trị xuất khẩu',
      slug: 'ho-chieu-so-ca-phe-viet-nam-eudr-xuat-khau',
      excerpt: 'Giải pháp truy xuất nguồn gốc số hóa toàn diện từ nông hộ đến cảng biển, giúp doanh nghiệp cà phê Việt Nam vượt qua rào cản chống phá rừng EUDR của Liên minh Châu Âu.',
      content: `<h2>1. Thách thức lớn từ đạo luật EUDR</h2><p>Quy định chống phá rừng của EU đòi hỏi mọi lô hàng cà phê nhập khẩu phải có tọa độ GPS chính xác của từng mảnh vườn và chứng minh không gây mất rừng sau ngày 31/12/2020.</p><h2>2. Nền tảng CoffeeVN.Today</h2><p>Hệ thống cung cấp Hộ chiếu số (Digital Passport) cho từng bao cà phê, liên kết dữ liệu nông hộ, nhật ký canh tác và chứng nhận kiểm định chất lượng quốc tế.</p>`,
      coverImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
      coverAlt: 'Hạt cà phê chín mọng chất lượng cao',
      authorId: 'u-1',
      authorName: 'Bùi Thái Hoàng',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      categorySlug: 'nong-nghiep-xuat-khau',
      categoryName: 'Cà phê & Chuỗi cung ứng B2B',
      tags: JSON.stringify(['CoffeeVN', 'EUDR', 'Hộ chiếu số', 'Nông sản B2B']),
      status: 'PUBLISHED',
      isPinned: true,
      pinOrder: 2,
      viewCount: 980,
      readingTimeMinutes: 7,
      publishedAt: new Date('2026-08-12T09:00:00Z'),
    },
    {
      id: 'post-3',
      title: 'Multi-Model AI Router: Tối ưu chi phí và tăng tốc hiệu năng xử lý cho doanh nghiệp SME',
      slug: 'multi-model-ai-router-toi-uu-chi-phi-sme',
      excerpt: 'Tại sao doanh nghiệp không nên chỉ dựa vào một mô hình AI duy nhất? Khám phá kiến trúc định tuyến thông minh giữa Claude, GPT và DeepSeek giúp giảm 65% chi phí API.',
      content: `<h2>1. Bài toán chi phí khi ứng dụng AI diện rộng</h2><p>Mỗi mô hình AI có thế mạnh và mức giá token khác nhau. Việc điều phối đúng mô hình cho đúng tác vụ giúp doanh nghiệp vừa tiết kiệm ngân sách vừa đạt độ chính xác tối ưu.</p><h2>2. Cơ chế Router của Orion AI Business OS</h2><p>Tự động phân tích câu lệnh (Prompt intent), đo độ phức tạp và gửi đến mô hình phù hợp nhất trong mili-giây.</p>`,
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      coverAlt: 'Hệ thống phân tích dữ liệu AI doanh nghiệp',
      authorId: 'u-2',
      authorName: 'Ban Biên Tập Tân Hoàng Nga',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      categorySlug: 'quan-tri-doanh-nghiep',
      categoryName: 'AI & Quản trị Doanh nghiệp',
      tags: JSON.stringify(['Orion AI', 'Multi Model', 'Doanh nghiệp SME', 'Tự động hóa']),
      status: 'PUBLISHED',
      isPinned: true,
      pinOrder: 3,
      viewCount: 860,
      readingTimeMinutes: 5,
      publishedAt: new Date('2026-08-14T10:30:00Z'),
    },
    {
      id: 'post-4',
      title: 'DienBien.Today: Đột phá số hóa thương hiệu địa phương và xúc tiến du lịch thông minh',
      slug: 'dienbien-today-so-hoa-thuong-hieu-dia-phuong',
      excerpt: 'Hành trình kết hợp di sản lịch sử hào hùng cùng công nghệ trợ lý số AI, bản đồ số 3D và cổng thông tin xúc tiến đầu tư đặc sản Điện Biên.',
      content: `<h2>1. Sứ mệnh lan tỏa giá trị Điện Biên</h2><p>DienBien.Today không chỉ là một cổng thông tin du lịch, mà là một hệ sinh thái thương hiệu số kết nối người dân, du khách, nhà đầu tư và cộng đồng người Điện Biên khắp năm châu.</p>`,
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      coverAlt: 'Phong cảnh Điện Biên hùng vĩ',
      authorId: 'u-1',
      authorName: 'Bùi Thái Hoàng',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      categorySlug: 'thuong-hieu-dia-phuong',
      categoryName: 'Thương hiệu Số Địa phương',
      tags: JSON.stringify(['Điện Biên', 'Du lịch số', 'Thương hiệu địa phương', 'OCOP']),
      status: 'PUBLISHED',
      isPinned: false,
      viewCount: 650,
      readingTimeMinutes: 5,
      publishedAt: new Date('2026-08-15T14:00:00Z'),
    },
    {
      id: 'post-5',
      title: 'Tân Hoàng Nga ký kết hợp tác chiến lược công nghệ toàn diện cùng ADT Quốc tế',
      slug: 'tan-hoang-nga-hop-tac-chien-luoc-adt-quoc-te',
      excerpt: 'Cột mốc quan trọng đánh dấu sự kết hợp giữa năng lực thương mại, am hiểu địa phương của Tân Hoàng Nga và nền tảng công nghệ AI đỉnh cao từ ADT Global.',
      content: `<h2>1. Sự kiện ký kết bước ngoặt</h2><p>Ngày 01/08/2026, Công ty TNHH Tân Hoàng Nga chính thức công bố thỏa thuận hợp tác chiến lược cùng ADT Quốc tế trong việc phân phối và triển khai các giải pháp AI thế hệ mới tại Việt Nam.</p>`,
      coverImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
      coverAlt: 'Lễ ký kết hợp tác chiến lược doanh nghiệp',
      authorId: 'u-2',
      authorName: 'Ban Biên Tập Tân Hoàng Nga',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      categorySlug: 'tin-tuc-su-kien',
      categoryName: 'Tin tức & Hợp tác Chiến lược',
      tags: JSON.stringify(['Tân Hoàng Nga', 'ADT Quốc tế', 'Hợp tác chiến lược', 'Chuyển đổi số']),
      status: 'PUBLISHED',
      isPinned: false,
      viewCount: 1200,
      readingTimeMinutes: 4,
      publishedAt: new Date('2026-08-16T08:30:00Z'),
    }
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 6. Audit Log
  await prisma.auditLog.create({
    data: {
      action: 'SYSTEM_INIT_DB',
      entity: 'Database',
      entityId: 'db-init',
      summary: 'Khởi tạo thành công cơ sở dữ liệu thật với đầy đủ tài khoản, chuyên mục và bài viết chính thức.',
      actorName: 'Super Admin',
    },
  });

  console.log('✅ Đã nạp toàn bộ dữ liệu thật vào Database SQLite thành công!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
