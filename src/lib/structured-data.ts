import { CLIENT_PORTAL_URL } from "@/lib/content";
import { FAQS, plainAnswer } from "@/lib/faq";

// Schema.org facts that search engines and AI assistants read to answer
// "find me a therapist who…". Every value here is already shown on the site;
// don't add credentials, reviews, ratings or claims that the page doesn't make.
const SITE = "https://www.tiffanyvenegaslcsw.com";

const SPECIALTIES = [
  "Acceptance and Commitment Therapy (ACT)",
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "Trauma-informed care",
  "Anxiety and ADHD",
  "Life transitions",
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Tiffany Venegas, LCSW",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE}/#practice` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#tiffany`,
      name: "Tiffany Venegas",
      honorificSuffix: "MSW, LCSW",
      jobTitle: "Licensed Clinical Social Worker",
      url: SITE,
      image: `${SITE}/images/groundWorkTherapyAbout.jpg`,
      worksFor: { "@id": `${SITE}/#practice` },
      knowsAbout: SPECIALTIES,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Licensed Clinical Social Worker (LCSW) #130210",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of San Francisco" },
        { "@type": "CollegeOrUniversity", name: "University of California, Los Angeles" },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#practice`,
      name: "Tiffany Venegas, LCSW",
      description:
        "Online therapy (telehealth) for teens and adults throughout California with Tiffany Venegas, LCSW. Grounded in ACT, CBT and DBT, with support for anxiety, ADHD, trauma and life transitions.",
      url: SITE,
      logo: `${SITE}/images/mark-ink.png`,
      image: `${SITE}/opengraph-image.png`,
      founder: { "@id": `${SITE}/#tiffany` },
      areaServed: { "@type": "State", name: "California" },
      audience: { "@type": "PeopleAudience", audienceType: "Teens and adults" },
      priceRange: "$140 per session",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Specialities",
        itemListElement: SPECIALTIES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, areaServed: "California" },
        })),
      },
      makesOffer: [
        {
          "@type": "Offer",
          name: "Free 20-minute consultation",
          price: "0",
          priceCurrency: "USD",
          url: CLIENT_PORTAL_URL,
        },
        {
          "@type": "Offer",
          name: "55-minute telehealth therapy session",
          price: "140",
          priceCurrency: "USD",
        },
      ],
      potentialAction: {
        "@type": "ReserveAction",
        name: "Request a free consultation",
        target: CLIENT_PORTAL_URL,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: plainAnswer(a) },
      })),
    },
  ],
};
