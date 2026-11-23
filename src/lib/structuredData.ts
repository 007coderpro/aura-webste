const appStoreUrls = [
  "https://apps.apple.com/app/id6745866131",
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
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: `${rootUrl}/pages/contact`,
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
        alternateName: "Aura VPN: Fast & Unlimited",
        url: rootUrl,
        description:
          "Aura VPN uses WireGuard to encrypt the connection between your device and a VPN server.",
        applicationCategory: "SecurityApplication",
        operatingSystem: ["macOS", "iOS", "iPadOS", "Android"],
        downloadUrl: appStoreUrls,
        publisher: {
          "@type": "Organization",
          name: "VerticalRisers Oy",
        },
        softwareHelp: { "@id": `${rootUrl}/support#webpage` },
      },
    ],
  };
}
