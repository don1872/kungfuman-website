"use client";

import Link from "next/link";
import { getDict } from "@/lib/dict";
import { otherLocale, type Locale } from "@/lib/locales";
import { Wordmark } from "./Logo";

export function Nav({ locale, onOpenTicket }: { locale: Locale; onOpenTicket: () => void }) {
  const d = getDict(locale);
  const other = otherLocale(locale);

  const links = [
    { href: "#events",   label: d.nav.events },
    { href: "#rankings", label: d.nav.rankings },
    { href: "#editions", label: d.nav.saga },
    { href: "#founder",  label: d.nav.founder },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[76px] items-center justify-between bg-gradient-to-b from-ink/85 to-transparent px-[18px] md:px-11">
      <Wordmark locale={locale} />

      <nav className="flex items-center gap-4 font-latin text-sm tracking-[2px] md:gap-[34px]">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hidden text-rice [text-shadow:0_1px_6px_rgba(0,0,0,.7)] hover:text-flame md:block"
          >
            {l.label}
          </a>
        ))}

        {/* 语言切换是真实链接（非客户端状态），搜索引擎能顺着抓到另一语种 */}
        <Link
          href={`/${other}`}
          hrefLang={other}
          className="cursor-pointer border border-gold/50 px-[14px] py-[9px] font-semibold tracking-[2px] whitespace-nowrap text-gold transition-colors hover:border-gold hover:text-flame"
        >
          {d.nav.switchTo}
        </Link>

        <button
          onClick={onOpenTicket}
          className="cursor-pointer bg-cinnabar px-4 py-[11px] font-semibold tracking-[3px] whitespace-nowrap text-white shadow-[0_0_28px_rgba(224,58,32,.45)] transition-colors hover:bg-flame md:px-6"
        >
          {d.nav.tickets}
        </button>
      </nav>
    </header>
  );
}
