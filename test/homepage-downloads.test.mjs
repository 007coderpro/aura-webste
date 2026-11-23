import assert from "node:assert/strict";
import test from "node:test";
import { getStoreUrl } from "../src/lib/downloads.ts";

const iphone = "https://apps.apple.com/app/id6745866131?platform=iphone";
const mac = "https://apps.apple.com/app/id6745866131?platform=mac";
const android = "https://play.google.com/store/apps/details?id=com.auravpn";

for (const [name, userAgent, platform, maxTouchPoints, expected] of [
  ["Android phone", "Mozilla/5.0 (Linux; Android 14)", "Linux armv8l", 5, android],
  ["iPhone", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)", "iPhone", 5, iphone],
  ["iPad", "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)", "iPad", 5, iphone],
  ["iPad in desktop mode", "Mozilla/5.0 (Macintosh; Intel Mac OS X)", "MacIntel", 5, iphone],
  ["Mac", "Mozilla/5.0 (Macintosh; Intel Mac OS X)", "MacIntel", 0, mac],
  ["Windows PC", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Win32", 0, iphone],
  ["Linux desktop", "Mozilla/5.0 (X11; Linux x86_64)", "Linux x86_64", 0, null],
]) {
  test(`download destination for ${name}`, () => {
    assert.equal(getStoreUrl({ userAgent, platform, maxTouchPoints }), expected);
  });
}

test("Android desktop mode can identify itself through client hints", () => {
  assert.equal(getStoreUrl({
    userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
    platform: "Linux x86_64",
    maxTouchPoints: 5,
    userAgentData: { platform: "Android" },
  }), android);
});
