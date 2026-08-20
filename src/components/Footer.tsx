import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { LogoFull } from "./Logo";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <footer className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 border-t border-gold/22 p-11">
      <div className="flex items-center gap-3">
        <LogoFull size={110} />
        <div className="font-latin text-sm tracking-[3px] text-rice">
          <span className="text-rice-dim">© 2026</span>
        </div>
      </div>
      <div className="text-xs tracking-[2px] text-rice-dim">{d.footer.tagline}</div>
    </footer>
  );
}
