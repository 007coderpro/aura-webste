import { pageMetadata } from "@/lib/pageMetadata";
import DeleteAccountForm from "./DeleteAccountForm";

export const metadata = pageMetadata(
  "/pages/delete-account",
  "Delete Your Aura VPN Account",
  "Request deletion of your Aura VPN account and associated data.",
);

export default function DeleteAccountPage() {
  return <DeleteAccountForm />;
}
