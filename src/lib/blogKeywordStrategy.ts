import type { BlogCtaType } from "@/lib/blogs";

export type BlogKeywordIntent =
  | "Informational"
  | "Commercial"
  | "Comparison"
  | "Troubleshooting"
  | "Support"
  | "Brand";

export type BlogKeywordTarget = {
  slug: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  volume: number | null;
  difficulty: number | null;
  priority: "P0" | "P1" | "P2" | "P3";
  category: string;
  tags: string[];
  searchIntent: BlogKeywordIntent;
  ctaLabel: string;
  ctaType: BlogCtaType;
  seoTitle: string;
  seoDescription: string;
  outline: string[];
  internalLinks: string[];
};

export type BlogKeywordWriterBrief = {
  heading: string;
  readerProblem: string;
  articleAngle: string;
  productAngle: string;
  secondaryKeywordGuidance: string;
  outlineGuidance: string[];
  internalLinkGuidance: string[];
  faqIdeas: string[];
  checklist: string[];
  metadata: {
    slug: string;
    canonicalUrl: string;
    seoTitle: string;
    seoDescription: string;
  };
};

export const blogKeywordCategories = [
  "VPN Guides",
  "iPhone VPN",
  "Privacy",
  "Security",
  "Public Wi-Fi",
  "Troubleshooting",
  "Comparisons",
  "Aura VPN Support",
];

export const blogKeywordIntents: BlogKeywordIntent[] = [
  "Informational",
  "Commercial",
  "Comparison",
  "Troubleshooting",
  "Support",
  "Brand",
];

