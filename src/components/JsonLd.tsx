import { site } from "@/content/site";

export function JsonLd() {
  const base = site.website.replace(/\/$/, "");

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    url: base,
    email: site.email,
    telephone: site.phone,
    jobTitle: "Software Engineer",
    description: site.hero.support,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: [site.social.linkedin, site.social.github],
    knowsAbout: [
      "Full-Stack Development",
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "FastAPI",
      "tRPC",
      "Agentic RAG",
      "PostgreSQL",
      "SaaS",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Central Punjab",
    },
    worksFor: {
      "@type": "Organization",
      name: "Liffey Logics",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.fullName} Portfolio`,
    url: base,
    description: site.seo.description,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: site.fullName,
    },
  };

  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: base,
    name: `${site.fullName} | Software Engineer`,
    mainEntity: {
      "@type": "Person",
      name: site.fullName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }}
      />
    </>
  );
}
