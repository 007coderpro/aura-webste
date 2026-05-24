import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");

test("homepage download cards omit Windows until the installer is live", () => {
  assert.doesNotMatch(homepage, /name:\s*"Windows"/);
  assert.doesNotMatch(homepage, /aura-vpn-windows\.exe/);
  assert.doesNotMatch(homepage, /Windows and macOS/);
});

test("homepage macOS download points to the App Store listing", () => {
  assert.match(
    homepage,
    /href:\s*"https:\/\/apps\.apple\.com\/fi\/app\/aura-vpn-fast-unlimited\/id6745866131"/,
  );
  assert.doesNotMatch(homepage, /aura-vpn-macos\.dmg/);
});
