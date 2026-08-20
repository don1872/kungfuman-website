import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/lib/locales";
import "../globals.css";

/**
 * 站点根地址 —— canonical / og:url / hreflang 都基于它。
 *
 * 优先级：显式配置 > Vercel 生产域名 > 本地。
 * 绑定自有域名后，在 Vercel 项目里设 NEXT_PUBLIC_SITE_URL=https://你的域名 即可。
 */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * 是否允许搜索引擎收录。
 *
 * 默认关闭：站上仍有占位内容 —— 选手头像为 Wikimedia CC 素材，
 * 创始人简介为虚构文案。这些被搜索引擎抓取并当作事实缓存是有风险的。
 * 内容核定完毕后，在 Vercel 项目里设 NEXT_PUBLIC_ALLOW_INDEXING=true 开启。
 */
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

const META: Record<Locale, { title: string; description: string; ogTitle: string; ogDesc: string; keywords: string[] }> = {
  zh: {
    title: "功夫侠国际武术巅峰赛 KUNGFUMAN · 第一届 问鼎 · 谁主沉浮",
    description:
      "KUNGFUMAN 功夫侠国际武术巅峰赛：全球十二国传统武术宗门，八极、咏春、太极、形意、洪拳诸派同台。拳械套路与全接触对抗双线并行，问鼎天下第一之位。",
    ogTitle: "功夫侠国际武术巅峰赛 KUNGFUMAN · 问鼎",
    ogDesc: "谁主沉浮 · WHO RULES THE WORLD — 2026.10.24 西安首站",
    keywords: ["功夫侠", "功夫侠国际武术巅峰赛", "KUNGFUMAN", "国际武术锦标赛", "传统武术", "八极拳", "咏春", "武术赛事", "问鼎"],
  },
  en: {
    title: "KUNGFUMAN International Wushu Championship · Edition I · Who Rules the World",
    description:
      "KUNGFUMAN International Wushu Championship: twelve nations, the great traditional schools — Baji, Wing Chun, Tai Chi, Xingyi, Hung Ga — on one stage. Forms and full-contact combat, two roads to one crown.",
    ogTitle: "KUNGFUMAN · The Quest",
    ogDesc: "WHO RULES THE WORLD — Opening night Xi'an, 24 Oct 2026",
    keywords: ["KungFuMan", "kung fu championship", "traditional wushu", "Bajiquan", "Wing Chun", "martial arts event"],
  },
};

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
  const m = META[locale];

  return {
    metadataBase: new URL(SITE),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    robots: ALLOW_INDEXING
      ? undefined
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: {
      canonical: `/${locale}`,
      // hreflang：告诉搜索引擎两个语种是同一页面的不同版本
      languages: { "zh-CN": "/zh", en: "/en", "x-default": "/zh" },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      url: `/${locale}`,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#140b08",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <head>
        {/*
          中文书法字体（Ma Shan Zheng / Noto Serif SC）体积极大，Google 按 unicode-range
          切成数百个分片。这里沿用设计稿的 <link> 引入方式：next/font 会在构建期把所有
          分片下载到本地，对中文字体来说构建时间不可接受。
          英文版同样加载 —— 书法巨字与印章在两个语种下都保留为视觉符号。
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font --
            该规则针对 Pages Router 的 pages/_document.js；App Router 中
            layout.tsx 的 <head> 即全局位置，字体对所有路由生效。 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600;900&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