export const blogKeywordTargets: BlogKeywordTarget[] = [
  {
    slug: "aura-vpn-review",
    title: "Aura VPN Review",
    primaryKeyword: "aura vpn review",
    secondaryKeywords: ["aura vpn reviews"],
    volume: null,
    difficulty: null,
    priority: "P1",
    category: "Aura VPN Support",
    tags: ["aura-vpn", "reviews", "privacy"],
    searchIntent: "Brand",
    ctaLabel: "Read Aura VPN reviews",
    ctaType: "download",
    seoTitle: "Aura VPN Review",
    seoDescription: "Review Aura VPN features, privacy protections, supported devices, and whether it fits everyday browsing needs.",
    outline: ["Aura VPN at a glance", "Privacy and security features", "Device support", "Who Aura VPN is for"],
    internalLinks: ["/", "/pages/privacy"],
  },
  {
    slug: "turn-off-aura-vpn-on-pc",
    title: "How to Turn Off Aura VPN on PC",
    primaryKeyword: "turn off aura vpn on pc",
    secondaryKeywords: ["disable aura vpn on pc", "turn off vpn on pc"],
    volume: null,
    difficulty: null,
    priority: "P1",
    category: "Aura VPN Support",
    tags: ["support", "windows", "vpn-troubleshooting"],
    searchIntent: "Support",
    ctaLabel: "Get Aura VPN support",
    ctaType: "none",
    seoTitle: "How to Turn Off Aura VPN on PC",
    seoDescription: "Follow simple steps to turn off Aura VPN on a PC, confirm the VPN is disconnected, and troubleshoot connection status.",
    outline: ["Turn off Aura VPN from the app", "Check Windows VPN settings", "Confirm the VPN is disconnected", "When to contact support"],
    internalLinks: ["/pages/contact", "/blog/how-to-check-if-vpn-is-working"],
  },
  {
    slug: "vpn-for-iphone",
    title: "Best VPN for iPhone",
    primaryKeyword: "best vpn for iphone",
    secondaryKeywords: ["vpn for iphone", "iphone vpn app", "best iphone vpn"],
    volume: null,
    difficulty: null,
    priority: "P1",
    category: "iPhone VPN",
    tags: ["iphone", "mobile-vpn", "vpn-app"],
    searchIntent: "Commercial",
    ctaLabel: "Download Aura VPN for iPhone",
    ctaType: "download",
    seoTitle: "Best VPN for iPhone: What to Look For",
    seoDescription: "Compare what makes a good iPhone VPN, including simple setup, privacy protection, connection reliability, and everyday use.",
    outline: ["What makes a good iPhone VPN", "When to use a VPN on iPhone", "Setup and reliability", "Why choose Aura VPN"],
    internalLinks: ["/blog/how-to-set-up-vpn-on-iphone", "/blog/what-does-vpn-mean-on-iphone"],
  },
  {
    slug: "how-to-set-up-vpn-on-iphone",
    title: "How to Set Up a VPN on iPhone",
    primaryKeyword: "how to set up vpn on iphone",
    secondaryKeywords: ["how to get a vpn on iphone", "how to turn on vpn on iphone", "how to use vpn on iphone"],
    volume: 1000,
    difficulty: 25,
    priority: "P1",
    category: "iPhone VPN",
    tags: ["iphone", "mobile-vpn", "vpn-setup"],
    searchIntent: "Informational",
    ctaLabel: "Download Aura VPN for iPhone",
    ctaType: "download",
    seoTitle: "How to Set Up a VPN on iPhone: Simple Guide",
    seoDescription: "Learn how to set up and turn on a VPN on iPhone, what the VPN setting means, and when to use Aura VPN.",
    outline: ["What a VPN does on iPhone", "How to install a VPN app", "How to turn the VPN on", "When to use a VPN"],
    internalLinks: ["/vpn-for-iphone", "/blog/what-does-vpn-mean-on-iphone"],
  },
  {
    slug: "what-does-vpn-mean-on-iphone",
    title: "What Does VPN Mean on iPhone?",
    primaryKeyword: "what does vpn mean on iphone",
    secondaryKeywords: ["what is vpn on my iphone", "what does vpn do on iphone", "vpn meaning on iphone", "vpn on iphone", "iphone vpn setting"],
    volume: null,
    difficulty: null,
    priority: "P1",
    category: "iPhone VPN",
    tags: ["iphone", "mobile-vpn", "privacy"],
    searchIntent: "Informational",
    ctaLabel: "Learn how Aura VPN works",
    ctaType: "download",
    seoTitle: "What Does VPN Mean on iPhone?",
    seoDescription: "Learn what the VPN setting on iPhone means, how VPN protection works, and when Aura VPN can help protect browsing.",
    outline: ["What the iPhone VPN label means", "What a VPN protects", "What a VPN does not hide", "When to turn it on"],
    internalLinks: ["/vpn-for-iphone", "/blog/how-to-set-up-vpn-on-iphone"],
  },
  {
    slug: "vpn-turns-off-iphone",
    title: "Why Your VPN Turns Off on iPhone",
    primaryKeyword: "vpn turns off iphone",
    secondaryKeywords: ["vpn not working on iphone", "vpn keeps turning off iphone", "iphone vpn disconnects", "why does vpn turn off on iphone"],
    volume: 1000,
    difficulty: 23,
    priority: "P1",
    category: "Troubleshooting",
    tags: ["iphone", "mobile-vpn", "vpn-troubleshooting"],
    searchIntent: "Troubleshooting",
    ctaLabel: "Try Aura VPN on iPhone",
    ctaType: "download",
    seoTitle: "Why Your VPN Turns Off on iPhone",
    seoDescription: "See why a VPN can turn off on iPhone, how to check common settings, and when to choose a simpler VPN app.",
    outline: ["Common reasons VPN turns off", "iPhone settings to check", "Network and battery issues", "When to reinstall or switch"],
    internalLinks: ["/vpn-for-iphone", "/blog/vpn-keeps-disconnecting"],
  },
  {
    slug: "icloud-private-relay-vs-vpn",
    title: "iCloud Private Relay vs VPN",
    primaryKeyword: "icloud private relay vs vpn",
    secondaryKeywords: ["is icloud private relay a vpn", "private relay vs vpn", "icloud relay vpn"],
    volume: 480,
    difficulty: 11,
    priority: "P1",
    category: "Comparisons",
    tags: ["icloud-private-relay", "privacy", "vpn-comparison"],
    searchIntent: "Comparison",
    ctaLabel: "Compare protection options",
    ctaType: "download",
    seoTitle: "iCloud Private Relay vs VPN: Key Differences",
    seoDescription: "Compare iCloud Private Relay and VPN protection, including browser privacy, app traffic, location, and everyday use.",
    outline: ["What iCloud Private Relay does", "What a VPN does", "Key differences", "Which option fits your needs"],
    internalLinks: ["/blog/can-isp-see-history-with-vpn", "/blog/does-vpn-hide-search-history"],
  },
  {
    slug: "can-isp-see-history-with-vpn",
    title: "Can Your ISP See Your Browsing History With a VPN?",
    primaryKeyword: "can my isp see what sites i visit with vpn",
    secondaryKeywords: ["can your isp see what you do with a vpn", "can isp see browsing history with vpn"],
    volume: 260,
    difficulty: 27,
    priority: "P1",
    category: "Privacy",
    tags: ["privacy", "isp", "search-history"],
    searchIntent: "Informational",
    ctaLabel: "Protect your browsing with Aura VPN",
    ctaType: "download",
    seoTitle: "Can Your ISP See Browsing History With a VPN?",
    seoDescription: "Learn what your ISP can and cannot see when you use a VPN, plus practical tips for stronger browsing privacy.",
    outline: ["What your ISP normally sees", "What changes with a VPN", "What a VPN cannot hide", "Privacy steps that help"],
    internalLinks: ["/blog/does-vpn-hide-search-history", "/blog/public-wifi-vpn"],
  },
  {
    slug: "does-vpn-hide-search-history",
    title: "Does a VPN Hide Your Search History?",
    primaryKeyword: "does vpn hide search history",
    secondaryKeywords: [
      "does a vpn hide your search history from wifi",
      "does vpn hide browsing history from wifi owner",
      "does vpn hide browsing history",
      "vpn search history",
    ],
    volume: 90,
    difficulty: 26,
    priority: "P1",
    category: "Privacy",
    tags: ["privacy", "search-history", "public-wifi"],
    searchIntent: "Informational",
    ctaLabel: "Improve browsing privacy",
    ctaType: "download",
    seoTitle: "Does a VPN Hide Your Search History?",
    seoDescription: "Find out when a VPN can hide search activity from networks or ISPs, and what remains visible in browsers or accounts.",
    outline: ["Who may see search history", "What a VPN hides", "What browsers and accounts keep", "How to improve privacy"],
    internalLinks: ["/blog/can-isp-see-history-with-vpn", "/blog/icloud-private-relay-vs-vpn"],
  },
  {
    slug: "public-wifi-vpn",
    title: "Public Wi-Fi VPN: When You Need One",
    primaryKeyword: "public wifi vpn",
    secondaryKeywords: [
      "vpn public wifi",
      "does vpn protect you on public wifi",
      "vpn on public wifi",
      "hotel wifi vpn",
      "vpn for public wifi",
      "public wi-fi security",
      "is public wifi safe with vpn",
    ],
    volume: null,
    difficulty: null,
    priority: "P1",
    category: "Public Wi-Fi",
    tags: ["public-wifi", "security", "privacy"],
    searchIntent: "Informational",
    ctaLabel: "Protect your connection on public Wi-Fi",
    ctaType: "download",
    seoTitle: "Public Wi-Fi VPN: When You Need One",
    seoDescription: "Learn why public Wi-Fi can be risky, when to use a VPN, and how Aura VPN helps protect everyday browsing.",
    outline: ["Why public Wi-Fi is risky", "What a VPN helps protect", "When to turn VPN on", "Public Wi-Fi safety checklist"],
    internalLinks: ["/blog/how-to-check-if-vpn-is-working", "/blog/can-isp-see-history-with-vpn"],
  },
  {
    slug: "how-to-check-if-vpn-is-working",
    title: "How to Check If Your VPN Is Working",
    primaryKeyword: "how to check if vpn is working",
    secondaryKeywords: ["how to know if vpn is working", "how to check if my vpn is working", "vpn working check", "is my vpn working", "check vpn connection"],
    volume: null,
    difficulty: null,
    priority: "P1",
    category: "Troubleshooting",
    tags: ["vpn-troubleshooting", "privacy", "vpn-setup"],
    searchIntent: "Troubleshooting",
    ctaLabel: "Check your VPN protection",
    ctaType: "download",
    seoTitle: "How to Check If Your VPN Is Working",
    seoDescription: "Use simple checks to confirm your VPN connection is working, including IP, location, DNS, and app status checks.",
    outline: ["Check VPN app status", "Check your IP address", "Check location and DNS", "What to do if checks fail"],
    internalLinks: ["/blog/public-wifi-vpn", "/blog/vpn-keeps-disconnecting"],
  },
  {
    slug: "vpn-keeps-disconnecting",
    title: "VPN Keeps Disconnecting? Common Causes and Fixes",
    primaryKeyword: "vpn keeps disconnecting",
    secondaryKeywords: ["vpn disconnecting", "why does my vpn keep disconnecting", "vpn connection keeps dropping"],
    volume: 390,
    difficulty: 23,
    priority: "P1",
    category: "Troubleshooting",
    tags: ["vpn-troubleshooting", "vpn-setup", "mobile-vpn"],
    searchIntent: "Troubleshooting",
    ctaLabel: "Get a simpler VPN experience",
    ctaType: "download",
    seoTitle: "VPN Keeps Disconnecting? Common Fixes",
    seoDescription: "See why a VPN keeps disconnecting, what network and app settings to check, and when to try a simpler VPN experience.",
    outline: ["Common disconnect causes", "Quick connection checks", "Device settings to review", "When to switch VPN apps"],
    internalLinks: ["/blog/how-to-check-if-vpn-is-working", "/blog/vpn-turns-off-iphone"],
  },
  {
    slug: "what-is-p2p-vpn",
    title: "What Is P2P VPN?",
    primaryKeyword: "what is p2p vpn",
    secondaryKeywords: ["p2p vpn meaning", "p2p vpn", "peer to peer vpn"],
    volume: 880,
    difficulty: 19,
    priority: "P1",
    category: "VPN Guides",
    tags: ["p2p-vpn", "vpn-setup", "privacy"],
    searchIntent: "Informational",
    ctaLabel: "Learn VPN features",
    ctaType: "download",
    seoTitle: "What Is P2P VPN? Meaning and Uses",
    seoDescription: "Learn what P2P VPN means, how peer-to-peer traffic differs from normal browsing, and what to check before using it.",
    outline: ["What P2P means", "How P2P VPN traffic works", "Common use cases", "Safety and privacy notes"],
    internalLinks: ["/blog/vpn-vs-proxy", "/blog/public-wifi-vpn"],
  },
  {
    slug: "what-is-double-vpn",
    title: "What Is Double VPN?",
    primaryKeyword: "what is double vpn",
    secondaryKeywords: ["double vpn meaning", "multi-hop vpn", "double vpn vs normal vpn"],
    volume: 880,
    difficulty: 30,
    priority: "P1",
    category: "VPN Guides",
    tags: ["privacy", "vpn-setup", "vpn-comparison"],
    searchIntent: "Informational",
    ctaLabel: "Learn VPN features",
    ctaType: "download",
    seoTitle: "What Is Double VPN? Simple Explanation",
    seoDescription: "Learn what Double VPN means, how multi-hop VPN routing works, and whether it is useful for everyday privacy.",
    outline: ["What Double VPN means", "How multi-hop routing works", "Pros and trade-offs", "Who needs it"],
    internalLinks: ["/blog/vpn-vs-proxy", "/blog/does-vpn-hide-search-history"],
  },
  {
    slug: "vpn-vs-proxy",
    title: "VPN vs Proxy: Which Is Better for Privacy?",
    primaryKeyword: "proxy vs vpn",
    secondaryKeywords: ["vpn vs proxy", "vpn proxy difference", "proxy or vpn", "difference between vpn and proxy"],
    volume: null,
    difficulty: null,
    priority: "P1",
    category: "Comparisons",
    tags: ["proxy-vs-vpn", "vpn-comparison", "privacy"],
    searchIntent: "Comparison",
    ctaLabel: "Choose stronger privacy protection",
    ctaType: "download",
    seoTitle: "VPN vs Proxy: Which Is Better for Privacy?",
    seoDescription: "Compare VPNs and proxies, including traffic protection, privacy, app coverage, speed, and everyday browsing use.",
    outline: ["What a proxy does", "What a VPN does", "Privacy and app coverage differences", "Which one to choose"],
    internalLinks: ["/blog/what-is-p2p-vpn", "/blog/icloud-private-relay-vs-vpn"],
  },
];

