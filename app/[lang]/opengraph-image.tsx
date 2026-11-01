import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/i18n";
import { LOCALES, toLocale } from "@/lib/i18n";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { lang: string } }) {
  return [
    {
      id: "default",
      alt: getDictionary(toLocale(params.lang)).meta.ogAlt,
      size,
      contentType,
    },
  ];
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/**
 * Tarjeta social generada en build con Satori. Los colores son literales del
 * sistema Plano en grafito porque Satori no resuelve variables CSS de `@theme`;
 * el mapeo con los tokens vive en `DESIGN.md`.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { og } = getDictionary(toLocale((await params).lang));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0B",
          border: "1px solid #1E1E22",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#8A8A94",
              fontSize: 24,
              letterSpacing: 8,
            }}
          >
            {og.brand}
          </div>
          <div
            style={{
              display: "flex",
              color: "#A78BFA",
              fontSize: 20,
              letterSpacing: 2,
              border: "1px solid rgba(139, 92, 246, 0.4)",
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            {og.badge}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#F5F5F5",
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {og.lineOne}
          </div>
          <div
            style={{
              display: "flex",
              color: "#F5F5F5",
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {og.lineTwo}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#A1A1AA",
            fontSize: 24,
            borderTop: "1px solid #1E1E22",
            paddingTop: 24,
          }}
        >
          {og.footer}
        </div>
      </div>
    ),
    { ...size },
  );
}
