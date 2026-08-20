import { photos } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";

export function FinalCta({
  locale,
  onOpenTicket,
  onOpenReg,
}: {
  locale: Locale;
  onOpenTicket: () => void;
  onOpenReg: () => void;
}) {
  const d = getDict(locale).cta;

  return (
    <section id="tickets" className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div
        className="fx-bg"
        style={{ backgroundImage: `url('${photos.ctaLanternGym}')`, backgroundPosition: "50% 35%", filter: "saturate(1.1)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#140b08_0%,rgba(20,11,8,.62)_30%,rgba(20,11,8,.82)_100%)]" />

      <div className="relative z-2 mx-auto w-full max-w-[1240px] px-5 py-[100px] md:px-11">
        <div className="mb-14 text-center">
          {/* 书法金句：两语种共用 */}
          <div className="font-brush text-[clamp(48px,6vw,84px)] text-white [text-shadow:0_4px_40px_rgba(0,0,0,.8)]">
            {d.brush}
          </div>
          <div className="mt-2.5 font-latin text-sm tracking-[8px] text-gold">{d.sub}</div>
        </div>

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-gold/35 bg-ink/72 p-10 text-center backdrop-blur-[10px]">
            <div className={`text-white ${locale === "zh" ? "font-brush text-[38px]" : "font-latin text-[30px] font-semibold tracking-[4px]"}`}>
              {d.watchTitle}
            </div>
            <p className="my-[14px] mb-[26px] text-sm leading-[2] text-rice-dim">{d.watchBody}</p>
            <button
              onClick={onOpenTicket}
              className="inline-block cursor-pointer bg-cinnabar px-[42px] py-4 font-latin text-sm font-semibold tracking-[4px] whitespace-nowrap text-white shadow-[0_0_30px_rgba(224,58,32,.4)] transition-colors hover:bg-flame"
            >
              {d.watchBtn}
            </button>
          </div>

          <div className="border border-gold/35 bg-ink/72 p-10 text-center backdrop-blur-[10px]">
            <div className={`text-white ${locale === "zh" ? "font-brush text-[38px]" : "font-latin text-[30px] font-semibold tracking-[4px]"}`}>
              {d.applyTitle}
            </div>
            <p className="my-[14px] mb-[26px] text-sm leading-[2] text-rice-dim">{d.applyBody}</p>
            <button
              onClick={onOpenReg}
              className="inline-block cursor-pointer border border-gold px-[42px] py-[15px] font-latin text-sm font-semibold tracking-[4px] whitespace-nowrap text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              {d.applyBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
