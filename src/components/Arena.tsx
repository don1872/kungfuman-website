import Image from "next/image";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";

/**
 * 擂台现场板块。
 *
 * 文案集中在左栏，右侧留给擂台本身。
 * 初版把文字横铺整幅，正文正好压在亮红台基与金色「功夫侠」上，几乎读不了——
 * 现改为左侧单独一道横向渐变作底，文字在任何画面内容之上都能立住，
 * 右侧仍保持通透。
 *
 * 图为设计效果图而非现场照片，右下角有明确标注（顶部会被固定导航栏遮住）：
 * 把渲染图当实景展示，会让买票的人对现场产生错误预期。
 */
export function Arena({ locale, onOpenTicket }: { locale: Locale; onOpenTicket: () => void }) {
  const d = getDict(locale).arena;

  return (
    <section id="arena" className="relative flex min-h-[94vh] items-center overflow-hidden">
      <Image
        src="/assets/arena.jpg"
        alt={locale === "zh" ? "功夫侠擂台效果图" : "KUNGFUMAN arena design render"}
        fill
        sizes="100vw"
        className="object-cover object-[62%_center] [filter:saturate(1.06)_contrast(1.04)]"
      />

      {/* 上下轻压：稳住与相邻板块的衔接 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,11,8,.85)_0%,transparent_22%,transparent_74%,rgba(20,11,8,.9)_100%)]" />
      {/* 左侧压暗：文字的底 */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,11,8,.95)_0%,rgba(20,11,8,.9)_34%,rgba(20,11,8,.72)_52%,rgba(20,11,8,.32)_68%,transparent_84%)]" />

      <div className="relative z-2 mx-auto w-full max-w-[1240px] px-5 py-24 md:px-11">
        <div className="max-w-[640px]">
          <div className="font-latin text-xs tracking-[6px] text-gold">{d.eyebrow}</div>

          <h2
            className={`mt-5 text-white ${
              locale === "zh"
                ? "font-brush text-[clamp(32px,4.4vw,58px)] leading-[1.35]"
                : "font-latin text-[clamp(24px,3.1vw,42px)] leading-[1.2] font-bold tracking-[2px] uppercase"
            }`}
          >
            {d.heading}
          </h2>

          <p className="mt-6 text-[14px] leading-[2.05] text-rice/85 md:text-[15px]">{d.body}</p>

          {/* 四个看点：两列，跟着左栏走 */}
          <div className="mt-10 grid grid-cols-2 gap-x-7 gap-y-6">
            {d.features.map((f) => (
              <div key={f.title} className="border-t border-gold/45 pt-3.5">
                <div
                  className={`text-white ${
                    locale === "zh"
                      ? "font-serif-sc text-[16px] font-black"
                      : "font-latin text-[13px] font-bold tracking-[2px]"
                  }`}
                >
                  {f.title}
                </div>
                <div className="mt-1.5 text-xs leading-[1.75] text-rice-dim">{f.note}</div>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenTicket}
            className="mt-10 cursor-pointer bg-cinnabar px-11 py-4 font-latin text-sm font-semibold tracking-[4px] whitespace-nowrap text-white shadow-[0_0_34px_rgba(224,58,32,.45)] transition-colors hover:bg-flame"
          >
            {d.cta}
          </button>
        </div>
      </div>

      <div className="absolute right-5 bottom-5 z-2 font-latin text-[10px] tracking-[3px] text-rice/40 md:right-11 md:bottom-7">
        {d.renderNote}
      </div>
    </section>
  );
}
