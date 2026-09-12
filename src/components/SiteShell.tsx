"use client";

import { useState } from "react";
import { getDict } from "@/lib/dict";
import { photos } from "@/lib/data";
import type { Locale } from "@/lib/locales";

import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Ticker } from "./Ticker";
import { MainEvent } from "./MainEvent";
import { Parallax } from "./Parallax";
import { Events } from "./Events";
import { Rankings } from "./Rankings";
import { Editions } from "./Editions";
import { Founder } from "./Founder";
import { Media } from "./Media";
import { Arena } from "./Arena";
import { ComingSoon } from "./ComingSoon";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { TicketOverlay } from "./TicketOverlay";
import { RegisterOverlay } from "./RegisterOverlay";

/** 页面组装 + 两个覆盖层的开关状态。语言由路由决定，不再是客户端状态。 */
export function SiteShell({ locale }: { locale: Locale }) {
  const [ticketOpen, setTicketOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const d = getDict(locale);

  return (
    <>
      <Nav locale={locale} onOpenTicket={() => setTicketOpen(true)} />

      <main>
        <Hero locale={locale} />
        <Ticker locale={locale} />
        <MainEvent locale={locale} />

        <Parallax
          image={photos.quoteOnSet}
          position="50% 22%"
          align="left"
          eyebrow={d.quote.eyebrow}
          height="64vh"
          minHeight="440px"
          font={locale === "zh" ? "brush" : "serif"}
          saturate={1.08}
        >
          {/* 引号随语种：中文用直角引号，英文用弯引号 */}
          {locale === "zh" ? "「" : "\u201C"}
          {d.quote.l1}
          <br />
          {d.quote.l2}
          {locale === "zh" ? "」" : "\u201D"}
        </Parallax>

        {/* 赛程 / 榜单 / 五届 / 集锦 / 擂台的内容尚未定稿，先以「敬请期待」蒙层示人 */}
        <ComingSoon locale={locale}>
          <Events locale={locale} />
        </ComingSoon>

        <ComingSoon locale={locale}>
          <Rankings locale={locale} />
        </ComingSoon>

        <Parallax
          image={photos.legacyKidsClass}
          position="50% 30%"
          align="right"
          eyebrow={d.legacy.eyebrow}
          height="58vh"
          minHeight="400px"
          font={locale === "zh" ? "brush" : "serif"}
          saturate={1.12}
        >
          {d.legacy.l1}
          <br />
          {d.legacy.l2}
        </Parallax>

        <ComingSoon locale={locale}>
          <Editions locale={locale} />
        </ComingSoon>

        <Founder locale={locale} />

        <ComingSoon locale={locale}>
          <Media locale={locale} />
        </ComingSoon>

        {/* 擂台现场置于集锦与购票之间：看过精彩片段 → 看见现场 → 买票 */}
        <ComingSoon locale={locale}>
          <Arena locale={locale} onOpenTicket={() => setTicketOpen(true)} />
        </ComingSoon>

        <FinalCta
          locale={locale}
          onOpenTicket={() => setTicketOpen(true)}
          onOpenReg={() => setRegOpen(true)}
        />
      </main>

      <Footer locale={locale} />

      {ticketOpen && <TicketOverlay locale={locale} onClose={() => setTicketOpen(false)} />}
      {regOpen && <RegisterOverlay locale={locale} onClose={() => setRegOpen(false)} />}
    </>
  );
}
