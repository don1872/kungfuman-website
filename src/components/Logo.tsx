import type { Locale } from "@/lib/locales";

/** 红底「功」方章 —— 导航、二级页头部、页脚共用。汉字作为品牌标识，两语种保留 */
export function Seal({
  size = 44,
  char = "功",
  variant = "solid",
}: {
  size?: number;
  char?: string;
  variant?: "solid" | "gold" | "outline";
}) {
  const styles = {
    solid:   "border-cinnabar bg-cinnabar/85 text-white shadow-[0_0_24px_rgba(224,58,32,.5)]",
    gold:    "border-gold bg-gold text-ink",
    outline: "border-cinnabar text-flame",
  }[variant];

  return (
    <div
      className={`flex flex-none items-center justify-center border-2 font-brush ${styles}`}
      style={{ width: size, height: size, fontSize: size * 0.59 }}
      aria-hidden
    >
      {char}
    </div>
  );
}

/** 完整品牌锁定：方章 + KUNGFUMAN + 副行 */
export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-center gap-[14px]">
      <Seal />
      <div>
        <div className="font-latin text-xl leading-none font-bold tracking-[4px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.6)]">
          KUNGFUMAN
        </div>
        <div className="mt-[3px] text-[11px] tracking-[6px] text-gold">
          {locale === "zh" ? "功夫人巅峰赛" : "WORLD KUNG FU"}
        </div>
      </div>
    </div>
  );
}
