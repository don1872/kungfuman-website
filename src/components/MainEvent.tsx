import { getMainEvent } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";

type Side = ReturnType<typeof getMainEvent>["red"];

function FighterSide({ fighter, side }: { fighter: Side; side: "red" | "gold" }) {
  const accent = side === "red" ? "text-flame" : "text-gold";
  const frame = side === "red" ? "border-cinnabar/50" : "border-gold/50";

  const portrait = (
    <div className={`h-[152px] w-[120px] flex-none overflow-hidden border ${frame}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ⚠️ Wikimedia 占位图，上线前替换为自有素材 */}
      <img
        src={fighter.photo}
        alt={fighter.name}
        loading="lazy"
        className="block h-full w-full object-cover [filter:saturate(1.1)_contrast(1.08)]"
      />
    </div>
  );

  const text = (
    <div>
      <div className={`mb-1.5 text-[13px] tracking-[3px] ${accent}`}>{fighter.style}</div>
      {/* 姓名保持汉字：武者身份不因语言而变 */}
      <div className="font-serif-sc text-[42px] leading-[1.1] font-black text-white">{fighter.name}</div>
      <div className="mt-1.5 font-latin text-sm tracking-[3px] text-rice-dim">{fighter.latin}</div>
    </div>
  );

  return (
    <div
      className={`flex items-center gap-[26px] ${
        side === "red"
          ? "flex-col-reverse justify-center text-center md:flex-row md:justify-end md:text-right"
          : "flex-col justify-center text-center md:flex-row md:text-left"
      }`}
    >
      {side === "red" ? (<>{text}{portrait}</>) : (<>{portrait}{text}</>)}
    </div>
  );
}

export function MainEvent({ locale }: { locale: Locale }) {
  const m = getMainEvent(locale);
  const d = getDict(locale).mainEvent;

  return (
    <section className="sec-pad relative bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#241108_0%,#140b08_70%)]">
      <div className="mx-auto max-w-[1240px] border border-gold/30 bg-[linear-gradient(180deg,rgba(36,17,8,.9),rgba(20,11,8,.95))] shadow-[0_30px_80px_rgba(0,0,0,.5)]">
        <div className="flex items-center justify-between gap-4 border-b border-gold/20 px-[30px] py-[15px] font-latin text-xs tracking-[3px] text-rice-dim">
          <span>{d.meta}</span>
          <span className="animate-blink whitespace-nowrap text-flame">{d.flag}</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 px-5 py-7 md:grid-cols-[1fr_auto_1fr] md:p-11">
          <FighterSide fighter={m.red} side="red" />
          <div className="text-center">
            <div className="mx-auto flex h-[92px] w-[92px] rotate-45 animate-breathe items-center justify-center border-[3px] border-cinnabar bg-cinnabar/12 font-brush text-[34px] text-flame shadow-[0_0_40px_rgba(224,58,32,.35)]">
              <span className="-rotate-45">对决</span>
            </div>
          </div>
          <FighterSide fighter={m.gold} side="gold" />
        </div>
      </div>
    </section>
  );
}
