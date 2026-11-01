import type { ReactNode } from "react";
import { ContentLanguage } from "@/components/layout/content-language";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="contenido" tabIndex={-1} className="flex-1">
        <ContentLanguage>{children}</ContentLanguage>
      </main>
      <SiteFooter />
    </div>
  );
}
