import { SiteSettings, Post } from "@/types";

export function getOrganizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": settings.legalName,
    "alternateName": settings.companyName,
    "url": "https://tanhoangnga.vn",
    "logo": "https://tanhoangnga.vn/brand/logo.png",
    "image": settings.ogImage,
    "telephone": settings.phone,
    "email": settings.email,
    "taxID": settings.taxId,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Số 10, ngõ 1194 đường Láng",
      "addressLocality": "Phường Láng",
      "addressRegion": "Hà Nội",
      "addressCountry": "VN"
    },
    "founder": {
      "@type": "Person",
      "name": settings.representative,
      "jobTitle": settings.representativeTitle
    },
    "sameAs": [
      settings.socials.facebook,
      settings.socials.linkedin,
      settings.socials.youtube
    ].filter(Boolean)
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Công ty TNHH Tân Hoàng Nga",
    "url": "https://tanhoangnga.vn",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://tanhoangnga.vn/tim-kiem?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `https://tanhoangnga.vn${item.url}`
    }))
  };
}

export function getArticleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.seoTitle || post.title,
    "description": post.metaDescription || post.excerpt,
    "image": [post.coverImage],
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": post.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Công ty TNHH Tân Hoàng Nga",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tanhoangnga.vn/brand/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tanhoangnga.vn/bai-viet/${post.slug}`
    }
  };
}

export function getServiceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Công ty TNHH Tân Hoàng Nga"
    },
    "url": url,
    "areaServed": {
      "@type": "Country",
      "name": "Vietnam"
    }
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
