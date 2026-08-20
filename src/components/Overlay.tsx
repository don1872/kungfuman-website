"use client";

import { useEffect, type ReactNode } from "react";
import { Mark, Seal } from "./Logo";

/** 全屏覆盖层外壳：锁背景滚动、Esc 关闭、统一头部 */
export function Overlay({
  title,
  closeLabel,
  seal,
  sealVariant = "solid",
  brandMark = false,
  maxWidth,
  onClose,
  children,
}: {
  title: string;
  closeLabel: string;
  seal: string;
  sealVariant?: "solid" | "gold";
  /** true 时头部用官方徽章，而非手做方章 */
  brandMark?: boolean;
  maxWidth: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-100 overflow-auto bg-[rgba(14,8,5,.97)] backdrop-blur-lg"
    >
      <div className="mx-auto px-[18px] pt-[22px] pb-14 md:px-11 md:pt-[30px] md:pb-[70px]" style={{ maxWidth }}>
        <div className="mb-[30px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-[14px]">
            {brandMark ? <Mark size={44} /> : <Seal size={38} char={seal} variant={sealVariant} />}
            <div className="font-latin text-lg font-bold tracking-[3px] text-white">{title}</div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer border border-rice-dim/50 px-5 py-2.5 font-latin text-[13px] tracking-[2px] whitespace-nowrap text-rice-dim transition-colors hover:border-flame hover:text-flame"
          >
            ✕ {closeLabel}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
