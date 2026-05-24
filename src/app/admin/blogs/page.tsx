import type { Metadata } from "next";
import AdminBlogDashboard from "./AdminBlogDashboard";

export const metadata: Metadata = {
  title: "Blog Admin - Aura VPN",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminBlogsPage() {
  return <AdminBlogDashboard />;
}
