import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY, resolveDoc } from "@/lib/legal";
import { LOCALES, isLocale } from "@/lib/locales";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const doc = resolveDoc(PRIVACY, locale);
  return {
    title: `${doc.title} · KUNGFUMAN`,
    alternates: { canonical: `/${locale}/privacy`, languages: { "zh-CN": "/zh/privacy", en: "/en/privacy" } },
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage locale={locale} doc={resolveDoc(PRIVACY, locale)} />;
}