export function findBlogKeywordTarget({
  slug,
  keyword,
}: {
  slug?: string | null;
  keyword?: string | null;
}) {
  const normalizedSlug = normalizeSlug(slug);
  const normalizedKeyword = normalizeKeyword(keyword);

  return blogKeywordTargets.find((target) => {
    const aliases = [target.primaryKeyword, ...target.secondaryKeywords].map(normalizeKeyword);
    return target.slug === normalizedSlug || Boolean(normalizedKeyword && aliases.includes(normalizedKeyword));
  });
}

export function getBlogKeywordWriterBrief(target: BlogKeywordTarget): BlogKeywordWriterBrief {
  return {
    heading: target.seoTitle,
    readerProblem: getReaderProblem(target),
    articleAngle: getArticleAngle(target),
    productAngle: getProductAngle(target),
    secondaryKeywordGuidance: getSecondaryKeywordGuidance(target),
    outlineGuidance: target.outline.map((item, index) =>
      index === 0
        ? `${item}: answer the core query before introducing Aura VPN.`
        : `${item}: cover this as a distinct section with practical examples.`,
    ),
    internalLinkGuidance: target.internalLinks.map(
      (link) => `${link}: add with descriptive anchor text where it naturally supports the reader's next step.`,
    ),
    faqIdeas: getFaqIdeas(target),
    checklist: [
      `Primary keyword "${target.primaryKeyword}" appears in the title, intro, one heading, and meta description without stuffing.`,
      "Secondary keywords answer distinct sub-questions instead of repeating the same phrase mechanically.",
      "The outline solves the reader problem before moving into product guidance or a CTA.",
      target.internalLinks.length
        ? `Internal links are included with descriptive anchor text: ${target.internalLinks.join(", ")}.`
        : "Internal links are reviewed before publishing.",
      "Claims stay specific and verifiable; avoid promising complete anonymity, guaranteed security, or impossible protection.",
    ],
    metadata: {
      slug: target.slug,
      canonicalUrl: `https://auravpn.com/blog/${target.slug}`,
      seoTitle: target.seoTitle,
      seoDescription: target.seoDescription,
    },
  };
}

