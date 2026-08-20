"use client";

import { useState } from "react";
import {
  TIER_PRICES,
  seatLabel,
  seatSections,
  sessions,
  type SeatSection,
  type Tier,
} from "@/lib/data";
import { Overlay } from "./Overlay";

/* 四档座区配色：未选中 / 选中 */
const TIER_BG: Record<Tier, string> = {
  p: "rgba(224,170,78,.9)",
  a: "rgba(224,58,32,.28)",
  b: "rgba(224,170,78,.22)",
  c: "rgba(245,234,216,.08)",
};
const TIER_BORDER: Record<Tier, string> = {
  p: "#e0aa4e",
  a: "rgba(224,58,32,.8)",
  b: "rgba(224,170,78,.55)",
  c: "rgba(201,179,148,.4)",
};

const LEGEND = [
  { swatch: "rgba(224,170,78,.9)",  label: "主席台 ¥8888" },
  { swatch: "rgba(224,58,32,.7)",   label: "内场 A ¥1888" },
  { swatch: "rgba(224,170,78,.3)",  label: "看台 B ¥888" },
  { swatch: "rgba(245,234,216,.15)", label: "看台 C ¥488" },
];

export function TicketOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [eventIdx, setEventIdx] = useState(0);
  const [seat, setSeat] = useState<SeatSection | null>(null);
  const [qty, setQty] = useState(2);
  const [done, setDone] = useState(false);

  const session = sessions[eventIdx];
  const price = seat ? TIER_PRICES[seat.tier] : 0;
  const total = price * qty;

  const pickSession = (i: number) => {
    setEventIdx(i);
    setSeat(null);
    setDone(false);
    setStep(2);
  };

  return (
    <Overlay title="购票 TICKETS" seal="功" maxWidth="1240px" onClose={onClose}>
      {/* 步骤指示 */}
      <div className="mb-[34px] flex items-center gap-[14px] font-latin text-xs tracking-[3px]">
        <span className={step === 1 ? "text-flame" : "text-rice-dim"}>① 选场次 SESSION</span>
        <span className="text-rice-dim/40">──</span>
        <span className={step === 2 ? "text-flame" : "text-rice-dim/50"}>② 选座位 SEATS</span>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {sessions.map((s, i) => (
            <button
              key={s.date}
              onClick={() => pickSession(i)}
              className="flex cursor-pointer items-center gap-[26px] border border-gold/30 bg-ink-card px-6 py-[30px] text-left transition-colors hover:border-cinnabar hover:bg-ink-hot md:px-8"
            >
              <div className="flex-none text-center">
                <div className="font-latin text-[30px] leading-none font-bold text-gold">
                  {s.date}
                </div>
                <div className="mt-1 text-[11px] tracking-[2px] text-rice-dim">2026</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-serif-sc text-[21px] font-black text-white">
                  {s.title}
                </div>
                <div className="mt-[5px] truncate text-xs tracking-[1px] text-rice-dim">
                  {s.venue}
                </div>
                <div className="mt-2 font-latin text-xs tracking-[2px] text-flame">
                  {s.priceFrom} 起
                </div>
              </div>
              <div
                className={`flex-none px-5 py-[11px] font-latin text-xs tracking-[3px] whitespace-nowrap ${
                  s.isFinal ? "bg-gold text-ink" : "bg-cinnabar text-white"
                }`}
              >
                {s.isFinal ? "总决赛 →" : "选场次 →"}
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <>
          {/* 已选场次条 */}
          <div className="mb-[26px] flex flex-wrap items-center justify-between gap-[14px] border border-gold/30 bg-ink-card px-6 py-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className="flex-none font-latin text-xl font-bold text-gold">
                {session.date}
              </span>
              <div className="min-w-0">
                <div className="truncate font-serif-sc text-lg font-black text-white">
                  {session.title}
                </div>
                <div className="mt-0.5 truncate text-xs text-rice-dim">{session.venue}</div>
              </div>
            </div>
            <button
              onClick={() => {
                setStep(1);
                setSeat(null);
                setDone(false);
              }}
              className="cursor-pointer border border-rice-dim/50 px-4 py-[9px] font-latin text-xs tracking-[2px] text-rice-dim transition-colors hover:border-gold hover:text-gold"
            >
              ← 换场次
            </button>
          </div>

          <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1.25fr_.75fr]">
            {/* 环形场馆 */}
            <div>
              <div className="relative aspect-square rounded-full border border-gold/25 bg-[radial-gradient(circle_at_50%_50%,#241108_0%,#170c07_55%,#140b08_100%)]">
                {seatSections.map((s) => {
                  const selected = seat?.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSeat(s);
                        setDone(false);
                      }}
                      aria-label={`${seatLabel(s)} ¥${TIER_PRICES[s.tier]}`}
                      aria-pressed={selected}
                      className="absolute flex cursor-pointer items-center justify-center border font-latin text-[10px] tracking-[1px] whitespace-nowrap transition-[filter] hover:brightness-140"
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: `${s.w}%`,
                        height: `${s.h}%`,
                        transform: `translate(-50%,-50%) rotate(${s.rot}deg)`,
                        background: selected ? "#e03a20" : TIER_BG[s.tier],
                        borderColor: selected ? "#ff5a3c" : TIER_BORDER[s.tier],
                        color: selected ? "#fff" : s.tier === "p" ? "#140b08" : "#e8d9bd",
                      }}
                    >
                      {s.label}
                    </button>
                  );
                })}

                {/* 中央八角擂台 */}
                <div className="absolute top-1/2 left-1/2 flex h-[21%] w-[21%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-[linear-gradient(135deg,rgba(224,58,32,.35),#2a160c)] [clip-path:polygon(30%_0,70%_0,100%_30%,100%_70%,70%_100%,30%_100%,0_70%,0_30%)]">
                  <div className="font-brush text-[26px] text-white">擂台</div>
                  <div className="font-latin text-[9px] tracking-[3px] text-gold">THE RING</div>
                </div>
              </div>

              <div className="mt-[18px] flex flex-wrap justify-center gap-[22px] text-xs text-rice-dim">
                {LEGEND.map((l) => (
                  <span key={l.label} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5"
                      style={{ background: l.swatch }}
                      aria-hidden
                    />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>

            {/* 右侧结算面板 */}
            <div className="border border-gold/30 bg-ink-card px-[30px] pt-[30px] pb-[34px]">
              <div className="mb-4 font-latin text-xs tracking-[3px] text-gold">
                已选座区 YOUR SEATS
              </div>

              {!seat ? (
                <div className="border border-dashed border-rice-dim/40 p-[22px] text-center text-sm leading-[2] text-rice-dim">
                  点击左侧环形座位图
                  <br />
                  选择座位区域
                </div>
              ) : (
                <>
                  <div className="flex items-baseline justify-between border-b border-gold/20 pb-[14px]">
                    <div className="font-serif-sc text-2xl font-black text-white">
                      {seatLabel(seat)}
                    </div>
                    <div className="font-latin text-[22px] font-bold text-flame">¥{price}</div>
                  </div>

                  <div className="my-5 flex items-center justify-between">
                    <span className="text-sm text-rice-dim">数量 QTY</span>
                    <div className="flex items-center border border-gold/40">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="h-[38px] w-10 cursor-pointer text-lg text-gold hover:bg-gold/10"
                        aria-label="减少数量"
                      >
                        −
                      </button>
                      <span className="w-10 border-x border-gold/25 text-center font-latin text-base leading-[38px] text-white">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty((q) => Math.min(8, q + 1))}
                        className="h-[38px] w-10 cursor-pointer text-lg text-gold hover:bg-gold/10"
                        aria-label="增加数量"
                      >
                        ＋
                      </button>
                    </div>
                  </div>

                  <div className="mb-[22px] flex items-baseline justify-between">
                    <span className="text-sm text-rice-dim">合计 TOTAL</span>
                    <span className="font-latin text-[30px] font-bold text-gold">
                      ¥{total.toLocaleString()}
                    </span>
                  </div>

                  {!done ? (
                    <button
                      onClick={() => setDone(true)}
                      className="w-full cursor-pointer bg-cinnabar py-4 font-latin text-[15px] font-semibold tracking-[4px] text-white shadow-[0_0_26px_rgba(224,58,32,.4)] transition-colors hover:bg-flame"
                    >
                      确认购买 CHECKOUT
                    </button>
                  ) : (
                    <div className="border border-gold bg-gold/12 p-[18px] text-center">
                      <div className="font-brush text-[26px] text-gold">出票成功</div>
                      <div className="mt-1.5 text-xs tracking-[1px] text-rice-dim">
                        电子票已发送至你的账户 · 现场凭码入场
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="mt-[22px] text-[11px] leading-[1.9] text-rice-dim/70">
                · 主席台含贵宾通道、赛后见面会资格
                <br />· 内场 A 为擂台四周首排至五排
                <br />· 每单限购 8 张，演示界面暂不接入真实支付
              </div>
            </div>
          </div>
        </>
      )}
    </Overlay>
  );
}
