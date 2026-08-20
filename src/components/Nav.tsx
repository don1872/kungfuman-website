"use client";

import { Wordmark } from "./Logo";

const LINKS = [
  { href: "#events",   label: "赛程 EVENTS" },
  { href: "#rankings", label: "英雄榜 RANKINGS" },
  { href: "#editions", label: "五届 SAGA" },
  { href: "#founder",  label: "创始人 FOUNDER" },
];

export function Nav({
  langLabel,
  onToggleLang,
  onOpenTicket,
}: {
  langLabel: string;
  onToggleLang: () => void;
  onOpenTicket: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[76px] items-center justify-between bg-gradient-to-b from-ink/85 to-transparent px-[18px] md:px-11">
      <Wordmark />

      <nav className="flex items-center gap-4 font-latin text-sm tracking-[2px] md:gap-[34px]">
        {/* 移动端隐藏锚点链接，只留语言切换与购票 */}
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hidden text-rice [text-shadow:0_1px_6px_rgba(0,0,0,.7)] hover:text-flame md:block"
          >
            {l.label}
          </a>
        ))}

        <button
          onClick={onToggleLang}
          className="cursor-pointer border border-gold/50 px-[14px] py-[9px] font-semibold tracking-[2px] whitespace-nowrap text-gold transition-colors hover:border-gold hover:text-flame"
          aria-label={`切换语言 / switch language`}
        >
          {langLabel}
        </button>

        <button
          onClick={onOpenTicket}
          className="cursor-pointer bg-cinnabar px-4 py-[11px] font-semibold tracking-[3px] whitespace-nowrap text-white shadow-[0_0_28px_rgba(224,58,32,.45)] transition-colors hover:bg-flame md:px-6"
        >
          购票 <span className="hidden sm:inline">TICKETS</span>
        </button>
      </nav>
    </header>
  );
}