function normalizeSlug(value: string | null | undefined) {
  return (value || "").replace(/^\/?blog\//, "").trim().toLowerCase();
}

function normalizeKeyword(value: string | null | undefined) {
  return (value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function getReaderProblem(target: BlogKeywordTarget) {
  const query = `"${target.primaryKeyword}"`;

  switch (target.searchIntent) {
    case "Commercial":
      return `Reader is comparing options for ${query} and needs practical buying criteria, setup expectations, and trade-offs.`;
    case "Comparison":
      return `Reader wants a plain-language comparison for ${query}, including differences, limitations, and when each option fits.`;
    case "Troubleshooting":
      return `Reader has a specific problem around ${query} and needs clear checks before changing tools or settings.`;
    case "Support":
      return `Reader needs support for ${query}, with step-by-step guidance and a clear path if the issue continues.`;
    case "Brand":
      return `Reader is evaluating ${query} and needs direct proof points, limitations, and next steps without hype.`;
    case "Informational":
    default:
      return `Reader wants a clear answer for ${query} without needing technical VPN knowledge.`;
  }
}

function getArticleAngle(target: BlogKeywordTarget) {
  const firstSection = target.outline[0] ? ` Start with "${target.outline[0]}"` : "";
  return `Write for a non-technical reader, answer the search intent early, and keep the structure focused on ${target.category}.${firstSection}.`;
}

function getProductAngle(target: BlogKeywordTarget) {
  if (target.ctaType === "none") {
    return `Keep Aura VPN support-oriented. Use "${target.ctaLabel}" only when the reader needs help or a next step.`;
  }

  if (target.ctaType === "signup") {
    return `Position Aura VPN as the next step after the reader understands the problem. Use "${target.ctaLabel}" where signup intent is clear.`;
  }

  return `Position Aura VPN as a practical download after the article solves the query. Use "${target.ctaLabel}" after useful guidance, not before it.`;
}

function getSecondaryKeywordGuidance(target: BlogKeywordTarget) {
  if (!target.secondaryKeywords.length) {
    return "No secondary keywords are assigned. Keep the article tightly focused on the primary query.";
  }

  return `Use ${formatList(target.secondaryKeywords)} as supporting subtopics, headings, FAQs, or examples only where they fit naturally.`;
}

function getFaqIdeas(target: BlogKeywordTarget) {
  const sourceKeywords = [target.primaryKeyword, ...target.secondaryKeywords].slice(0, 4);
  return sourceKeywords.map((keyword) => keywordToQuestion(keyword));
}

function keywordToQuestion(keyword: string) {
  const normalized = normalizeKeyword(keyword);
  const questionStarters = ["can", "does", "how", "is", "what", "when", "where", "why"];
  const startsAsQuestion = questionStarters.some((starter) => normalized.startsWith(`${starter} `));
  const question = startsAsQuestion ? normalized : `what should you know about ${normalized}`;
  return `${question.charAt(0).toUpperCase()}${question.slice(1)}?`;
}

function formatList(values: string[]) {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}
