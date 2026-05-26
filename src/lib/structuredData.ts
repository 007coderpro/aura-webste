const appStoreUrls = [
  "https://apps.apple.com/fi/app/aura-vpn-fast-unlimited/id6745866131",
  "https://apps.apple.com/us/app/aura-vpn-fast-unlimited/id6745866131",
  "https://play.google.com/store/apps/details?id=com.auravpn",
];

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

export function getAuraSiteJsonLd(baseUrl: string) {
  const rootUrl = normalizeBaseUrl(baseUrl);
  const organizationId = `${rootUrl}/#organization`;
  const websiteId = `${rootUrl}/#website`;
  const softwareApplicationId = `${rootUrl}/#software-application`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Aura VPN",
        url: rootUrl,
        logo: {
          "@type": "ImageObject",
          url: `${rootUrl}/aura_logo.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Aura VPN",
        url: rootUrl,
        publisher: {
          "@id": organizationId,
        },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareApplicationId,
        name: "Aura VPN",
        url: rootUrl,
        description:
          "Aura VPN is a private, secure VPN app for safer browsing on macOS, iOS, and Android.",
        applicationCategory: "SecurityApplication",
        operatingSystem: ["macOS", "iOS", "Android"],
        downloadUrl: appStoreUrls,
        publisher: {
          "@id": organizationId,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };
}
