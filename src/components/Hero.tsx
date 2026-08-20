import Image from "next/image";
import { photos } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { Countdown } from "./Countdown";

/** 上升火星：位置 / 尺寸 / 时长 / 延迟均按设计稿固定 */
const EMBERS = [
  { left: "18%", size: 5, color: "#ffb15e", glow: "#ff7a3c", dur: "9s",  delay: "0s"   },
  { left: "46%", size: 4, color: "#ffc98a", glow: "#ff7a3c", dur: "12s", delay: "3s"   },
  { left: "72%", size: 6, color: "#ff9a4e", glow: "#ff5a3c", dur: "10s", delay: "6s"   },
  { left: "88%", size: 4, color: "#ffd9a8", glow: "#ff7a3c", dur: "14s", delay: "1.5s" },
];

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const d = dict.hero;
  const brand = dict.brand;

  return (
    <section className="relative h-screen min-h-[720px] overflow-hidden">
      <Image
        src={photos.heroCage}
        alt={locale === "zh" ? "功夫侠国际武术巅峰赛擂台" : "The KungFuMan ring"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_38%] [filter:saturate(1.1)_contrast(1.08)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_45%,rgba(20,11,8,.25)_0%,rgba(20,11,8,.78)_62%,#140b08_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,11,8,.55)_0%,transparent_30%,transparent_55%,#140b08_100%)]" />

      {EMBERS.map((e, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute -bottom-2.5 rounded-full"
          style={{
            left: e.left, width: e.size, height: e.size, background: e.color,
            boxShadow: `0 0 ${e.size * 2}px ${e.glow}`,
            animation: `emberUp ${e.dur} ${e.delay} linear infinite`,
          }}
        />
      ))}

      {/*
        右缘巨型描边水印。中英共用 writing-mode: vertical-rl —— 汉字逐字竖排，
        拉丁字母会自动整体旋转 90° 顺排（像书脊），无需手算 transform。
        有意与标题叠加，属设计层次（README：「勿"修复"」）。
      */}
      <div
        className={`stroke-char absolute top-1/2 right-[5%] -translate-y-1/2 leading-[.92] whitespace-nowrap [writing-mode:vertical-rl] [-webkit-text-stroke-width:1.5px] [text-shadow:0_0_60px_rgba(224,58,32,.25)] ${
          brand.watermarkVertical ? "font-brush" : "font-latin font-bold tracking-[6px]"
        }`}
        style={{ fontSize: brand.watermarkVertical ? "clamp(220px,28vw,460px)" : "clamp(56px,7vw,120px)" }}
        aria-hidden
      >
        {brand.watermark}
      </div>

      <div className="relative z-2 mx-auto flex h-full max-w-[1240px] flex-col justify-end px-5 pb-[7vh] md:px-11 md:pb-[10vh]">
        <div className="mb-[26px] flex flex-wrap items-center gap-4">
          <span className="font-latin bg-gold px-[15px] py-[7px] text-[13px] font-semibold tracking-[4px] whitespace-nowrap text-ink">
            {d.editionTag}
          </span>
          <span className="text-sm tracking-[5px] whitespace-nowrap text-gold [text-shadow:0_1px_8px_rgba(0,0,0,.7)]">
            {d.editionLine}
          </span>
        </div>

        {/* 主标题：中文书法 / 英文 Oswald 窄体大写 */}
        <h1
          className={`text-white [text-shadow:0_6px_40px_rgba(0,0,0,.75),0_0_90px_rgba(224,58,32,.45)] ${
            locale === "zh"
              ? "font-brush text-[clamp(72px,10vw,160px)] leading-none"
              : "font-latin text-[clamp(44px,7.2vw,116px)] leading-[1.02] font-bold tracking-[2px] uppercase"
          }`}
        >
          {d.title}
        </h1>
        <div className="mt-3 font-latin text-[clamp(18px,2.4vw,30px)] font-semibold tracking-[14px] text-flame [text-shadow:0_2px_16px_rgba(0,0,0,.8)]">
          {d.tagline}
        </div>

        <div className="mt-11 flex flex-wrap items-end justify-between gap-7">
          <p className="max-w-[480px] text-[15px] leading-[2] text-rice/85 [text-shadow:0_1px_8px_rgba(0,0,0,.7)]">
            {d.intro}
          </p>
          <Countdown labels={d.countdown} dateLine={d.dateLine} venueLine={d.venueLine} />
        </div>
      </div>

      <div className="absolute bottom-[22px] left-1/2 z-2 -translate-x-1/2 animate-float-y font-latin text-[11px] tracking-[5px] text-rice/60">
        {d.scroll}
      </div>
    </section>
  );
}
