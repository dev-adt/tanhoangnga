import { 
  User, Role, Permission, Post, Category, Tag, 
  MediaAsset, Lead, AuditLog, SiteSettings, PostRedirect 
} from '@/types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: "Tân Hoàng Nga",
  legalName: "CÔNG TY TNHH TÂN HOÀNG NGA",
  taxId: "0111452097",
  address: "Số 10, ngõ 1194 đường Láng, Phường Láng, thành phố Hà Nội",
  representative: "Ông Bùi Thái Hoàng",
  representativeTitle: "Tổng Giám đốc",
  phone: "0856 040 205",
  email: "contact@tanhoangnga.vn",
  partnerContractNumber: "Hợp đồng số 203-140826/ADT",
  defaultSeoTitle: "Công ty TNHH Tân Hoàng Nga — Kết nối công nghệ, Kiến tạo giá trị",
  defaultMetaDescription: "Cổng thông tin & hồ sơ năng lực Tân Hoàng Nga — Đầu mối phân phối, triển khai các giải pháp AI Govina, Orion AI Business OS, DienBien.Today và CoffeeVN.Today.",
  ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  socials: {
    facebook: "https://facebook.com/tanhoangnga",
    zalo: "https://zalo.me/0856040205",
    linkedin: "https://linkedin.com/company/tanhoangnga",
    youtube: "https://youtube.com/@tanhoangnga"
  }
};

export const INITIAL_PERMISSIONS: Permission[] = [
  { id: 'p1', slug: 'dashboard.view', name: 'Xem Dashboard', category: 'settings', description: 'Truy cập vào giao diện quản trị tổng quan' },
  { id: 'p2', slug: 'posts.create', name: 'Tạo bài viết', category: 'posts', description: 'Tạo bản nháp bài viết mới' },
  { id: 'p3', slug: 'posts.read', name: 'Đọc bài viết', category: 'posts', description: 'Xem danh sách và chi tiết bài viết' },
  { id: 'p4', slug: 'posts.update.own', name: 'Sửa bài của mình', category: 'posts', description: 'Chỉnh sửa bài do mình tạo ra' },
  { id: 'p5', slug: 'posts.update.any', name: 'Sửa mọi bài viết', category: 'posts', description: 'Chỉnh sửa tất cả bài viết trên hệ thống' },
  { id: 'p6', slug: 'posts.publish', name: 'Xuất bản bài viết', category: 'posts', description: 'Thay đổi trạng thái sang Published / Scheduled' },
  { id: 'p7', slug: 'posts.delete', name: 'Xóa bài viết', category: 'posts', description: 'Xóa hoặc lưu trữ bài viết' },
  { id: 'p8', slug: 'posts.pin', name: 'Ghim bài nổi bật', category: 'posts', description: 'Gán và sắp xếp 3 bài ghim trang chủ' },
  { id: 'p9', slug: 'media.manage.own', name: 'Quản lý Media cá nhân', category: 'media', description: 'Tải lên và xóa media của mình' },
  { id: 'p10', slug: 'media.manage.any', name: 'Quản lý toàn bộ Media', category: 'media', description: 'Quản lý thư viện media toàn site' },
  { id: 'p11', slug: 'categories.manage', name: 'Quản lý Chuyên mục & Tag', category: 'categories', description: 'Thêm, sửa, xóa chuyên mục và từ khóa' },
  { id: 'p12', slug: 'users.invite', name: 'Mời thành viên', category: 'users', description: 'Gửi lời mời tham gia quản trị' },
  { id: 'p13', slug: 'users.manage', name: 'Quản lý Tài khoản', category: 'users', description: 'Cấp quyền, khóa hoặc chỉnh sửa thành viên' },
  { id: 'p14', slug: 'roles.manage', name: 'Quản lý Phân quyền', category: 'roles', description: 'Tạo role và cấu hình ma trận permission' },
  { id: 'p15', slug: 'leads.read', name: 'Xem yêu cầu tư vấn', category: 'leads', description: 'Xem danh sách lead gửi từ form' },
  { id: 'p16', slug: 'leads.manage', name: 'Xử lý Lead & CRM', category: 'leads', description: 'Cập nhật trạng thái, ghi chú và phân công' },
  { id: 'p17', slug: 'settings.manage', name: 'Cấu hình Website', category: 'settings', description: 'Sửa thông tin pháp lý, SEO và thông báo' },
  { id: 'p18', slug: 'audit.read', name: 'Xem Nhật ký Kiểm toán', category: 'audit', description: 'Truy vết toàn bộ thao tác hệ thống' }
];

