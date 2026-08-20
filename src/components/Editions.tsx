import { editions } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Editions({ sagaP }: { sagaP: string }) {
  return (
    <section id="editions" className="sec-pad mx-auto max-w-[1240px] scroll-mt-[76px]">
      <div className="mb-3">
        <SectionHeading zh="五届之路" en="THE FIVE-EDITION SAGA" />
      </div>
      <p className="mb-12 max-w-[560px] text-sm leading-[2] text-rice-dim">{sagaP}</p>

      <div className="gold-grid grid-cols-2 md:grid-cols-5">
        {editions.map((ed) => (
          <div
            key={ed.year}
            className={`relative overflow-hidden px-6 pt-9 pb-[30px] text-center transition-colors hover:bg-ink-hot ${
              ed.live ? "bg-ink-hot" : "bg-ink-card"
            }`}
          >
            <div
              className={`font-latin text-[11px] tracking-[4px] ${ed.live ? "text-flame" : "text-rice-dim"}`}
            >
              {ed.year}
            </div>
            <div
              className={`my-[14px] mb-1.5 font-brush text-[72px] leading-[1.1] ${
                ed.live ? "text-gold" : "text-rice/80"
              }`}
            >
              {ed.char}
            </div>
            <div className="font-serif-sc text-xl font-black text-white">{ed.name}</div>
            <div className="mt-1.5 font-latin text-[11px] tracking-[3px] text-rice-dim">{ed.en}</div>
            <div className="mt-[14px] text-xs leading-[1.8] text-rice-dim">{ed.motto}</div>

            {ed.live && (
              <div className="absolute top-[14px] right-[14px] border border-flame px-2 py-[3px] font-latin text-[10px] tracking-[2px] text-flame">
                NOW
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
