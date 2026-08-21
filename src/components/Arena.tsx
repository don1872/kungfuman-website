import Image from "next/image";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";

/**
 * 擂台现场板块。
 *
 * 整幅效果图完全展示，不做侧向遮挡——铜钟与太极圆台是画面的价值所在，挡掉就没意义了。
 *
 * 文字压在底部：实测这张图逐段平均亮度，底部 13% 只有 27（很暗），
 * 中段 50–62% 的红色台基高达 70（最亮）。所以只在上下两端做渐变
 * ——顶部为固定导航让位，底部为文字打底——中间完全通透。
 * 与 Hero 用的是同一套手法。
 *
 * 图为设计效果图而非现场照片，右上角有标注：
 * 把渲染图当实景展示，会让买票的人对现场产生错误预期。
 */
export function Arena({ locale, onOpenTicket }: { locale: Locale; onOpenTicket: () => void }) {
  const d = getDict(locale).arena;

  return (
    <section id="arena" className="relative flex min-h-screen items-end overflow-hidden">
      <Image
        src="/assets/arena.jpg"
        alt={locale === "zh" ? "功夫侠擂台效果图" : "KUNGFUMAN arena design render"}
        fill
        sizes="100vw"
        className="object-cover object-center [filter:saturate(1.06)_contrast(1.04)]"
      />

      {/* 顶端：给固定导航让位 */}
      <div className="absolute inset-x-0 top-0 h-[22%] bg-[linear-gradient(180deg,rgba(20,11,8,.82)_0%,transparent_100%)]" />
      {/* 底端：文字的底。起点压在最亮的台基之下，中间不遮 */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(180deg,transparent_0%,rgba(20,11,8,.28)_22%,rgba(20,11,8,.62)_46%,rgba(20,11,8,.88)_70%,rgba(20,11,8,.97)_100%)]" />

      <div className="absolute top-[15%] right-5 z-2 font-latin text-[10px] tracking-[3px] text-rice/45 md:right-11">
        {d.renderNote}
      </div>

      <div className="relative z-2 mx-auto w-full max-w-[1240px] px-5 pb-14 md:px-11 md:pb-16">
        <div className="font-latin text-xs tracking-[6px] text-gold [text-shadow:0_1px_10px_rgba(0,0,0,.9)]">
          {d.eyebrow}
        </div>

        <h2
          className={`mt-4 text-white [text-shadow:0_3px_28px_rgba(0,0,0,.95),0_1px_6px_rgba(0,0,0,.9)] ${
            locale === "zh"
              ? "font-brush text-[clamp(32px,4.8vw,64px)] leading-[1.3]"
              : "max-w-[24ch] font-latin text-[clamp(24px,3.3vw,46px)] leading-[1.18] font-bold tracking-[2px] uppercase"
          }`}
        >
          {d.heading}
        </h2>

        <p className="mt-5 max-w-[68ch] text-[14px] leading-[2] text-rice/90 [text-shadow:0_1px_10px_rgba(0,0,0,.95)] md:text-[15px]">
          {d.body}
        </p>

        {/* 底排：四个看点横向铺开，购票按钮居右 */}
        <div className="mt-9 flex flex-col gap-8 border-t border-gold/40 pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="grid grid-cols-2 gap-x-7 gap-y-5 md:grid-cols-4 md:gap-x-9">
            {d.features.map((f) => (
              <div key={f.title}>
                <div
                  className={`text-white [text-shadow:0_1px_8px_rgba(0,0,0,.9)] ${
                    locale === "zh"
                      ? "font-serif-sc text-[16px] font-black"
                      : "font-latin text-[13px] font-bold tracking-[2px]"
                  }`}
                >
                  {f.title}
                </div>
                <div className="mt-1.5 text-xs leading-[1.7] text-rice/70 [text-shadow:0_1px_8px_rgba(0,0,0,.9)]">
                  {f.note}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenTicket}
            className="cursor-pointer self-start bg-cinnabar px-11 py-4 font-latin text-sm font-semibold tracking-[4px] whitespace-nowrap text-white shadow-[0_0_34px_rgba(224,58,32,.5)] transition-colors hover:bg-flame lg:self-auto"
          >
            {d.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
