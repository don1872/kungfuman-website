import type { ReactNode } from "react";

/**
 * 沉浸视差插页。背景用 background-attachment: fixed（移动端由 .fx-bg 降级为 scroll），
 * 单侧暗渐变压出书法金句的可读区。
 */
export function Parallax({
  image,
  position = "50% 30%",
  align,
  eyebrow,
  children,
  height,
  minHeight,
  saturate = 1.1,
}: {
  image: string;
  position?: string;
  align: "left" | "right";
  eyebrow: string;
  children: ReactNode;
  height: string;
  minHeight: string;
  saturate?: number;
}) {
  const gradient =
    align === "left"
      ? "linear-gradient(90deg,rgba(20,11,8,.92) 0%,rgba(20,11,8,.55) 45%,rgba(20,11,8,.25) 100%)"
      : "linear-gradient(90deg,rgba(20,11,8,.25) 0%,rgba(20,11,8,.55) 55%,rgba(20,11,8,.92) 100%)";

  return (
    <section className="relative overflow-hidden" style={{ height, minHeight }}>
      <div
        className="fx-bg"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundPosition: position,
          filter: `saturate(${saturate})`,
        }}
      />
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div
        className={`relative z-2 mx-auto flex h-full max-w-[1240px] flex-col justify-center px-5 md:px-11 ${
          align === "right" ? "items-end text-right" : ""
        }`}
      >
        <div className="mb-4 font-latin text-xs tracking-[5px] text-gold">{eyebrow}</div>
        <div className="max-w-[720px] font-brush text-[clamp(34px,4.4vw,60px)] leading-[1.5] text-white [text-shadow:0_4px_30px_rgba(0,0,0,.7)]">
          {children}
        </div>
      </div>
    </section>
  );
}
