import { events } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Events() {
  return (
    <section id="events" className="sec-pad mx-auto max-w-[1240px] scroll-mt-[76px]">
      <div className="mb-11">
        <SectionHeading zh="赛程" en="EDITION I · WORLD TOUR" />
      </div>

      <div className="flex flex-col">
        {events.map((ev) => (
          <div
            key={ev.date + ev.title}
            className="grid grid-cols-[64px_1fr] items-center gap-[14px] border-t border-gold/20 px-[22px] py-7 transition-colors hover:bg-cinnabar/6 md:grid-cols-[120px_1fr_auto_auto] md:gap-7"
          >
            <div className="font-latin text-[22px] font-semibold tracking-[1px] text-gold">
              {ev.date}
            </div>
            <div>
              <div className="font-serif-sc text-2xl font-black text-white">{ev.title}</div>
              <div className="mt-1 text-[13px] tracking-[1px] text-rice-dim">{ev.venue}</div>
            </div>

            {/* 移动端隐藏对阵与售票标签，只保留日期 + 站名 */}
            <div className="hidden font-latin text-[13px] tracking-[2px] text-rice-dim md:block">
              {ev.card}
            </div>
            {ev.status === "hot" ? (
              <span className="hidden animate-blink border border-flame px-[14px] py-1.5 font-latin text-xs tracking-[3px] whitespace-nowrap text-flame md:block">
                热售 HOT
              </span>
            ) : (
              <span className="hidden border border-rice-dim/40 px-[14px] py-1.5 font-latin text-xs tracking-[3px] whitespace-nowrap text-rice-dim md:block">
                即将开售 SOON
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
