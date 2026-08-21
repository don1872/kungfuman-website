import Image from "next/image";
import { journeyPhotos } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { SectionHeading } from "./SectionHeading";
import { Timeline } from "./Timeline";

export function Founder({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const d = dict.founder;

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
                src="/founder/portrait.jpg"
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
              {d.name} <span className="text-base font-normal text-flame">「{d.alias}」</span>
            </div>
            <div className="my-2.5 mb-7 font-latin text-sm tracking-[4px] text-gold">{d.title}</div>
            {/* ⚠️ 以下两段为占位虚构文案，上线前须以真实履历核定（见 README） */}
            <p className="mb-[18px] text-[15px] leading-[2.2] text-rice-dim">{d.bio1}</p>
            <p className="mb-9 text-[15px] leading-[2.2] text-rice-dim">{d.bio2}</p>

            <div className="gold-grid grid-cols-3">
              {d.stats.map((st) => (
                <div key={st.label} className="bg-ink-card px-3 py-5 text-center md:px-7">
                  <div className="font-latin text-[30px] font-bold text-gold">{st.value}</div>
                  <div className="mt-1 text-[11px] leading-[1.5] tracking-[1px] text-rice-dim">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 履历时间线 —— 取代原先那面照片墙：墙上的说明文字是设计稿虚构的，
            现按本人简历重建，每条都有据可查 */}
        <div className="mt-[72px]">
          <SectionHeading heading={d.recordHeading} sub={d.recordSub} locale={locale} />
          <Timeline locale={locale} />
        </div>

        {/* 江湖印记：纯影像墙。照片为本人真实素材，
            原设计稿为每张配的说明是杜撰的，已移除，只留图。 */}
        <div className="mt-[72px]">
          <SectionHeading heading={d.journeyHeading} sub={d.journeySub} locale={locale} />
          <div className="gold-grid mt-8 auto-rows-[130px] grid-cols-2 md:auto-rows-[190px] md:grid-cols-4">
            {journeyPhotos.map((j) => (
              <div
                key={j.src}
                className="group relative overflow-hidden bg-ink-card"
                style={{ gridColumn: `span ${j.span}` }}
              >
                <Image
                  src={j.src}
                  alt=""
                  fill
                  sizes={j.span === 2 ? "(max-width: 780px) 100vw, 620px" : "(max-width: 780px) 50vw, 310px"}
                  className="object-cover transition-transform duration-500 [filter:saturate(1.12)_contrast(1.08)] group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
