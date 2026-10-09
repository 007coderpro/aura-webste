import type { Metadata } from "next";
import StoreRedirect from "./StoreRedirect";

export const metadata: Metadata = {
  title: "Get Aura VPN",
  robots: { index: false, follow: true },
};

export default function GetPage() {
  return <StoreRedirect />;
}
