import Image from "next/image";
import type { Locale } from "@/lib/locales";

/**
 * 官方 logo 是一整套徽章式锁定（人物 + 红圆 + KUNGFUMAN + 中英副标）。
 * 缩到导航的 60px 高时里面四行小字会糊成一团，所以拆两个用法：
 *   - 小尺寸（导航、二级页头部）用裁出的圆形徽章 + 旁边live 文字
 *   - 大尺寸（页脚）用完整锁定，尺寸足够时所有信息都清晰
 * 素材黑底不透明且无法抠图（图案的黑描边与外部背景是连通的同一片黑），
 * 混合模式也不可行——固定定位的导航栏自成层叠上下文，blend 够不到后面的照片。
 * 因此给徽章加一道金色细边，做成有意为之的徽章框，与站内卡片、英雄帖的金线语言一致。
 */

/**
 * 品牌徽章。
 *
 * 用完整锁定图，不做裁切。原图是竖式构图——徽章在上、KUNGFUMAN 字样在下，
 * 而人物的腿本来就伸进文字带，所以任何「只裁圆形徽章」的做法都会把人物拦腰切断。
 * 改为整图缩放：小尺寸下内部小字不可辨，但那由旁边的 live 文字承担；
 * 徽章本身保持完整，不出现残肢。
 */
export function Mark({ className = "h-12" }: { className?: string }) {
  return (
    <Image
      src="/assets/logo.jpg"
      alt="KUNGFUMAN"
      width={460}
      height={450}
      priority
      // 高度只用 class 控制。内联 style 优先级高于 md: 断点类，
      // 写成 style={{height}} 会让响应式尺寸失效。
      className={`w-auto flex-none border border-gold/40 ${className}`}
    />
  );
}

/** 完整锁定，大尺寸用（页脚） */
export function LogoFull({ size = 140 }: { size?: number }) {
  return (
    <Image
      src="/assets/logo.jpg"
      alt="KUNGFUMAN 功夫侠国际武术巅峰赛"
      width={460}
      height={450}
      className="w-auto flex-none border border-gold/40"
      style={{ height: size }}
    />
  );
}

/**
 * 装饰性方章（创始人肖像角标、报名覆盖层）—— 不是品牌 logo，保留手做样式。
 */
export function Seal({
  size = 44,
  char,
  variant = "solid",
}: {
  size?: number;
  char: string;
  variant?: "solid" | "gold" | "outline";
}) {
  const styles = {
    solid:   "border-cinnabar bg-cinnabar/85 text-white shadow-[0_0_24px_rgba(224,58,32,.5)]",
    gold:    "border-gold bg-gold text-ink",
    outline: "border-cinnabar text-flame",
  }[variant];

  const isLatin = /^[\x00-\x7F]+$/.test(char);

  return (
    <div
      className={`flex flex-none items-center justify-center border-2 ${
        isLatin ? "font-latin font-bold tracking-[1px]" : "font-brush"
      } ${styles}`}
      style={{ width: size, height: size, fontSize: size * (isLatin ? 0.4 : 0.59) }}
      aria-hidden
    >
      {char}
    </div>
  );
}

/**
 * 品牌锁定：徽章 + KUNGFUMAN + 副行。
 *
 * 窄屏只留徽章：副标「功夫侠国际武术巅峰赛」在 390px 下会折行并压到
 * 语言切换按钮上。徽章本身即品牌标识，放不下时不硬塞文字。
 */
export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-center gap-3">
      <Mark className="h-12 md:h-[60px]" />
      <div className="hidden md:block">
        <div className="font-latin text-xl leading-none font-bold tracking-[4px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.6)]">
          KUNGFUMAN
        </div>
        <div className="mt-[3px] text-[11px] tracking-[4px] text-gold">
          {locale === "zh" ? "功夫侠国际武术巅峰赛" : "INTERNATIONAL WUSHU CHAMPIONSHIP"}
        </div>
      </div>
    </div>
  );
}