export const INITIAL_ROLES: Role[] = [
  {
    id: 'role-superadmin',
    name: 'Super Admin',
    slug: 'super_admin',
    description: 'Toàn quyền quản trị hệ thống, phân quyền và cấu hình website.',
    isSystem: true,
    permissions: INITIAL_PERMISSIONS.map(p => p.slug)
  },
  {
    id: 'role-admin',
    name: 'Admin',
    slug: 'admin',
    description: 'Quản lý thành viên, nội dung, media, leads và cấu hình cơ bản.',
    isSystem: true,
    permissions: [
      'dashboard.view', 'posts.create', 'posts.read', 'posts.update.any', 'posts.publish', 
      'posts.delete', 'posts.pin', 'media.manage.any', 'categories.manage', 'users.invite', 
      'users.manage', 'leads.read', 'leads.manage', 'settings.manage', 'audit.read'
    ]
  },
  {
    id: 'role-editor',
    name: 'Biên tập viên (Editor)',
    slug: 'editor',
    description: 'Duyệt, chỉnh sửa, ghim bài và xuất bản nội dung; xử lý media và leads.',
    isSystem: false,
    permissions: [
      'dashboard.view', 'posts.create', 'posts.read', 'posts.update.any', 'posts.publish', 
      'posts.pin', 'media.manage.any', 'categories.manage', 'leads.read'
    ]
  },
  {
    id: 'role-creator',
    name: 'Tác giả (Content Creator)',
    slug: 'content_creator',
    description: 'Tạo và chỉnh sửa bản nháp bài viết, tải media cá nhân.',
    isSystem: false,
    permissions: [
      'dashboard.view', 'posts.create', 'posts.read', 'posts.update.own', 'media.manage.own'
    ]
  },
  {
    id: 'role-viewer',
    name: 'Người xem (Viewer)',
    slug: 'viewer',
    description: 'Chỉ xem báo cáo, danh sách nội dung và lead được cấp quyền.',
    isSystem: false,
    permissions: ['dashboard.view', 'posts.read', 'leads.read']
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    name: 'Bùi Thái Hoàng',
    email: 'hoang.bt@tanhoangnga.vn',
    roleSlug: 'super_admin',
    roleName: 'Tổng Giám đốc / Super Admin',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-08-01T08:00:00Z',
    updatedAt: '2026-08-18T08:00:00Z'
  },
  {
    id: 'u-2',
    name: 'Ban Biên Tập Tân Hoàng Nga',
    email: 'editor@tanhoangnga.vn',
    roleSlug: 'editor',
    roleName: 'Biên tập viên Trưởng',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-08-05T09:30:00Z',
    updatedAt: '2026-08-18T08:00:00Z'
  },
  {
    id: 'u-3',
    name: 'Chuyên viên Nội dung',
    email: 'creator@tanhoangnga.vn',
    roleSlug: 'content_creator',
    roleName: 'Tác giả nội dung',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-08-10T14:15:00Z',
    updatedAt: '2026-08-18T08:00:00Z'
  },
  {
    id: 'u-4',
    name: 'Đối tác Khảo sát',
    email: 'viewer@tanhoangnga.vn',
    roleSlug: 'viewer',
    roleName: 'Khách quan sát',
    status: 'INVITED',
    createdAt: '2026-08-16T11:00:00Z',
    updatedAt: '2026-08-16T11:00:00Z'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Chính quyền cơ sở & AI',
    slug: 'chinh-quyen-so',
    description: 'Ứng dụng AI tra cứu tri thức, số hoá văn bản và cải cách hành chính tại cấp phường, xã.'
  },
  {
    id: 'cat-2',
    name: 'AI & Quản trị Doanh nghiệp',
    slug: 'quan-tri-doanh-nghiep',
    description: 'Multi-Model AI Router, CRM 360, CMS đa kênh và tự động hoá điều hành SME.'
  },
  {
    id: 'cat-3',
    name: 'Thương hiệu Số Địa phương',
    slug: 'thuong-hieu-dia-phuong',
    description: 'Số hoá điểm đến, xúc tiến đầu tư, OCOP và kết nối cộng đồng Điện Biên toàn cầu.'
  },
  {
    id: 'cat-4',
    name: 'Cà phê & Chuỗi cung ứng B2B',
    slug: 'nong-nghiep-xuat-khau',
    description: 'Hộ chiếu số cà phê, truy xuất nguồn gốc EUDR, kết nối trực tiếp Vùng trồng đến Buyer quốc tế.'
  },
  {
    id: 'cat-5',
    name: 'Tin tức & Hợp tác Chiến lược',
    slug: 'tin-tuc-su-kien',
    description: 'Thông tin hợp tác cùng ADT Quốc tế, các mốc phát triển và chuyển động công nghệ mới.'
  }
];

