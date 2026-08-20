import { getEditions } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { SectionHeading } from "./SectionHeading";

export function Editions({ locale }: { locale: Locale }) {
  const editions = getEditions(locale);
  const d = getDict(locale).editions;

  return (
    <section id="editions" className="sec-pad mx-auto max-w-[1240px] scroll-mt-[76px]">
      <div className="mb-3">
        <SectionHeading brush={d.heading} sub={d.sub} />
      </div>
      <p className="mb-12 max-w-[560px] text-sm leading-[2] text-rice-dim">{d.intro}</p>

      <div className="gold-grid grid-cols-2 md:grid-cols-5">
        {editions.map((ed) => (
          <div
            key={ed.year}
            className={`relative overflow-hidden px-6 pt-9 pb-[30px] text-center transition-colors hover:bg-ink-hot ${
              ed.live ? "bg-ink-hot" : "bg-ink-card"
            }`}
          >
            <div className={`font-latin text-[11px] tracking-[4px] ${ed.live ? "text-flame" : "text-rice-dim"}`}>
              {ed.year}
            </div>
            {/* 书法单字：两语种共用的视觉符号 */}
            <div
              className={`my-[14px] mb-1.5 font-brush text-[72px] leading-[1.1] ${
                ed.live ? "text-gold" : "text-rice/80"
              }`}
            >
              {ed.char}
            </div>
            <div className="font-serif-sc text-xl font-black text-white">{ed.name}</div>
            {locale === "zh" && (
              <div className="mt-1.5 font-latin text-[11px] tracking-[3px] text-rice-dim">{ed.en}</div>
            )}
            <div className="mt-[14px] text-xs leading-[1.8] text-rice-dim">{ed.motto}</div>

            {ed.live && (
              <div className="absolute top-[14px] right-[14px] border border-flame px-2 py-[3px] font-latin text-[10px] tracking-[2px] text-flame">
                {d.now}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
