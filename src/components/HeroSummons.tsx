import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";

export type SummonsData = {
  name: string;
  alias: string;
  age: string;
  nation: string;
  style: string;
  category: string;
  phone: string;
  no: string;
  date: Date;
};

const CN_DIGITS = "〇一二三四五六七八九";

/** 1–99 转汉字，用于帖上的年龄 */
function cnNumber(n: number): string {
  if (n < 10) return CN_DIGITS[n];
  if (n === 10) return "十";
  if (n < 20) return "十" + (n % 10 ? CN_DIGITS[n % 10] : "");
  const tens = CN_DIGITS[Math.floor(n / 10)] + "十";
  return n % 10 ? tens + CN_DIGITS[n % 10] : tens;
}

/** 二〇二六年八月二十日 —— 年份逐字读，月日用数词 */
function cnDate(d: Date): string {
  const year = String(d.getFullYear()).split("").map((c) => CN_DIGITS[Number(c)]).join("");
  return `${year}年${cnNumber(d.getMonth() + 1)}月${cnNumber(d.getDate())}日`;
}

/** 四角回纹：两条金线拼出的角托，四个角各转 90° */
function Corner({ at }: { at: "tl" | "tr" | "bl" | "br" }) {
  const pos = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  }[at];
  return (
    <div className={`pointer-events-none absolute h-7 w-7 ${pos}`} aria-hidden>
      <span className="absolute top-0 left-0 h-px w-full bg-gold/70" />
      <span className="absolute top-0 left-0 h-full w-px bg-gold/70" />
      <span className="absolute top-[5px] left-[5px] h-px w-[60%] bg-gold/40" />
      <span className="absolute top-[5px] left-[5px] h-[60%] w-px bg-gold/40" />
    </div>
  );
}

/** 朱文方印，压角摆放 */
function Seal({ text, brush, size = 84 }: { text: string; brush: boolean; size?: number }) {
  return (
    <div
      className={`flex flex-none -rotate-6 items-center justify-center bg-cinnabar text-white ${
        brush ? "font-brush leading-[1.15]" : "font-latin leading-[1.2] font-bold tracking-[1px]"
      }`}
      style={{
        width: size,
        height: size,
        fontSize: brush ? size * 0.31 : size * 0.155,
        // 内白边模拟印面留白；外阴影压得很淡 —— 钤印不发光
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,.4), 0 2px 10px rgba(0,0,0,.5)",
      }}
      aria-label={text}
    >
      <span className={brush ? "" : "px-2 text-center"}>{text}</span>
    </div>
  );
}

/**
 * 英雄帖 —— 报名提交后自动生成。
 *
 * 中文版按传统帖式：竖排右起、双金框、四角回纹、朱印压角。
 * 英文版竖排不成立，改为同一框型的横排正式召集函。
 * 未填写的选填字段整句略去，不显示占位符。
 */
