import Link from "next/link";
import type { ResolvedDoc } from "@/lib/legal";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { Footer } from "./Footer";
import { Wordmark } from "./Logo";

/** 法务页面外壳：简化的头部 + 正文 + 复用站点页脚 */
export function LegalPage({ locale, doc }: { locale: Locale; doc: ResolvedDoc }) {
  const d = getDict(locale);

  return (
    <>
      <header className="border-b border-gold/18">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-5 md:px-11">
          <Link href={`/${locale}`} aria-label="KUNGFUMAN">
            <Wordmark locale={locale} />
          </Link>
          <Link
            href={`/${locale}`}
            className="font-latin text-xs tracking-[3px] whitespace-nowrap text-rice-dim transition-colors hover:text-flame"
          >
            ← {locale === "zh" ? "返回首页" : "BACK"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-5 pt-16 pb-24 md:px-11">
        <h1
          className={
            locale === "zh"
              ? "font-brush text-[clamp(38px,5vw,56px)] text-white"
              : "font-latin text-[clamp(30px,3.6vw,46px)] font-bold tracking-[5px] text-white uppercase"
          }
        >
          {doc.title}
        </h1>
        <div className="mt-3 font-latin text-[11px] tracking-[3px] text-gold">{doc.updated}</div>

        <p className="mt-8 text-[15px] leading-[2] text-rice-dim">{doc.intro}</p>

        <div className="mt-12 space-y-11">
          {doc.sections.map((sec, i) => (
            <section key={sec.heading}>
              <h2 className="flex items-baseline gap-3">
                <span className="font-latin text-[13px] font-bold text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif-sc text-xl font-black text-white">{sec.heading}</span>
              </h2>
              <div className="mt-4 space-y-3 border-l border-gold/20 pl-5">
                {sec.body.map((para) => (
                  <p key={para} className="text-sm leading-[2] text-rice-dim">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border border-gold/25 bg-ink-card p-7">
          <div className="font-latin text-[11px] tracking-[4px] text-gold">
            {locale === "zh" ? "联系我们" : "CONTACT US"}
          </div>
          <div className="mt-4 space-y-1.5 text-sm leading-[1.9] text-rice-dim">
            <div className="font-latin font-semibold tracking-[2px] text-rice">{d.footer.entity}</div>
            <div>{d.footer.entityNote}</div>
            <div>
              {d.footer.phoneLabel}{" "}
              <a href={`tel:${d.footer.phone.replace(/[^\d+]/g, "")}`} className="text-gold hover:text-flame">
                {d.footer.phone}
              </a>
            </div>
            <div>
              {d.footer.emailLabel}{" "}
              <a href={`mailto:${d.footer.email}`} className="break-all text-gold hover:text-flame">
                {d.footer.email}
              </a>
            </div>
            {d.footer.address.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
