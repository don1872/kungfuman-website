/** 章节标题：书法中文大字 + 金色拉丁副标 */
export function SectionHeading({ zh, en }: { zh: string; en: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <h2 className="font-brush text-[clamp(40px,4.6vw,58px)] whitespace-nowrap text-white">{zh}</h2>
      <span className="font-latin text-sm tracking-[5px] text-gold">{en}</span>
    </div>
  );
}
