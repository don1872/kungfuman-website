import type { Locale } from "@/lib/locales";

/**
 * 章节标题。
 * 中文版用 Ma Shan Zheng 书法；英文版 Ma Shan Zheng 没有拉丁字形，
 * 改用 Oswald 窄体大写 + 大字距 —— 设计稿的拉丁部分本就是这个路子。
 */
export function SectionHeading({
  heading,
  sub,
  locale,
}: {
  heading: string;
  sub: string;
  locale: Locale;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
      <h2
        className={
          locale === "zh"
            ? "font-brush text-[clamp(40px,4.6vw,58px)] whitespace-nowrap text-white"
            : "font-latin text-[clamp(30px,3.4vw,44px)] font-bold tracking-[6px] text-white uppercase"
        }
      >
        {heading}
      </h2>
      <span className="font-latin text-sm tracking-[5px] text-gold">{sub}</span>
    </div>
  );
}
