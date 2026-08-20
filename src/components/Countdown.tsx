"use client";

import { useSyncExternalStore } from "react";
import { COUNTDOWN_TARGET } from "@/lib/data";

/* ── 时钟作为外部数据源 ──
 * 用 useSyncExternalStore 而非 useEffect + setState：
 * 后者会在 effect 里同步触发级联渲染，且服务端/客户端首帧值不一致会导致 hydration 报错。
 * getServerSnapshot 返回 0，服务端与首帧统一渲染 "--"，hydration 后自动切到真实时间。
 */
let cached = 0;

function subscribe(onChange: () => void) {
  cached = Date.now();
  onChange();
  const timer = setInterval(() => {
    cached = Date.now();
    onChange();
  }, 1000);
  return () => clearInterval(timer);
}

const getSnapshot = () => cached;
const getServerSnapshot = () => 0;

const pad = (n: number) => String(n).padStart(2, "0");

function values(now: number) {
  if (now === 0) return ["--", "--", "--", "--"];
  const d = Math.max(0, COUNTDOWN_TARGET - now);
  return [
    pad(Math.floor(d / 864e5)),
    pad(Math.floor(d / 36e5) % 24),
    pad(Math.floor(d / 6e4) % 60),
    pad(Math.floor(d / 1e3) % 60),
  ];
}

export function Countdown({
  labels,
  dateLine,
  venueLine,
}: {
  labels: readonly [string, string, string, string];
  dateLine: string;
  venueLine: string;
}) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const vals = values(now);

  return (
    <div className="flex w-full flex-wrap border border-gold/40 bg-ink/55 backdrop-blur-lg md:w-auto">
      {labels.map((label, i) => (
        <div
          key={label}
          className="flex-1 border-r border-gold/20 px-2 py-[14px] text-center md:flex-none md:px-[30px] md:py-[18px]"
        >
          <div className="font-latin text-[38px] leading-none font-bold text-white tabular-nums">
            {vals[i]}
          </div>
          <div className="mt-1.5 text-[11px] tracking-[4px] text-gold">{label}</div>
        </div>
      ))}
      <div className="flex flex-col justify-center px-[26px] py-[18px]">
        <div className="font-latin text-[13px] tracking-[3px] text-gold">{dateLine}</div>
        <div className="mt-1 text-xs text-rice/75">{venueLine}</div>
      </div>
    </div>
  );
}
