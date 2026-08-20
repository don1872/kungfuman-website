import Image from "next/image";
import { getEras, getMilestones } from "@/lib/founder";
import type { Locale } from "@/lib/locales";

/**
 * 英文说明按句拆行，每句独占一行，不与相邻句子挤在同一行。
 *
 * (?<=[.;])         紧邻的前一个字符是句点或分号
 * (?<![A-Z][.;])    但前两个字符不是「大写字母 + 句点」——避开 S. R. Nathan 这类缩写
 * (?=[A-Z])         后面紧跟大写字母，即确实是新句开头
 */
const splitSentences = (text: string) =>
  text.split(/(?<=[.;])(?<![A-Z][.;])\s+(?=[A-Z])/).filter(Boolean);

/**
 * 创始人履历时间线。
 *
 * 左列年份、中间一道金线串起节点、右列内容与配图。
 * 按「起点 / 影视 / 竞技 / 创作与传承」分章，章名作为金线上的分段标记。
 * 窄屏下金线收窄、年份缩小，但保持同一结构，不改版式。
 */
export function Timeline({ locale }: { locale: Locale }) {
  const milestones = getMilestones(locale);
  const eras = getEras(locale);

  // 每个章节第一条前插入章名标记
  const firstOfEra = new Map<string, number>();
  milestones.forEach((m, i) => {
    if (!firstOfEra.has(m.era)) firstOfEra.set(m.era, i);
  });

  return (
    <ol className="relative mt-12">
      {milestones.map((m, i) => {
        const eraLabel =
          firstOfEra.get(m.era) === i ? eras.find((e) => e.key === m.era)?.label : null;

        return (
          <li key={i}>
            {eraLabel && (
              <div className="grid grid-cols-[64px_1px_1fr] gap-x-4 md:grid-cols-[110px_1px_1fr] md:gap-x-8">
                <div />
                <div className="bg-gold/25" />
                <div className="pt-8 pb-3 font-latin text-[11px] tracking-[5px] text-flame first:pt-0">
                  {eraLabel}
                </div>
              </div>
            )}

            <div className="grid grid-cols-[64px_1px_1fr] gap-x-4 md:grid-cols-[110px_1px_1fr] md:gap-x-8">
              {/* 年份 */}
              <div className="pt-1 text-right font-latin text-[13px] leading-[1.5] font-semibold tracking-[1px] text-gold md:text-[17px]">
                {m.year}
              </div>

              {/* 金线与节点 */}
              <div className="relative bg-gold/25">
                <span className="absolute -left-[3px] top-[9px] h-[7px] w-[7px] rounded-full bg-gold" />
              </div>

              {/* 内容：桌面端图片置于文字右侧，整体更紧凑；窄屏下堆叠 */}
              <div className="flex flex-col gap-4 pb-9 md:flex-row md:items-start md:gap-6">
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif-sc text-[17px] leading-[1.5] font-black text-white md:text-xl">
                    {m.title}
                  </h4>
                  {m.detail &&
                    (locale === "en" ? (
                      <div className="mt-2 space-y-[3px] text-[13px] leading-[1.9] text-rice-dim md:text-sm">
                        {splitSentences(m.detail).map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-[13px] leading-[1.95] text-rice-dim md:text-sm">
                        {m.detail}
                      </p>
                    ))}
                </div>

                {m.photo && (
                  <figure className="flex-none overflow-hidden border border-gold/25 bg-ink-card">
                    <Image
                      src={m.photo}
                      alt={m.alt ?? m.title}
                      width={880}
                      height={600}
                      sizes="(max-width: 780px) 90vw, 210px"
                      className="h-auto max-h-[180px] w-full object-contain md:w-[210px]"
                    />
                  </figure>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
