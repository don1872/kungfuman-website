import type { ReactNode } from "react";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";

/**
 * 「敬请期待」遮罩 —— 包住一个尚未定稿的板块。
 *
 * 板块内容照常渲染并轻微虚化，标语清晰压在上层：几乎不糊是刻意的——
 * 内容看得清才让人看出「东西已经有了，只是还没到时候」，糊重了等于白做。
 * 代价是白字失去了暗层打底，所以对比度改由标语背后那层径向柔光单独负责。
 *
 * 虚化用遮罩层的 backdrop-filter，而不是给内容加 filter: blur()。
 * filter 会把元素连同自身背景一起糊出盒子外，擂台那种整幅背景图的板块
 * 上下缘会晕到相邻板块上；backdrop-filter 精确裁在遮罩盒内，接缝干净。
 *
 * 内容层加 inert：既挡掉点击与 Tab 聚焦（擂台里那颗购票按钮也随之失效），
 * 也把这段从读屏的朗读序列里摘出去 —— 糊掉的演示数据被逐条念出来只会误导。
 *
 * 这几个板块普遍高过一屏，标语用 sticky 吊在视口正中，滚到板块哪个位置都看得见；
 * 板块不足一屏时 max-h-full 把它压回板块高度，不会越到下一块去。
 *
 * 说明文字的宽度用 px 而非 ch：ch 是拉丁数字「0」的宽度，约半个汉字，
 * 34ch 只有 220px，中文那句会被挤成两行且断在词中间。
 */
export function ComingSoon({ locale, children }: { locale: Locale; children: ReactNode }) {
  const d = getDict(locale).comingSoon;

  return (
    <div className="relative isolate">
      <div inert className="pointer-events-none select-none">
        {children}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-ink/12 backdrop-blur-[2px] backdrop-saturate-[.92]">
        <div className="sticky top-0 flex h-screen max-h-full items-center justify-center px-6">
          <div className="relative text-center">
            {/* 板块放清晰之后，白字压在擂台照那种亮背景上会糊；这层柔光只罩标语附近，
                边缘渐隐到全透明，不会在板块中间留出一块看得见的方形暗斑 */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-1 h-[420px] w-[820px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,11,8,.78)_0%,rgba(20,11,8,.55)_38%,rgba(20,11,8,.22)_62%,transparent_78%)]" />
            <div className="font-latin text-[11px] tracking-[7px] text-gold [text-shadow:0_1px_10px_rgba(0,0,0,.9)] md:text-xs md:tracking-[9px]">
              {d.eyebrow}
            </div>

            <div
              className={`mt-5 text-white [text-shadow:0_0_60px_rgba(224,170,78,.3),0_4px_34px_rgba(0,0,0,.95)] ${
                locale === "zh"
                  ? "font-brush text-[clamp(52px,8vw,112px)] leading-[1.15] tracking-[6px]"
                  : "font-latin text-[clamp(34px,5.4vw,76px)] leading-[1.1] font-bold tracking-[6px] uppercase"
              }`}
            >
              {d.title}
            </div>

            <div className="mx-auto mt-7 h-px w-[120px] bg-[linear-gradient(90deg,transparent,rgba(224,170,78,.85),transparent)]" />

            <p className="mx-auto mt-6 max-w-[440px] text-[13px] leading-[2] text-rice/75 [text-shadow:0_1px_10px_rgba(0,0,0,.9)]">
              {d.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
