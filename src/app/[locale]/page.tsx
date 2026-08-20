import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { SiteShell } from "@/components/SiteShell";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteShell locale={locale} />;
}
