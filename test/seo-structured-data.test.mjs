import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("site structured data graph describes Aura VPN entities", async () => {
  let structuredData;

  try {
    structuredData = await import("../src/lib/structuredData.ts");
  } catch (error) {
    assert.fail(`Expected structured data helper module to exist: ${error.message}`);
  }

  const schema = structuredData.getAuraSiteJsonLd("https://auravpn.net");
  const graph = schema["@graph"];
  const findType = (type) => graph.find((node) => node["@type"] === type);

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(findType("Organization")?.url, "https://auravpn.net");
  assert.equal(findType("WebSite")?.publisher["@id"], "https://auravpn.net/#organization");
  const app = findType("SoftwareApplication");
  assert.deepEqual(app?.operatingSystem, ["macOS", "iOS", "iPadOS", "Android"]);
  assert.equal(app.publisher.name, "VerticalRisers Oy");
  assert.equal(app.softwareHelp["@id"], "https://auravpn.net/support#webpage");
});

test("homepage and blog index inject shared site JSON-LD", () => {
  for (const file of ["src/app/page.tsx", "src/app/blog/page.tsx"]) {
    const source = readFileSync(file, "utf8");

    assert.match(source, /getAuraSiteJsonLd/, file);
    assert.match(source, /application\/ld\+json/, file);
  }
});
