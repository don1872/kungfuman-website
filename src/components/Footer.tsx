import Link from "next/link";
import { getDict } from "@/lib/dict";
import { otherLocale, type Locale } from "@/lib/locales";
import { LogoFull } from "./Logo";

/**
 * 站点底部栏。
 *
 * 法人信息取自华盛顿州公司注册文件：KUNG FU MAN CORP.，营利法人，
 * 注册地 12614 SE 208TH PL, Kent, WA 98031-2296。
 *
 * 联系方式（电话、邮箱、Instagram）均取自本人提供，未作补充。
 *
 * 隐私政策与服务条款为模板文本，见 src/lib/legal.ts 顶部的待办清单——
 * 正式收集个人信息前须经律师审定。
 */
export function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const f = d.footer;
  const other = otherLocale(locale);

  const columns = [
    {
      title: f.colEvent,
      links: [
        { href: "#events", label: f.linkEvents },
        { href: "#rankings", label: f.linkRankings },
        { href: "#editions", label: f.linkSaga },
      ],
    },
    {
      title: f.colJoin,
      links: [
        { href: "#tickets", label: f.linkTickets },
        { href: "#tickets", label: f.linkApply },
      ],
    },
    {
      title: f.colAbout,
      links: [
        { href: "#founder", label: f.linkFounder },
        { href: "#media", label: f.linkMedia },
      ],
    },
  ];

  return (
    <footer className="border-t border-gold/22">
      <div className="mx-auto max-w-[1240px] px-5 pt-14 pb-10 md:px-11">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          {/* 品牌与法人 */}
          <div>
            <LogoFull size={96} />
            <div className="mt-5 font-latin text-sm font-semibold tracking-[3px] text-rice">
              {f.entity}
            </div>
            <div className="mt-1.5 text-xs leading-[1.8] text-rice-dim">{f.entityNote}</div>
            <div className="mt-4 font-latin text-[10px] tracking-[3px] text-gold">
              {f.addressLabel}
            </div>
            <address className="mt-1.5 text-xs leading-[1.9] text-rice-dim not-italic">
              {f.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>

            <div className="mt-4 font-latin text-[10px] tracking-[3px] text-gold">
              {f.colContact}
            </div>
            <dl className="mt-1.5 space-y-1.5 text-xs text-rice-dim">
              <div className="flex flex-wrap gap-x-2">
                <dt>{f.phoneLabel}</dt>
                <dd>
                  <a
                    href={`tel:${f.phone.replace(/[^\d+]/g, "")}`}
                    className="font-latin tracking-[1px] text-rice transition-colors hover:text-flame"
                  >
                    {f.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt>{f.emailLabel}</dt>
                <dd>
                  <a
                    href={`mailto:${f.email}`}
                    className="font-latin tracking-[.5px] break-all text-rice transition-colors hover:text-flame"
                  >
                    {f.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt>{f.socialLabel}</dt>
                <dd>
                  <a
                    href={`https://instagram.com/${f.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-latin tracking-[.5px] text-rice transition-colors hover:text-flame"
                  >
                    @{f.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* 站内导航三列 */}
          {columns.map((col) => (
            <nav key={col.title}>
              <div className="font-latin text-[11px] tracking-[4px] text-gold">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[13px] text-rice-dim transition-colors hover:text-flame"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* 版权条 */}
      <div className="border-t border-gold/15">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-11">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="font-latin text-[11px] tracking-[2px] text-rice-dim/70">
              © 2026 {f.entity} · {f.rights}
            </span>
            <span className="flex items-center gap-3 text-[11px] tracking-[1px]">
              <Link href={`/${locale}/privacy`} className="text-rice-dim/80 transition-colors hover:text-flame">
                {f.linkPrivacy}
              </Link>
              <span className="text-rice-dim/30">·</span>
              <Link href={`/${locale}/terms`} className="text-rice-dim/80 transition-colors hover:text-flame">
                {f.linkTerms}
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[11px] tracking-[2px] text-rice-dim/70">{f.tagline}</span>
            <Link
              href={`/${other}`}
              hrefLang={other}
              className="font-latin text-[11px] tracking-[2px] text-gold transition-colors hover:text-flame"
            >
              {d.nav.switchTo}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
