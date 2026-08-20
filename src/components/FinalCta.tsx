import { photos } from "@/lib/data";

export function FinalCta({
  cta1,
  cta2,
  onOpenTicket,
  onOpenReg,
}: {
  cta1: string;
  cta2: string;
  onOpenTicket: () => void;
  onOpenReg: () => void;
}) {
  return (
    <section id="tickets" className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div
        className="fx-bg"
        style={{
          backgroundImage: `url('${photos.ctaLanternGym}')`,
          backgroundPosition: "50% 35%",
          filter: "saturate(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#140b08_0%,rgba(20,11,8,.62)_30%,rgba(20,11,8,.82)_100%)]" />

      <div className="relative z-2 mx-auto w-full max-w-[1240px] px-5 py-[100px] md:px-11">
        <div className="mb-14 text-center">
          <div className="font-brush text-[clamp(48px,6vw,84px)] text-white [text-shadow:0_4px_40px_rgba(0,0,0,.8)]">
            上擂台，见真章
          </div>
          <div className="mt-2.5 font-latin text-sm tracking-[8px] text-gold">
            YOUR MOMENT. YOUR LEGACY.
          </div>
        </div>

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-gold/35 bg-ink/72 p-10 text-center backdrop-blur-[10px]">
            <div className="font-brush text-[38px] text-white">现场观赛</div>
            <p className="my-[14px] mb-[26px] text-sm leading-[2] text-rice-dim">{cta1}</p>
            <button
              onClick={onOpenTicket}
              className="inline-block cursor-pointer bg-cinnabar px-[42px] py-4 font-latin text-sm font-semibold tracking-[4px] whitespace-nowrap text-white shadow-[0_0_30px_rgba(224,58,32,.4)] transition-colors hover:bg-flame"
            >
              立即购票 BUY NOW
            </button>
          </div>

          <div className="border border-gold/35 bg-ink/72 p-10 text-center backdrop-blur-[10px]">
            <div className="font-brush text-[38px] text-white">武者报名</div>
            <p className="my-[14px] mb-[26px] text-sm leading-[2] text-rice-dim">{cta2}</p>
            <button
              onClick={onOpenReg}
              className="inline-block cursor-pointer border border-gold px-[42px] py-[15px] font-latin text-sm font-semibold tracking-[4px] whitespace-nowrap text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              报名参赛 APPLY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
