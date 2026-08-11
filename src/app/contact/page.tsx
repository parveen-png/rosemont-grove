import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register",
  robots: { index: false, follow: false },
};

/** Contact details are not published; registration is handled via the form. */
export default function ContactPage() {
  redirect("/#hero-private-access");
}
