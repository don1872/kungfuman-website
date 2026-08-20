/** 章节标题：书法中文大字（两语种共用，作视觉符号）+ 金色拉丁副标（随语言） */
export function SectionHeading({ brush, sub }: { brush: string; sub: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <h2 className="font-brush text-[clamp(40px,4.6vw,58px)] whitespace-nowrap text-white">{brush}</h2>
      <span className="font-latin text-sm tracking-[5px] text-gold">{sub}</span>
    </div>
  );
}
