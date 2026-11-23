const appleListing = "https://apps.apple.com/app/id6745866131";

export const storeUrls = {
  iphone: `${appleListing}?platform=iphone`,
  mac: `${appleListing}?platform=mac`,
  android: "https://play.google.com/store/apps/details?id=com.auravpn",
};

type Device = Pick<Navigator, "userAgent" | "platform" | "maxTouchPoints"> & {
  userAgentData?: { platform: string };
};

export function getStoreUrl({ userAgent, platform, maxTouchPoints, userAgentData }: Device) {
  const device = `${userAgentData?.platform ?? ""} ${userAgent} ${platform}`;
  if (/Windows|Win32|Win64/i.test(device)) return storeUrls.iphone;
  if (/Android/i.test(device)) return storeUrls.android;
  if (/iPhone|iPad|iPod/i.test(device)) return storeUrls.iphone;
  if (/Macintosh|MacIntel|Mac OS|macOS/i.test(device)) {
    // iPadOS Safari can identify as a desktop Mac.
    return maxTouchPoints > 1 ? storeUrls.iphone : storeUrls.mac;
  }
  return null;
}
