import { media } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Media() {
  return (
    <section id="media" className="border-t border-gold/18">
      <div className="sec-pad mx-auto max-w-[1240px]">
        <div className="mb-11">
          <SectionHeading zh="集锦" en="HIGHLIGHTS" />
        </div>

        <div className="grid grid-cols-2 gap-[18px] md:grid-cols-4">
          {media.map((m) => (
            <button
              key={m.char}
              type="button"
              /* TODO: 接入视频播放器（README 后续开发清单第 5 条） */
              className="group relative flex aspect-3/4 cursor-pointer flex-col justify-end overflow-hidden border border-gold/25 bg-[radial-gradient(ellipse_at_50%_100%,#2a160c,#140b08)] p-5 text-left transition-all hover:border-cinnabar hover:shadow-[0_0_34px_rgba(224,58,32,.25)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ⚠️ Wikimedia 占位图，上线前替换 */}
              <img
                src={m.src}
                alt={m.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover [filter:saturate(1.1)_contrast(1.05)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,11,8,.2)_0%,rgba(20,11,8,.45)_50%,rgba(20,11,8,.92)_100%)]" />
              <div className="stroke-char absolute top-[8%] left-1/2 -translate-x-1/2 font-brush text-[120px] [-webkit-text-stroke-color:rgba(224,170,78,.55)]">
                {m.char}
              </div>

              <div className="relative">
                <div className="mb-[14px] flex h-10 w-10 items-center justify-center rounded-full border border-flame text-[13px] text-flame transition-colors group-hover:bg-flame group-hover:text-ink">
                  ▶
                </div>
                <div className="font-serif-sc text-[17px] leading-[1.4] font-black text-white">
                  {m.title}
                </div>
                <div className="mt-1.5 font-latin text-[11px] tracking-[2px] text-rice-dim">
                  {m.meta}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
