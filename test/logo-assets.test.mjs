import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";

const homepage = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const navbar = readFileSync(new URL("../src/components/Navbar.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../src/components/Footer.tsx", import.meta.url), "utf8");

const largeLogo = new URL("../public/transparentLogo.png", import.meta.url);
const heroLogo = new URL("../public/aura-logo-160.png", import.meta.url);
const chromeLogo = new URL("../public/aura-logo-96.png", import.meta.url);

test("shared page chrome uses generated small logo assets", () => {
  assert.match(homepage, /src="\/aura-logo-160\.png"/);
  assert.match(navbar, /src="\/aura-logo-96\.png"/);
  assert.match(footer, /src="\/aura-logo-96\.png"/);
});

test("generated logo assets are smaller than the source logo", () => {
  assert.equal(existsSync(heroLogo), true);
  assert.equal(existsSync(chromeLogo), true);

  const sourceBytes = statSync(largeLogo).size;
  assert.ok(statSync(heroLogo).size < sourceBytes / 5);
  assert.ok(statSync(chromeLogo).size < sourceBytes / 10);
});
