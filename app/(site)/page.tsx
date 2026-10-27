import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/content/site";
import { HomePage } from "@/features/home";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
};

export default function Page() {
  return <HomePage />;
}
