"use client";

import { useState } from "react";
import { COPY, type Lang } from "@/lib/i18n";
import { photos } from "@/lib/data";

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { MainEvent } from "@/components/MainEvent";
import { Parallax } from "@/components/Parallax";
import { Events } from "@/components/Events";
import { Rankings } from "@/components/Rankings";
import { Editions } from "@/components/Editions";
import { Founder } from "@/components/Founder";
import { Media } from "@/components/Media";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { TicketOverlay } from "@/components/TicketOverlay";
import { RegisterOverlay } from "@/components/RegisterOverlay";

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [ticketOpen, setTicketOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);

  const t = COPY[lang];

  return (
    <>
      <Nav
        langLabel={t.langLabel}
        onToggleLang={() => setLang((l) => (l === "zh" ? "en" : "zh"))}
        onOpenTicket={() => setTicketOpen(true)}
      />

      <main>
        <Hero heroP={t.heroP} />
        <Ticker />
        <MainEvent />

        <Parallax
          image={photos.quoteOnSet}
          position="50% 22%"
          align="left"
          eyebrow="创始人 · 陈庆彪 RAINBOW CHEN"
          height="64vh"
          minHeight="440px"
          saturate={1.08}
        >
          「{t.quoteL1}
          <br />
          {t.quoteL2}」
        </Parallax>

        <Events />
        <Rankings />

        <Parallax
          image={photos.legacyKidsClass}
          position="50% 30%"
          align="right"
          eyebrow="LEGACY · 薪火相传"
          height="58vh"
          minHeight="400px"
          saturate={1.12}
        >
          {t.legacyL1}
          <br />
          {t.legacyL2}
        </Parallax>

        <Editions sagaP={t.sagaP} />
        <Founder bio1={t.bio1} bio2={t.bio2} />
        <Media />

        <FinalCta
          cta1={t.cta1}
          cta2={t.cta2}
          onOpenTicket={() => setTicketOpen(true)}
          onOpenReg={() => setRegOpen(true)}
        />
      </main>

      <Footer />

      {ticketOpen && <TicketOverlay onClose={() => setTicketOpen(false)} />}
      {regOpen && <RegisterOverlay onClose={() => setRegOpen(false)} />}
    </>
  );
}
