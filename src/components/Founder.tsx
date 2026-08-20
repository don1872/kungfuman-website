import Image from "next/image";
import { getJourney, photos } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { SectionHeading } from "./SectionHeading";

const STAT_BASE = ["40+", "30+"];

export function Founder({ locale }: { locale: Locale }) {
  const journey = getJourney(locale);
  const dict = getDict(locale);
  const d = dict.founder;
  const statValues = [...STAT_BASE, d.lineageValue];

  return (
    <section
      id="founder"
      className="scroll-mt-[76px] border-t border-gold/18 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,#241108_0%,#140b08_72%)]"
    >
      <div className="sec-pad mx-auto max-w-[1240px]">
        <div className="mb-12">
          <SectionHeading heading={d.heading} sub={d.sub} locale={locale} />
        </div>

        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[380px_1fr]">
          <div className="relative">
            <div className="relative aspect-3/4 overflow-hidden border border-gold/40 shadow-[0_24px_60px_rgba(0,0,0,.55)]">
              <Image
                src={photos.founderPortrait}
                alt={d.portraitCaption}
                fill
                sizes="(max-width: 780px) 100vw, 380px"
                className="object-cover [filter:saturate(1.15)_contrast(1.1)]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,11,8,.1)_0%,transparent_30%,transparent_60%,rgba(20,11,8,.8)_100%)]" />
              <div className="absolute right-[70px] bottom-[14px] left-4 font-latin text-[11px] tracking-[2px] text-gold-soft">
                {d.portraitCaption}
              </div>
            </div>
            <div
              className={`absolute -right-[14px] -bottom-[14px] flex h-16 w-16 items-center justify-center border-2 border-cinnabar bg-ink text-flame shadow-[0_0_30px_rgba(224,58,32,.4)] ${
                locale === "zh" ? "font-brush text-[30px]" : "font-latin text-[20px] font-bold tracking-[1px]"
              }`}
            >
              {dict.brand.sealWu}
            </div>
          </div>

          <div>
            {/* 姓名保持汉字 */}
            <div className="font-serif-sc text-[40px] leading-[1.2] font-black text-white">
              {d.name} <span className="text-base font-normal text-flame">{locale === "zh" ? `\u300C${d.alias}\u300D` : d.alias}</span>
            </div>
            <div className="my-2.5 mb-7 font-latin text-sm tracking-[4px] text-gold">{d.title}</div>
            {/* ⚠️ 以下两段为占位虚构文案，上线前须以真实履历核定（见 README） */}
            <p className="mb-[18px] text-[15px] leading-[2.2] text-rice-dim">{d.bio1}</p>
            <p className="mb-9 text-[15px] leading-[2.2] text-rice-dim">{d.bio2}</p>

            <div className="gold-grid grid-cols-3">
              {d.stats.map((label, i) => (
                <div key={label} className="bg-ink-card px-3 py-5 text-center md:px-7">
                  <div className="font-latin text-[30px] font-bold text-gold">{statValues[i]}</div>
                  <div className="mt-1 text-xs tracking-[2px] text-rice-dim">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[72px]">
          <div className="mb-6 flex items-center gap-4">
            <span className={locale === "zh" ? "font-brush text-[30px] text-white" : "font-latin text-[22px] font-bold tracking-[5px] text-white uppercase"}>{d.journeyBrush}</span>
            <span className="font-latin text-xs tracking-[4px] text-gold">{d.journeySub}</span>
            <div className="h-px flex-1 bg-gold/30" />
          </div>

          <div className="gold-grid auto-rows-[150px] grid-cols-2 md:auto-rows-[210px] md:grid-cols-4">
            {journey.map((j) => (
              <figure
                key={j.src}
                className="group relative overflow-hidden bg-ink-card"
                style={{ gridColumn: `span ${j.span}` }}
              >
                <Image
                  src={j.src}
                  alt={j.cap}
                  fill
                  sizes={j.span === 2 ? "(max-width: 780px) 100vw, 620px" : "(max-width: 780px) 50vw, 310px"}
                  className="object-cover transition-transform duration-500 [filter:saturate(1.15)_contrast(1.1)] group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(20,11,8,.88)_100%)]" />
                <figcaption className="pointer-events-none absolute right-[14px] bottom-3 left-[14px]">
                  <div className="font-latin text-[10px] tracking-[3px] text-flame">{j.tag}</div>
                  <div className="mt-[3px] text-[13px] font-semibold text-white">{j.cap}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
