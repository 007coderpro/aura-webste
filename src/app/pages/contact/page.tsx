import { pageMetadata } from "@/lib/pageMetadata";
import ContactForm from "./ContactForm";

export const metadata = pageMetadata(
  "/pages/contact",
  "Contact Aura VPN Support",
  "Contact Aura VPN for help with the app, your connection, or your subscription.",
);

export default function ContactPage() {
  return <ContactForm />;
}
