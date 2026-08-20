import { tickerItems } from "@/lib/data";

/** 快讯跑马灯：内容重复两遍 + translateX(-50%) 实现无缝循环 */
export function Ticker() {
  return (
    <div className="overflow-hidden bg-cinnabar py-[11px] font-latin text-[13px] font-semibold tracking-[3px] whitespace-nowrap text-white shadow-[0_0_40px_rgba(224,58,32,.35)]">
      <div className="inline-flex animate-marquee gap-[60px] pl-[60px]">
        {[0, 1].map((pass) =>
          tickerItems.map((item) => (
            <span key={`${pass}-${item}`} className="contents">
              <span>{item}</span>
              <span aria-hidden>◆</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
