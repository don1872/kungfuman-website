import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "功夫人巅峰赛 KUNGFUMAN · 第一届 问鼎 · 谁主沉浮",
  description:
    "KungFuMan 功夫人巅峰赛：全球十二国传统武术宗门，八极、咏春、太极、形意、洪拳诸派同台。拳械套路与全接触对抗双线并行，问鼎天下第一之位。",
  keywords: ["功夫人巅峰赛", "KungFuMan", "传统武术", "八极拳", "咏春", "武术赛事", "问鼎"],
  openGraph: {
    title: "功夫人巅峰赛 KUNGFUMAN · 问鼎",
    description: "谁主沉浮 · WHO RULES THE WORLD — 2026.10.24 西安首站",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  themeColor: "#140b08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        {/*
          中文书法字体（Ma Shan Zheng / Noto Serif SC）体积极大，Google 按 unicode-range
          切成数百个分片。这里沿用设计稿的 <link> 引入方式：next/font 会在构建期把所有
          分片下载到本地，对中文字体来说构建时间不可接受。
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
