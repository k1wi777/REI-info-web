import { buildLlmsTxt } from "@/lib/llms";
import { LOCALES, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[lang]/llms.txt">,
): Promise<Response> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildLlmsTxt(lang), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
