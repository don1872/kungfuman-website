"use client";

import { useState } from "react";
import { getRankingTabs, getRankings } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { SectionHeading } from "./SectionHeading";

export function Rankings({ locale }: { locale: Locale }) {
  const [tab, setTab] = useState(0);
  const rankings = getRankings(locale);
  const tabs = getRankingTabs(locale);
  const d = getDict(locale).rankings;
  const fighters = rankings[tab];

  return (
    <section
      id="rankings"
      className="scroll-mt-[76px] border-y border-gold/18 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,#241108_0%,#140b08_75%)]"
    >
      <div className="sec-pad mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-5">
          <SectionHeading brush={d.heading} sub={d.sub} />

          <div className="flex flex-wrap gap-2.5" role="tablist" aria-label={d.sub}>
            {tabs.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={`cursor-pointer border px-5 py-2.5 font-latin text-[13px] tracking-[3px] transition-colors ${
                  i === tab
                    ? "border-cinnabar bg-cinnabar text-white"
                    : "border-rice-dim/35 text-rice-dim hover:border-gold hover:text-gold"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="gold-grid grid-cols-1 md:grid-cols-3">
          {fighters.map((f) => (
            <div
              key={f.rank + f.name}
              className="flex items-center gap-[18px] bg-ink-card px-[26px] py-7 transition-colors hover:bg-ink-hot"
            >
              <div className="w-11 flex-none font-latin text-[34px] font-bold text-gold/55">{f.rank}</div>
              <div className="h-[70px] w-14 flex-none overflow-hidden border border-gold/30 bg-ink-grain-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- ⚠️ Wikimedia 占位图，上线前替换 */}
                <img
                  src={f.photo}
                  alt={f.name}
                  loading="lazy"
                  className="block h-full w-full object-cover [filter:saturate(1.1)_contrast(1.08)]"
                />
              </div>
              <div className="min-w-0">
                {/* 姓名与绰号保持汉字 */}
                <div className="font-serif-sc text-xl font-black text-white">
                  {f.name} <span className="text-[13px] font-normal text-flame">「{f.alias}」</span>
                </div>
                <div className="mt-1 text-xs tracking-[1px] text-rice-dim">
                  {f.style} · {f.nation}
                </div>
                <div className="mt-1 font-latin text-xs tracking-[2px] text-gold">
                  {f.record} · {f.pts} {d.pts}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