export function HeroSummons({ locale, data }: { locale: Locale; data: SummonsData }) {
  const s = getDict(locale).register.summons;
  const vertical = locale === "zh";

  const fill = (line: string) =>
    line
      .replace("{name}", data.name)
      .replace("{alias}", data.alias ? (vertical ? `「${data.alias}」` : `“${data.alias}”`) : "")
      .replace("{style}", data.style)
      .replace("{nation}", data.nation)
      .replace("{age}", vertical && /^\d+$/.test(data.age) ? cnNumber(Number(data.age)) : data.age)
      .replace("{cat}", data.category);

  // 含空字段的句子整句丢弃 —— 帖上不该出现「—」
  const body = s.body
    .filter((line) => {
      if (line.includes("{style}") && !data.style) return false;
      if (line.includes("{nation}") && !data.nation) return false;
      if (line.includes("{age}") && !data.age) return false;
      return true;
    })
    .map(fill)
    .map((l) => l.replace(/\s{2,}/g, " ").trim());

  return (
    <div className="relative overflow-hidden border-2 border-gold bg-[linear-gradient(155deg,#2a160c_0%,#1a0e09_45%,#241108_100%)]">
      {/* 织物般的斜向暗纹，压住大面积纯色 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(224,170,78,.05) 0 1px, transparent 1px 7px)",
        }}
        aria-hidden
      />

      <div className="relative m-2 border border-gold/35 px-4 py-7 md:m-3 md:px-10 md:py-10">
        <Corner at="tl" />
        <Corner at="tr" />
        <Corner at="bl" />
        <Corner at="br" />

        {vertical ? (
          /* ── 中文：竖排右起 ──
             块级子元素在 writing-mode: vertical-rl 下会原生从右往左排成列，
             列内文字从上到下。不要套 flex：竖排时 flex 主轴变成垂直方向，
             会把每块压成一字一列。列间距用物理 margin-left（列朝左堆叠）。

             窄屏上所有列的总宽会超出视口，被外层 overflow-hidden 从右侧裁掉，
             所以移动端整体缩字号缩列距，并把朱印移出文流改为绝对定位。 */
          <div className="relative">
            {/*
              字号与列距用 clamp 随视口连续缩放。单断点切换在断点附近会溢出：
              780px 处桌面字号刚生效、容器却还窄，竖排总宽会超出内容盒被裁掉。
            */}
            <div
              className="mx-auto h-[clamp(280px,34vw,360px)] [writing-mode:vertical-rl]"
              style={{ textOrientation: "upright" }}
            >
              <h3 className="ml-[clamp(8px,1.6vw,32px)] pt-1 font-brush text-[clamp(30px,5.6vw,60px)] leading-none tracking-[clamp(4px,.7vw,8px)] text-gold">
                {s.title}
              </h3>

              {s.lead.map((l) => (
                <p
                  key={l}
                  className="ml-[clamp(6px,1vw,16px)] pt-1 text-[clamp(10px,1.3vw,13px)] tracking-[clamp(3px,.5vw,6px)] text-rice-dim"
                >
                  {l}
                </p>
              ))}

              {body.map((line, i) => (
                <p
                  key={i}
                  className={`ml-[clamp(9px,1.7vw,24px)] text-[clamp(13px,2vw,20px)] leading-[1.05] tracking-[clamp(2px,.35vw,4px)] ${
                    i === 1 ? "font-semibold text-white" : "text-rice"
                  }`}
                >
                  {line}
                </p>
              ))}

              <p className="ml-[clamp(10px,2vw,32px)] text-[clamp(12px,1.7vw,16px)] leading-[1.05] tracking-[clamp(2px,.35vw,4px)] text-gold-soft">
                {s.closing}
              </p>

              {/* 落款：署名与日期，日期用汉字数字 */}
              <p className="ml-[clamp(6px,.9vw,12px)] pt-2 text-[clamp(10px,1.3vw,13px)] tracking-[clamp(2px,.3vw,3px)] text-rice-dim">
                {s.signature}
              </p>
              <p className="ml-[clamp(6px,1.3vw,20px)] pt-2 text-[clamp(10px,1.3vw,13px)] tracking-[clamp(2px,.3vw,3px)] text-rice-dim">
                {cnDate(data.date)}
              </p>

              {/* 桌面端朱印留在文流末尾，贴近底部 */}
              <div className="hidden md:block md:pt-[250px]">
                <Seal text={getDict(locale).register.stamp} brush />
              </div>
            </div>

            {/* 窄屏朱印钤在左下留白处，不占列宽 */}
            <div className="absolute bottom-0 left-0 md:hidden">
              <Seal text={getDict(locale).register.stamp} brush size={64} />
            </div>
          </div>
        ) : (
          /* ── 英文：同框型横排 ── */
          <div className="text-center">
            <div className="font-latin text-xs tracking-[6px] text-rice-dim">
              {s.lead.join("  ·  ")}
            </div>
            <div className="mt-4 font-latin text-[clamp(24px,3.4vw,38px)] font-bold tracking-[7px] text-gold uppercase">
              {s.title}
            </div>
            <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />

            <div className="mx-auto mt-7 max-w-[46ch] space-y-1 font-serif-sc text-[17px] leading-[1.85] text-rice">
              {body.map((line, i) => (
                <p key={i} className={i === 1 ? "py-2 text-[21px] font-semibold text-white" : ""}>
                  {line}
                </p>
              ))}
            </div>

            <p className="mt-6 font-serif-sc text-[15px] tracking-[1px] text-gold-soft">{s.closing}</p>

            <div className="mt-9 flex items-end justify-between gap-6">
              <div className="text-left font-latin text-xs tracking-[3px] text-rice-dim">
                <div>{s.signature}</div>
                <div className="mt-1.5">{data.date.toLocaleDateString("en-GB")}</div>
              </div>
              <Seal text={getDict(locale).register.stamp} brush={false} />
            </div>
          </div>
        )}
      </div>

      {/* 底栏：编号与联系方式属备查信息，不进帖文 */}
      <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-gold/25 px-6 py-3 font-latin text-[11px] tracking-[2px] text-rice-dim/70 md:px-10">
        <span className="text-flame">
          {getDict(locale).register.cardNo} {data.no}
        </span>
        <span>
          {s.phoneLabel} {data.phone}
        </span>
      </div>

      <p className="relative border-t border-gold/15 px-6 py-3 text-[11px] leading-[1.8] text-rice-dim/60 md:px-10">
        {s.footerNote}
      </p>
    </div>
  );
}
