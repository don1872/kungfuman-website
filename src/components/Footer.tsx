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
 * 有意不放的：邮箱、电话、社交账号、隐私政策与服务条款。
 * 前三项目前没有可用信息，编造联系方式比留空更糟；后两项对应的页面尚未建立，
 * 链到不存在的页面同样不可取。待信息齐备后再补。
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
          <div className="font-latin text-[11px] tracking-[2px] text-rice-dim/70">
            © 2026 {f.entity} · {f.rights}
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