export const INITIAL_TAGS: Tag[] = [
  { id: 'tag-1', name: 'ADT Govina AI', slug: 'adt-govina-ai' },
  { id: 'tag-2', name: 'Orion AI Business OS', slug: 'orion-ai-os' },
  { id: 'tag-3', name: 'DienBien.Today', slug: 'dien-bien-today' },
  { id: 'tag-4', name: 'CoffeeVN.Today', slug: 'coffeevn-today' },
  { id: 'tag-5', name: 'Chuyển đổi số', slug: 'chuyen-doi-so' },
  { id: 'tag-6', name: 'Multi-Model AI', slug: 'multi-model-ai' },
  { id: 'tag-7', name: 'Truy xuất nguồn gốc', slug: 'truy-xuat-nguon-goc' },
  { id: 'tag-8', name: 'Cải cách hành chính', slug: 'cai-cach-hanh-chinh' }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'ADT Govina AI — Bước đột phá trợ lý tri thức số cho cấp phường, xã tại Việt Nam',
    slug: 'adt-govina-ai-tro-ly-tri-thuc-so-phuong-xa',
    excerpt: 'Giải pháp cấu trúc 5 lớp tri thức và mô hình 1+4 giúp cán bộ cơ sở tra cứu nhanh, chuẩn xác quy định pháp luật và phục vụ người dân tối ưu.',
    content: `
      <h2>1. Thách thức tra cứu văn bản tại chính quyền cơ sở</h2>
      <p>Tại các phường, xã trên toàn quốc, cán bộ chuyên môn mỗi ngày phải xử lý khối lượng lớn hồ sơ hành chính với hàng nghìn văn bản quy phạm pháp luật thay đổi liên tục từ Trung ương, tỉnh/thành phố đến địa phương. Việc tra cứu thủ công gây mất nhiều giờ làm việc và tiềm ẩn nguy cơ sai sót căn cứ pháp lý.</p>
      
      <h2>2. Kiến trúc 5 lớp tri thức độc quyền</h2>
      <p>ADT Govina AI được thiết kế với kiến trúc phân tầng 5 lớp tri thức:</p>
      <ul>
        <li><strong>Lớp 1:</strong> Luật, Nghị định, Thông tư và văn bản Trung ương.</li>
        <li><strong>Lớp 2:</strong> Văn bản của Tỉnh/Thành phố và các cơ quan chuyên môn.</li>
        <li><strong>Lớp 3:</strong> Văn bản do Phường/Xã ban hành hoặc được phép áp dụng.</li>
        <li><strong>Lớp 4:</strong> Quy trình nội bộ, biểu mẫu và tri thức nghiệp vụ phân quyền.</li>
        <li><strong>Lớp 5:</strong> Chỉ mục, logic xử lý, cập nhật và truy xuất tức thì.</li>
      </ul>

      <h2>3. Mô hình triển khai 1+4 và tỷ lệ 80/20</h2>
      <p>Hệ thống bao gồm 1 Trợ lý tổng hợp dùng chung và 4 nhóm trợ lý chuyên môn bám sát cơ cấu (HĐND-UBND, Kinh tế, Văn hóa - Xã hội, Hạ tầng - Đô thị). Nhờ 80% dữ liệu lõi dùng chung đã được chuẩn hóa sẵn, thời gian triển khai thực tế chỉ từ 3–7 ngày khi dữ liệu địa phương sẵn sàng.</p>

      <h2>4. Minh chứng thực tế và Bản quyền</h2>
      <p>Theo tài liệu hồ sơ, case study tại Phường Ô Chợ Dừa (Hà Nội) triển khai từ 10/10/2025 đã đạt 94,73 điểm và xếp thứ 1/126 đơn vị trong đánh giá chỉ số CCHC; giải pháp đạt Giải Nhì cuộc thi Tìm kiếm ý tưởng CCHC Hà Nội lần II (2025). Sản phẩm được bảo hộ bản quyền phần mềm theo Giấy chứng nhận số 3794/2026/QTG ngày 16/04/2026 thuộc sở hữu của ADT.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    coverAlt: 'Hệ thống trợ lý AI cho chính quyền cơ sở',
    authorId: 'u-1',
    authorName: 'Bùi Thái Hoàng',
    categorySlug: 'chinh-quyen-so',
    categoryName: 'Chính quyền cơ sở & AI',
    tags: ['adt-govina-ai', 'chuyen-doi-so', 'cai-cach-hanh-chinh'],
    status: 'PUBLISHED',
    publishedAt: '2026-08-12T09:00:00Z',
    createdAt: '2026-08-12T08:00:00Z',
    updatedAt: '2026-08-18T08:00:00Z',
    isPinned: true,
    pinOrder: 1,
    seoTitle: 'ADT Govina AI — Bộ trợ lý AI cho Phường Xã | Tân Hoàng Nga',
    metaDescription: 'Khám phá giải pháp ADT Govina AI dành cho phường/xã do Tân Hoàng Nga phân phối và triển khai, cấu trúc 5 lớp tri thức, chuẩn xác và an toàn dữ liệu.',
    focusKeyword: 'ADT Govina AI',
    canonicalUrl: 'https://tanhoangnga.vn/bai-viet/adt-govina-ai-tro-ly-tri-thuc-so-phuong-xa',
    viewCount: 1420,
    readingTimeMinutes: 5,
    faqData: [
      {
        question: 'ADT Govina AI có thay thế cán bộ đưa ra quyết định hành chính không?',
        answer: 'Không. Hệ thống đóng vai trò trợ lý hỗ trợ tra cứu căn cứ, biểu mẫu và gợi ý đối chiếu. Mọi quyết định hành chính thuộc thẩm quyền và trách nhiệm của cán bộ và cơ quan nhà nước.'
      },
      {
        question: 'Thời gian triển khai cho một phường/xã mất bao lâu?',
        answer: 'Nhờ 80% kho dữ liệu lõi dùng chung đã hoàn thiện, quy trình tích hợp và đào tạo cán bộ thông thường diễn ra trong 3 đến 7 ngày làm việc.'
      }
    ],
    citations: [
      { title: 'Giấy chứng nhận đăng ký Quyền tác giả số 3794/2026/QTG', url: '#' },
      { title: 'Hồ sơ năng lực Tân Hoàng Nga 2026', url: '#' }
    ]
  },
  {
    id: 'post-2',
    title: 'Orion AI Business OS — Hợp nhất AI đa mô hình và hạ tầng điều hành doanh nghiệp toàn diện',
    slug: 'orion-ai-business-os-he-dieu-hanh-doanh-nghiep',
    excerpt: 'Chấm dứt trải nghiệm phần mềm phân mảnh với kiến trúc Core-to-Orbit tích hợp CRM, CMS, E-commerce, Dự án và AI Router thông minh.',
    content: `
      <h2>1. Bài toán phân mảnh công cụ trong doanh nghiệp hiện đại</h2>
      <p>Doanh nghiệp trung bình hiện nay sử dụng từ 5-10 phần mềm độc lập: CRM, quản lý kho/bán hàng, CMS website, công cụ quản lý dự án và các tài khoản AI riêng lẻ. Điều này tạo nên các "ốc đảo dữ liệu", tăng chi phí bản quyền và phân tán năng suất của nhân sự.</p>
      
      <h2>2. Kiến trúc Core-to-Orbit độc đáo</h2>
      <p>Orion giải quyết triệt để vấn đề trên bằng kiến trúc đồng tâm:</p>
      <ul>
        <li><strong>Lõi trung tâm:</strong> AI Router đa mô hình (OpenAI, Claude, Gemini, DeepSeek, Local AI), Data Layer và hạ tầng bảo mật.</li>
        <li><strong>Vòng quỹ đạo (Orbit):</strong> 5 phân hệ chuyên sâu gồm CRM 360°, E-commerce đa kênh, CMS Page Builder, Quản trị Dự án và Quy trình Phê duyệt AI.</li>
      </ul>

      <h2>3. AI Multi-Model Router — Tối ưu chi phí và hiệu suất</h2>
      <p>Bộ định tuyến AI tự động phân loại prompt: tác vụ đơn giản được định tuyến sang mô hình siêu nhanh tiết kiệm token; tác vụ phân tích logic phức tạp được chuyển đến mô hình suy luận sâu. Hệ thống có cơ chế Fallback tự động khi có sự cố API nhà cung cấp.</p>

      <h2>4. Tùy chọn Cloud và Self-host làm chủ dữ liệu</h2>
      <p>Orion hỗ trợ linh hoạt cả phiên bản SaaS Cloud bảo mật lẫn Self-host trên hạ tầng máy chủ riêng của doanh nghiệp (MinIO/S3, PostgreSQL), đáp ứng trọn vẹn tiêu chuẩn an toàn dữ liệu và tuân thủ nội bộ.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    coverAlt: 'Hệ điều hành doanh nghiệp Orion AI Business OS',
    authorId: 'u-1',
    authorName: 'Bùi Thái Hoàng',
    categorySlug: 'quan-tri-doanh-nghiep',
    categoryName: 'AI & Quản trị Doanh nghiệp',
    tags: ['orion-ai-os', 'multi-model-ai', 'chuyen-doi-so'],
    status: 'PUBLISHED',
    publishedAt: '2026-08-14T10:30:00Z',
    createdAt: '2026-08-14T09:00:00Z',
    updatedAt: '2026-08-18T08:00:00Z',
    isPinned: true,
    pinOrder: 2,
    seoTitle: 'Orion AI Business OS — Nền tảng Quản trị Doanh nghiệp Đa mô hình AI',
    metaDescription: 'Giải pháp hợp nhất CRM, CMS, E-commerce và Multi-Model AI Router giúp doanh nghiệp tăng tốc vận hành và làm chủ dữ liệu tuyệt đối.',
    focusKeyword: 'Orion AI Business OS',
    canonicalUrl: 'https://tanhoangnga.vn/bai-viet/orion-ai-business-os-he-dieu-hanh-doanh-nghiep',
    viewCount: 1180,
    readingTimeMinutes: 6,
    faqData: [
      {
        question: 'Doanh nghiệp có thể tự lưu trữ (Self-host) Orion trên máy chủ riêng không?',
        answer: 'Có. Orion hỗ trợ cả mô hình Cloud lẫn On-Premise/Self-host trên máy chủ riêng của khách hàng để đảm bảo chủ quyền dữ liệu tối đa.'
      }
    ],
    citations: [
      { title: 'Tài liệu kiến trúc Orion AI Business OS v2026', url: '#' }
    ]
  },
  {
    id: 'post-3',
    title: 'CoffeeVN.Today — Xây dựng hộ chiếu số và cầu nối B2B từ vùng trồng cà phê đến buyer toàn cầu',
    slug: 'coffeevn-today-ho-chieu-so-ca-phe-viet-nam',
    excerpt: 'Nền tảng dữ liệu số kết nối Vùng trồng, HTX và Nhà xuất khẩu Cà phê Việt Nam với các nhà mua hàng quốc tế, đáp ứng chuẩn truy xuất EUDR.',
    content: `
      <h2>1. Thực trạng ngành cà phê Việt Nam và rào cản kết nối B2B</h2>
      <p>Việt Nam là một trong những cường quốc xuất khẩu cà phê hàng đầu thế giới, tuy nhiên phần lớn giá trị gia tăng vẫn chưa tương xứng do thiếu dữ liệu số minh bạch, hồ sơ vùng trồng chưa chuẩn hóa tiếng Anh và các quy định khắt khe mới như EUDR (chống phá rừng của Liên minh Châu Âu).</p>
      
      <h2>2. Định vị From Farm to Buyer</h2>
      <p>CoffeeVN.Today đóng vai trò hạ tầng dữ liệu và cổng xúc tiến thương mại quốc tế, liên kết: Vùng trồng/HTX → Sản phẩm & Lô hàng → Nhà xuất khẩu → Dữ liệu xác thực → Buyer toàn cầu.</p>

      <h2>3. Sáu cấu phần cốt lõi của CoffeeVN.Today</h2>
      <ul>
        <li><strong>Digital Origin:</strong> Bản đồ số vùng trồng, độ cao, giống, quy trình canh tác và tọa độ GIS.</li>
        <li><strong>Supplier Showroom:</strong> Hồ sơ nhà cung cấp chuẩn quốc tế, chứng nhận chất lượng, công suất.</li>
        <li><strong>Coffee Passport (Hộ chiếu số):</strong> Cupping score, phương pháp sơ chế, chứng từ kiểm nghiệm theo từng lô.</li>
        <li><strong>Buyer Portal:</strong> Hệ thống RFQ, yêu cầu gửi mẫu thử (Sample request) và đặt lịch họp B2B.</li>
        <li><strong>AI Coffee Connector:</strong> Tìm kiếm thông minh bằng ngôn ngữ tự nhiên, matching nhu cầu người mua và nhà cung cấp.</li>
        <li><strong>Content Factory:</strong> Hệ thống bài viết chuyên sâu đa ngôn ngữ phục vụ SEO quốc tế và GEO AI.</li>
      </ul>

      <h2>4. Hệ thống niềm tin 3 tầng dữ liệu</h2>
      <p>Dữ liệu trên nền tảng được phân tách minh bạch: Dữ liệu thành viên tự khai → Dữ liệu đối chiếu chứng từ → Dữ liệu xác minh thực địa từ bên thứ ba độc lập.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
    coverAlt: 'Hạt cà phê và hộ chiếu số CoffeeVN.Today',
    authorId: 'u-1',
    authorName: 'Bùi Thái Hoàng',
    categorySlug: 'nong-nghiep-xuat-khau',
    categoryName: 'Cà phê & Chuỗi cung ứng B2B',
    tags: ['coffeevn-today', 'truy-xuat-nguon-goc', 'chuyen-doi-so'],
    status: 'PUBLISHED',
    publishedAt: '2026-08-15T11:00:00Z',
    createdAt: '2026-08-15T09:30:00Z',
    updatedAt: '2026-08-18T08:00:00Z',
    isPinned: true,
    pinOrder: 3,
    seoTitle: 'CoffeeVN.Today — Nền tảng Hộ chiếu Số Cà phê Việt Nam | B2B Portal',
    metaDescription: 'Kết nối vùng trồng và HTX cà phê Việt Nam với nhà mua hàng quốc tế qua hộ chiếu số, bản đồ truy xuất nguồn gốc và nền tảng RFQ chuẩn mực.',
    focusKeyword: 'CoffeeVN.Today',
    canonicalUrl: 'https://tanhoangnga.vn/bai-viet/coffeevn-today-ho-chieu-so-ca-phe-viet-nam',
    viewCount: 950,
    readingTimeMinutes: 5,
    faqData: [
      {
        question: 'CoffeeVN.Today có trực tiếp thu mua hay làm trung gian xuất khẩu không?',
        answer: 'Không. CoffeeVN.Today là nền tảng công nghệ và dữ liệu số kết nối B2B minh bạch. Hai bên tự chủ động đàm phán thương mại và ký kết hợp đồng.'
      }
    ],
    citations: [
      { title: 'Báo cáo Ebook Dự án CoffeeVN.Today 2026', url: '#' }
    ]
  },
  {
    id: 'post-4',
    title: 'DienBien.Today — Cánh cửa thương hiệu số đưa văn hóa, du lịch và cơ hội đầu tư Điện Biên vươn xa',
    slug: 'dienbien-today-thuong-hieu-so-dia-phuong',
    excerpt: 'Nền tảng thương hiệu số địa phương tích hợp Trợ lý AI du lịch, bản đồ OCOP và cổng xúc tiến đầu tư mở kết nối Điện Biên với toàn cầu.',
    content: `
      <h2>1. Khát vọng số hóa vùng đất lịch sử Điện Biên</h2>
      <p>Điện Biên sở hữu bề dày lịch sử hào hùng, cảnh sắc thiên nhiên kỳ vĩ, bản sắc của 19 dân tộc anh em và cửa ngõ giao thương quốc tế Tây Trang. Tuy nhiên, việc tiếp cận thông tin du lịch, đặc sản OCOP và chính sách đầu tư còn phân tán.</p>
      
      <h2>2. Trợ lý AI — Trái tim của DienBien.Today</h2>
      <p>Trợ lý AI DienBien.Today được huấn luyện trên kho dữ liệu mở chính thống của địa phương, có khả năng gợi ý lịch trình tour cá nhân hóa theo thời gian và ngân sách, giải đáp thông tin lễ hội và định hướng các dự án thu hút đầu tư trọng điểm.</p>

      <h2>3. Năm phân hệ kết nối toàn diện</h2>
      <ul>
        <li><strong>Cổng thông tin & Dữ liệu mở:</strong> Kho tri thức số hóa về văn hóa, lịch sử và quy hoạch.</li>
        <li><strong>Hệ sinh thái Doanh nghiệp & OCOP:</strong> Gian hàng số cho nông sản đặc sản vùng cao.</li>
        <li><strong>Du lịch & Trải nghiệm:</strong> Hướng dẫn điểm đến, lịch trình và ẩm thực bản địa.</li>
        <li><strong>Xúc tiến Đầu tư:</strong> Danh mục dự án ưu tiên và chính sách thu hút đối tác.</li>
        <li><strong>Cộng đồng Điện Biên toàn cầu:</strong> Kết nối chuyên gia, kiều bào và người Điện Biên xa quê.</li>
      </ul>
    `,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    coverAlt: 'Thiên nhiên và danh thắng Điện Biên',
    authorId: 'u-1',
    authorName: 'Bùi Thái Hoàng',
    categorySlug: 'thuong-hieu-dia-phuong',
    categoryName: 'Thương hiệu Số Địa phương',
    tags: ['dien-bien-today', 'chuyen-doi-so'],
    status: 'PUBLISHED',
    publishedAt: '2026-08-16T14:00:00Z',
    createdAt: '2026-08-16T10:00:00Z',
    updatedAt: '2026-08-18T08:00:00Z',
    isPinned: false,
    pinOrder: null,
    seoTitle: 'DienBien.Today — Cổng Thương hiệu Số & Trợ lý AI Du lịch Điện Biên',
    metaDescription: 'Khám phá Điện Biên qua nền tảng số DienBien.Today tích hợp Trợ lý AI du lịch, bản đồ OCOP và cơ hội xúc tiến đầu tư bền vững.',
    focusKeyword: 'DienBien.Today',
    canonicalUrl: 'https://tanhoangnga.vn/bai-viet/dienbien-today-thuong-hieu-so-dia-phuong',
    viewCount: 820,
    readingTimeMinutes: 4,
    citations: [
      { title: 'Đề án Phát triển Thương hiệu Số Địa phương DienBien.Today', url: '#' }
    ]
  },
  {
    id: 'post-5',
    title: 'Hợp tác chiến lược Tân Hoàng Nga & ADT: Kiến tạo hệ sinh thái chuyển đổi số thực chất và bền vững',
    slug: 'hop-tac-chien-luoc-tan-hoang-nga-adt',
    excerpt: 'Hợp đồng số 203-140826/ADT mở ra sự kết hợp chặt chẽ giữa năng lực R&D công nghệ lõi của ADT và năng lực triển khai, phân phối của Tân Hoàng Nga.',
    content: `
      <h2>1. Nguyên tắc hợp tác bình đẳng và bổ trợ</h2>
      <p>Dựa trên Hợp đồng số 203-140826/ADT, Công ty TNHH Tân Hoàng Nga và Công ty Cổ phần ADT Quốc tế xác lập mối quan hệ đối tác chiến lược sâu rộng. Trong đó, ADT là chủ thể nghiên cứu phát triển công nghệ lõi, còn Tân Hoàng Nga đảm nhận vai trò phát triển thị trường, khảo sát nghiệp vụ, tổ chức dữ liệu và đồng hành chăm sóc khách hàng.</p>
      
      <h2>2. Phân vai trách nhiệm minh bạch</h2>
      <p>Mọi dự án đều có quy chuẩn SLA, đầu mối thương mại và kỹ thuật riêng biệt. Khách hàng luôn giữ trọn quyền sở hữu và bảo mật dữ liệu của mình.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    coverAlt: 'Hợp tác chiến lược Tân Hoàng Nga và ADT',
    authorId: 'u-1',
    authorName: 'Bùi Thái Hoàng',
    categorySlug: 'tin-tuc-su-kien',
    categoryName: 'Tin tức & Hợp tác Chiến lược',
    tags: ['chuyen-doi-so', 'adt-govina-ai', 'orion-ai-os'],
    status: 'PUBLISHED',
    publishedAt: '2026-08-17T08:00:00Z',
    createdAt: '2026-08-17T08:00:00Z',
    updatedAt: '2026-08-18T08:00:00Z',
    isPinned: false,
    pinOrder: null,
    seoTitle: 'Hợp tác chiến lược Tân Hoàng Nga & ADT Quốc tế',
    metaDescription: 'Thông tin hợp tác phân phối và triển khai các giải pháp AIGov và AI Business OS giữa Tân Hoàng Nga và ADT.',
    focusKeyword: 'Hợp tác chiến lược ADT Tân Hoàng Nga',
    canonicalUrl: 'https://tanhoangnga.vn/bai-viet/hop-tac-chien-luoc-tan-hoang-nga-adt',
    viewCount: 640,
    readingTimeMinutes: 4
  },
  {
    id: 'post-6',
    title: 'Mô hình triển khai 6 bước: Đảm bảo khả năng tiếp nhận và đo lường giá trị thực tế',
    slug: 'mo-hinh-trien-khai-6-buoc-tan-hoang-nga',
    excerpt: 'Khám phá → Thiết kế → Chuẩn bị → Triển khai → Tiếp nhận → Mở rộng: Phương pháp luận triển khai có trách nhiệm từ Tân Hoàng Nga.',
    content: `
      <h2>1. Vì sao chuyển đổi số cần quy trình chuẩn?</h2>
      <p>Nhiều dự án công nghệ thất bại không phải vì thiếu tính năng, mà vì thiếu sự đồng hành trong khâu chuẩn bị dữ liệu và quản trị sự thay đổi của người dùng. Quy trình 6 bước của Tân Hoàng Nga bảo đảm tính khả thi ngay từ ngày đầu.</p>
      
      <h2>2. Chi tiết 6 bước triển khai</h2>
      <ol>
        <li><strong>Bước 1 - Khám phá:</strong> Phỏng vấn, khảo sát quy trình, dữ liệu và hạ tầng hiện trạng.</li>
        <li><strong>Bước 2 - Thiết kế:</strong> Chốt phạm vi MVP, kiến trúc, phân quyền và chỉ số KPI.</li>
        <li><strong>Bước 3 - Chuẩn bị:</strong> Chuẩn hóa dữ liệu, thiết lập cấu hình và kiểm thử nội bộ.</li>
        <li><strong>Bước 4 - Triển khai:</strong> Đào tạo theo vai trò, chạy pilot và nghiệm thu kỹ thuật.</li>
        <li><strong>Bước 5 - Tiếp nhận (Adoption):</strong> Đồng hành tuyến 1, hỗ trợ người dùng và nhật ký cải tiến.</li>
        <li><strong>Bước 6 - Mở rộng:</strong> Đo lường KPI định kỳ, tối ưu mô hình và bổ sung use case mới.</li>
      </ol>
    `,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    coverAlt: 'Quy trình triển khai 6 bước chuyển đổi số',
    authorId: 'u-1',
    authorName: 'Bùi Thái Hoàng',
    categorySlug: 'quan-tri-doanh-nghiep',
    categoryName: 'AI & Quản trị Doanh nghiệp',
    tags: ['chuyen-doi-so'],
    status: 'PUBLISHED',
    publishedAt: '2026-08-17T15:00:00Z',
    createdAt: '2026-08-17T14:00:00Z',
    updatedAt: '2026-08-18T08:00:00Z',
    isPinned: false,
    pinOrder: null,
    seoTitle: 'Quy trình triển khai 6 bước chuyển đổi số | Tân Hoàng Nga',
    metaDescription: 'Mô hình triển khai 6 bước chuẩn hóa của Tân Hoàng Nga giúp khách hàng khai thác tri thức và ứng dụng AI hiệu quả cao.',
    focusKeyword: 'Mô hình triển khai 6 bước',
    canonicalUrl: 'https://tanhoangnga.vn/bai-viet/mo-hinh-trien-khai-6-buoc-tan-hoang-nga',
    viewCount: 510,
    readingTimeMinutes: 4
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'Nguyễn Văn Đức',
    organization: 'UBND Phường Kim Mã, Ba Đình, Hà Nội',
    email: 'duc.nguyen@kimma.gov.vn',
    phone: '0912 345 678',
    solutionInterest: 'adt-govina-ai',
    message: 'Chúng tôi muốn đăng ký khảo sát và demo giải pháp Trợ lý AI tra cứu văn bản hành chính cho cán bộ một cửa và văn phòng UBND.',
    consent: true,
    status: 'NEW',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'govina_hanoi',
    createdAt: '2026-08-17T16:30:00Z',
    notes: ['Đã tiếp nhận yêu cầu, xếp lịch liên hệ sáng 19/08/2026.']
  },
  {
    id: 'lead-2',
    fullName: 'Trần Thị Mai Lan',
    organization: 'Công ty Cổ phần Nông sản Tây Bắc',
    email: 'lan.tran@taybacfarm.vn',
    phone: '0988 765 432',
    solutionInterest: 'coffeevn-today',
    message: 'HTX chúng tôi có 150ha vùng trồng Arabica tại Mường Ảng - Điện Biên, muốn tìm hiểu về Hộ chiếu số và kết nối người mua EU.',
    consent: true,
    status: 'IN_PROGRESS',
    utmSource: 'direct',
    createdAt: '2026-08-16T10:15:00Z',
    notes: ['Đã gọi điện tư vấn bước đầu về tiêu chuẩn EUDR và hồ sơ GIS vùng trồng.']
  },
  {
    id: 'lead-3',
    fullName: 'Lê Hoàng Phong',
    organization: 'Công ty TNHH Giải Pháp Công Nghệ Phong Vũ',
    email: 'phong.le@phongvutech.com',
    phone: '0903 888 999',
    solutionInterest: 'orion-ai-business-os',
    message: 'Doanh nghiệp 60 nhân sự muốn triển khai Orion bản Self-host trên cụm máy chủ nội bộ. Cần báo giá và phương án kỹ thuật.',
    consent: true,
    status: 'QUALIFIED',
    utmSource: 'linkedin',
    createdAt: '2026-08-15T14:45:00Z',
    notes: ['Đã gửi hồ sơ kỹ thuật Self-host và ma trận phân quyền 7 vai trò.']
  }
];

