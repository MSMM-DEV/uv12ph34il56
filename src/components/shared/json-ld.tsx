export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MSMM Engineering, LLC",
    url: "https://msmmeng.com",
    logo: "https://msmmeng.com/logo.png",
    description:
      "MSMM Engineering is a New Orleans based engineering firm specializing in design services for flood protection, water/wastewater modeling, and civil works projects.",
    foundingDate: "2011",
    founder: {
      "@type": "Person",
      name: "Manish Mardia",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(504) 570-6098",
      contactType: "customer service",
    },
    sameAs: ["https://www.linkedin.com/company/msmm-engineering-llc/"],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "4508 Clearview Parkway, Suite 200",
        addressLocality: "Metairie",
        addressRegion: "LA",
        postalCode: "70006",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "4640 Carrollton Avenue, Suite 220",
        addressLocality: "New Orleans",
        addressRegion: "LA",
        postalCode: "70119",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "13850 Gulf Freeway, Suite 202A",
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77034",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "16018 Highway 73",
        addressLocality: "Prairieville",
        addressRegion: "LA",
        postalCode: "70769",
        addressCountry: "US",
      },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MSMM Engineering, LLC",
    url: "https://msmmeng.com",
    telephone: "(504) 570-6098",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4508 Clearview Parkway, Suite 200",
      addressLocality: "Metairie",
      addressRegion: "LA",
      postalCode: "70006",
      addressCountry: "US",
    },
    areaServed: ["Louisiana", "Texas", "Gulf South"],
    serviceType: [
      "Civil Engineering",
      "Flood Control Engineering",
      "Water & Wastewater Engineering",
      "Coastal Restoration",
      "Hydraulic & Hydrologic Modeling",
      "GIS Mapping",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}
