import React from 'react';
import Link from 'next/link';
import { Coffee, Globe, ShieldCheck, FileCheck, CheckCircle2, ArrowRight, ExternalLink, Cpu, Compass, Layers, Milestone } from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { LeadForm } from '@/components/marketing/LeadForm';
import { getServiceSchema } from '@/lib/seo/schema';

export const metadata = {
  title: 'CoffeeVN.Today — Dữ Liệu & Kết Nối B2B Cà Phê Việt Nam Quốc Tế | Tân Hoàng Nga',
  description: 'Nền tảng Hộ chiếu số (Coffee Passport), truy xuất nguồn gốc chuẩn EUDR và kết nối B2B từ Vùng trồng đến Buyer quốc tế.'
};

export default function CoffeeVnTodayPage() {
  const serviceSchema = getServiceSchema(
    'CoffeeVN.Today — Nền Tảng Dữ Liệu & Kết Nối B2B Cà Phê Việt Nam',
    'Hạ tầng dữ liệu số nông nghiệp, hộ chiếu số cà phê, hỗ trợ tuân thủ EUDR và cổng kết nối RFQ cho nhà mua hàng quốc tế.',
    'https://tanhoangnga.vn/giai-phap/coffeevn-today'
  );

  const components = [
    {
      title: 'Digital Origin (Gốc Số Vùng Trồng)',
      desc: 'Bản đồ số hóa vùng trồng, độ cao, giống cà phê (Arabica, Robusta), mùa vụ, quy trình canh tác và định vị tọa độ GIS.'
    },
    {
      title: 'Supplier Showroom (Hồ Sơ Nhà Cung Cấp)',
      desc: 'Hồ sơ doanh nghiệp, HTX xuất khẩu chuẩn tiếng Anh, công suất nhà máy, chứng nhận chất lượng (4C, Fairtrade, Organic, UTZ).'
    },
    {
      title: 'Coffee Passport (Hộ Chiếu Số Lô Hàng)',
      desc: 'Thông số chi tiết từng lô: Điểm Cupping score, phương pháp sơ chế (Wasbed, Honey, Natural), độ ẩm, kích cỡ hạt và chứng từ kiểm nghiệm.'
    },
    {
      title: 'Buyer Portal (Cổng Nhà Mua Hàng)',
      desc: 'Hệ thống tìm kiếm thông minh, shortlist nhà cung cấp, gửi yêu cầu báo giá (RFQ), đặt mẫu thử (Sample request) và hẹn lịch họp B2B.'
    },
    {
      title: 'AI Coffee Connector',
      desc: 'Tìm kiếm bằng ngôn ngữ tự nhiên, tự động ghép nối nhu cầu của buyer với năng lực của supplier và dịch thuật đa ngôn ngữ.'
    },
    {
      title: 'Content Factory Đa Ngôn Ngữ',
      desc: 'Hệ thống bài viết chuyên sâu về câu chuyện nguồn gốc cà phê Việt Nam, chuẩn SEO quốc tế và cấu trúc GEO cho AI discovery.'
    }
  ];

  const roadmap = [
    { time: '0 – 3 Tháng', title: 'MVP & Taxonomy', desc: 'Chuẩn hóa cấu trúc dữ liệu, số hóa hồ sơ mẫu cho vùng trồng tiêu biểu và nhóm buyer thử nghiệm.' },
    { time: '4 – 6 Tháng', title: 'Buyer Portal & RFQ', desc: 'Ra mắt Cổng Buyer Portal, quy trình gửi yêu cầu mẫu thử, hệ thống CRM và chuyển ngữ đa ngôn ngữ.' },
    { time: '7 – 9 Tháng', title: 'Mở Rộng & Matchmaking', desc: 'Mở rộng supplier các vùng Tây Nguyên, Tây Bắc; tổ chức các chiến dịch xúc tiến và kết nối B2B quốc tế.' },
    { time: '10 – 12 Tháng', title: 'Tối Ưu & Nhân Rộng', desc: 'Đo lường KPI chuyển đổi, nâng cấp thuật toán AI matching và chuẩn hóa dịch vụ tư vấn xuất khẩu.' }
  ];

  const faqs = [
    {
      question: 'CoffeeVN.Today hỗ trợ tuân thủ quy định EUDR của Liên minh Châu Âu như thế nào?',
      answer: 'CoffeeVN.Today cung cấp cấu trúc lưu trữ và trích xuất dữ liệu định vị địa lý (GIS) của từng thửa đất/vùng trồng, bằng chứng không gây mất rừng và lịch sử canh tác, giúp doanh nghiệp xuất khẩu có cơ sở dữ liệu sẵn sàng cung cấp cho cơ quan kiểm định và đối tác EU.'
    },
    {
      question: 'Hệ thống niềm tin 3 tầng dữ liệu hoạt động ra sao?',
      answer: 'Dữ liệu trên nền tảng được gắn nhãn minh bạch theo 3 cấp độ: (1) Dữ liệu do thành viên tự khai, (2) Dữ liệu đã đối chiếu chứng từ hóa đơn/chứng nhận, và (3) Dữ liệu được xác minh thực địa bởi đơn vị thứ ba độc lập.'
    },
    {
      question: 'Quy trình kết nối một buyer quốc tế với nhà cung cấp diễn ra như thế nào?',
      answer: 'Hành trình 8 bước chuẩn mực: Nhận diện (Awareness) → Tìm kiếm (Discovery) → Đánh giá hồ sơ (Evaluation) → Gửi RFQ → Gửi mẫu thử (Sample) → Họp B2B trực tuyến (Meeting) → Đàm phán (Negotiation) → Đóng giao dịch thương mại.'
    }
  ];

  return (
    <div className="py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Breadcrumb & Hero */}
        <div className="max-w-4xl space-y-6">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/giai-phap" className="hover:underline">Giải pháp</Link> / CoffeeVN.Today
          </div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
            <Coffee className="w-4 h-4" />
            <span>Nông Nghiệp & Kết Nối B2B Quốc Tế</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            CoffeeVN.Today — Từ Vùng Trồng Đến Buyer Quốc Tế
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Hạ tầng dữ liệu số và cổng xúc tiến thương mại B2B cho ngành cà phê Việt Nam. Minh bạch nguồn gốc xuất xứ, số hóa Hộ chiếu số (Coffee Passport) và hỗ trợ tuân thủ các quy định khắt khe của thị trường toàn cầu.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <a
              href="https://coffeevn.today/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-glow transition-all flex items-center gap-2"
            >
              <span>Khám phá CoffeeVN.Today</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#register"
              className="px-6 py-3.5 rounded-xl font-bold text-navy-text bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Đăng ký Hồ sơ Vùng trồng / Supplier
            </a>
          </div>
        </div>

        {/* 6 Core Components */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Cấu trúc nền tảng</div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">6 Cấu Phần Trọng Yếu Của CoffeeVN</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((comp, i) => (
              <div key={i} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-base font-bold text-navy-text mb-2">{comp.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Tier Trust System & EUDR Compliance */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-card to-slate-900 text-white border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hệ Thống Niềm Tin</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">3 Tầng Dữ Liệu Xác Thực & Chuẩn EUDR</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mỗi thông tin trên CoffeeVN.Today đều được phân định cấp độ minh bạch: Từ dữ liệu tự khai của HTX, đến dữ liệu đối chiếu chứng từ phân tích mẫu (Lab test) và dữ liệu được chứng nhận bởi các tổ chức quốc tế độc lập.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="font-bold text-amber-400 block mb-1">Tầng 1: Tự Khai Báo (Self-declared)</span>
              <p className="text-slate-300">Thông tin cơ bản về diện tích, giống cây và sản lượng do nông hộ/HTX cung cấp.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="font-bold text-cyan-400 block mb-1">Tầng 2: Đối Chiếu Chứng Từ (Documented)</span>
              <p className="text-slate-300">Biên bản bàn giao, hóa đơn, chứng chỉ quy trình VietGAP, kiểm nghiệm độ ẩm.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="font-bold text-mint-accent block mb-1">Tầng 3: Xác Thực Độc Lập (Verified)</span>
              <p className="text-slate-300">Kiểm định thực địa GIS, chứng nhận quốc tế còn hiệu lực (Organic, Fairtrade, Rainforest Alliance).</p>
            </div>
          </div>
        </div>

        {/* 12-Month Roadmap */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Lộ trình triển khai</div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">Lộ Trình Phát Triển 12 Tháng</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-700 px-2 py-0.5 rounded bg-amber-50 inline-block mb-2">
                    {step.time}
                  </span>
                  <h3 className="text-base font-bold text-navy-text mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <FaqAccordion faqs={faqs} title="Câu Hỏi Thường Gặp Về CoffeeVN.Today" />

        {/* CTA Lead Form */}
        <div id="register" className="max-w-3xl mx-auto pt-6">
          <LeadForm 
            defaultSolution="coffeevn-today"
            title="Đăng Ký Khảo Sát & Số Hóa Vùng Trồng Cà Phê"
            subtitle="Dành cho các HTX, Vùng trồng, Doanh nghiệp xuất khẩu và Hiệp hội nông sản"
          />
        </div>

      </div>
    </div>
  );
}