export const INITIAL_MEDIA: MediaAsset[] = [
  {
    id: 'media-1',
    name: 'govina-hero-banner.jpg',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    mimeType: 'image/jpeg',
    sizeBytes: 345000,
    width: 1200,
    height: 800,
    alt: 'Govina AI Trợ lý chính quyền cơ sở',
    uploaderName: 'Bùi Thái Hoàng',
    createdAt: '2026-08-12T08:00:00Z'
  },
  {
    id: 'media-2',
    name: 'orion-os-architecture.jpg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    mimeType: 'image/jpeg',
    sizeBytes: 412000,
    width: 1200,
    height: 750,
    alt: 'Orion AI Multi Model Architecture',
    uploaderName: 'Bùi Thái Hoàng',
    createdAt: '2026-08-14T09:00:00Z'
  },
  {
    id: 'media-3',
    name: 'coffee-farm-origin.jpg',
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
    mimeType: 'image/jpeg',
    sizeBytes: 520000,
    width: 1200,
    height: 800,
    alt: 'Vùng trồng cà phê CoffeeVN',
    uploaderName: 'Ban Biên Tập',
    createdAt: '2026-08-15T09:30:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    actorId: 'u-1',
    actorName: 'Bùi Thái Hoàng',
    actorEmail: 'hoang.bt@tanhoangnga.vn',
    action: 'SYSTEM_INIT',
    entity: 'SYSTEM',
    entityId: 'global',
    summary: 'Khởi tạo hệ thống Cổng thương hiệu số Tân Hoàng Nga và nạp dữ liệu mẫu ban đầu.',
    ipAddress: '127.0.0.1',
    createdAt: '2026-08-18T08:00:00Z'
  },
  {
    id: 'log-2',
    actorId: 'u-1',
    actorName: 'Bùi Thái Hoàng',
    actorEmail: 'hoang.bt@tanhoangnga.vn',
    action: 'POST_PIN',
    entity: 'Post',
    entityId: 'post-1',
    summary: 'Ghim bài viết "ADT Govina AI" vào vị trí số 1 trên Trang chủ.',
    ipAddress: '127.0.0.1',
    createdAt: '2026-08-18T08:05:00Z'
  }
];
