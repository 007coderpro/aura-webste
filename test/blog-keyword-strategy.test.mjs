import assert from "node:assert/strict";
import test from "node:test";

import {
  blogKeywordCategories,
  blogKeywordIntents,
  blogKeywordTargets,
  findBlogKeywordTarget,
  getBlogKeywordWriterBrief,
} from "../src/lib/blogKeywordStrategy.ts";

test("blog keyword strategy exposes the first-priority Aura VPN targets", () => {
  const setupGuide = findBlogKeywordTarget({
    slug: "how-to-set-up-vpn-on-iphone",
  });

  assert.equal(blogKeywordTargets.length >= 11, true);
  assert.equal(setupGuide?.primaryKeyword, "how to set up vpn on iphone");
  assert.deepEqual(setupGuide?.secondaryKeywords.slice(0, 2), [
    "how to get a vpn on iphone",
    "how to turn on vpn on iphone",
  ]);
  assert.equal(setupGuide?.category, "iPhone VPN");
  assert.ok(setupGuide?.tags.includes("vpn-setup"));
  assert.equal(setupGuide?.searchIntent, "Informational");
});

test("blog keyword strategy can match by slug or keyword alias", () => {
  assert.equal(
    findBlogKeywordTarget({ slug: "vpn-keeps-disconnecting" })?.category,
    "Troubleshooting",
  );
  assert.equal(
    findBlogKeywordTarget({ keyword: "does a vpn hide your search history from wifi" })?.slug,
    "does-vpn-hide-search-history",
  );
});

test("blog keyword strategy routes the Aura VPN keyword add-ons", () => {
  const expectedRoutes = new Map([
    ["aura vpn review", "aura-vpn-review"],
    ["aura vpn reviews", "aura-vpn-review"],
    ["turn off aura vpn on pc", "turn-off-aura-vpn-on-pc"],
    ["best vpn for iphone", "vpn-for-iphone"],
    ["how to set up vpn on iphone", "how-to-set-up-vpn-on-iphone"],
    ["how to get a vpn on iphone", "how-to-set-up-vpn-on-iphone"],
    ["how to turn on vpn on iphone", "how-to-set-up-vpn-on-iphone"],
    ["what does vpn mean on iphone", "what-does-vpn-mean-on-iphone"],
    ["what is vpn on my iphone", "what-does-vpn-mean-on-iphone"],
    ["what does vpn do on iphone", "what-does-vpn-mean-on-iphone"],
    ["vpn turns off iphone", "vpn-turns-off-iphone"],
    ["vpn keeps disconnecting", "vpn-keeps-disconnecting"],
    ["vpn not working on iphone", "vpn-turns-off-iphone"],
    ["icloud private relay vs vpn", "icloud-private-relay-vs-vpn"],
    ["is icloud private relay a vpn", "icloud-private-relay-vs-vpn"],
    ["private relay vs vpn", "icloud-private-relay-vs-vpn"],
    ["can my isp see what sites i visit with vpn", "can-isp-see-history-with-vpn"],
    ["can your isp see what you do with a vpn", "can-isp-see-history-with-vpn"],
    ["does vpn hide search history", "does-vpn-hide-search-history"],
    ["does a vpn hide your search history from wifi", "does-vpn-hide-search-history"],
    ["does vpn hide browsing history from wifi owner", "does-vpn-hide-search-history"],
    ["public wifi vpn", "public-wifi-vpn"],
    ["vpn public wifi", "public-wifi-vpn"],
    ["does vpn protect you on public wifi", "public-wifi-vpn"],
    ["vpn on public wifi", "public-wifi-vpn"],
    ["hotel wifi vpn", "public-wifi-vpn"],
    ["how to check if vpn is working", "how-to-check-if-vpn-is-working"],
    ["how to know if vpn is working", "how-to-check-if-vpn-is-working"],
    ["how to check if my vpn is working", "how-to-check-if-vpn-is-working"],
    ["what is p2p vpn", "what-is-p2p-vpn"],
    ["p2p vpn meaning", "what-is-p2p-vpn"],
    ["what is double vpn", "what-is-double-vpn"],
    ["proxy vs vpn", "vpn-vs-proxy"],
    ["vpn vs proxy", "vpn-vs-proxy"],
    ["vpn proxy difference", "vpn-vs-proxy"],
  ]);

  for (const [keyword, slug] of expectedRoutes) {
    assert.equal(findBlogKeywordTarget({ keyword })?.slug, slug, keyword);
  }
});

test("blog keyword strategy includes admin taxonomy from the keyword plan", () => {
  assert.deepEqual(blogKeywordIntents, [
    "Informational",
    "Commercial",
    "Comparison",
    "Troubleshooting",
    "Support",
    "Brand",
  ]);
  assert.ok(blogKeywordCategories.includes("Public Wi-Fi"));
  assert.ok(blogKeywordCategories.includes("Aura VPN Support"));
});

test("blog keyword strategy builds a writer brief from the selected target", () => {
  const target = findBlogKeywordTarget({ slug: "how-to-set-up-vpn-on-iphone" });
  assert.ok(target);

  const brief = getBlogKeywordWriterBrief(target);

  assert.equal(brief.heading, "How to Set Up a VPN on iPhone: Simple Guide");
  assert.match(brief.readerProblem, /how to set up vpn on iphone/);
  assert.equal(brief.metadata.slug, "how-to-set-up-vpn-on-iphone");
  assert.equal(brief.metadata.canonicalUrl, "https://auravpn.com/blog/how-to-set-up-vpn-on-iphone");
  assert.equal(brief.faqIdeas.length >= 3, true);
  assert.match(brief.faqIdeas[0], /\?$/);
  assert.ok(brief.checklist.some((item) => item.includes("Primary keyword")));
});

test("blog keyword writer brief keeps support targets support-led", () => {
  const target = findBlogKeywordTarget({ slug: "turn-off-aura-vpn-on-pc" });
  assert.ok(target);

  const brief = getBlogKeywordWriterBrief(target);

  assert.match(brief.productAngle, /support-oriented/);
  assert.ok(brief.checklist.some((item) => item.includes("Internal links")));
});
