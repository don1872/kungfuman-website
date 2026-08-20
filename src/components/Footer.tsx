import { Seal } from "./Logo";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 border-t border-gold/22 p-11">
      <div className="flex items-center gap-3">
        <Seal size={34} variant="outline" />
        <div className="font-latin text-sm tracking-[3px] text-rice">
          KUNGFUMAN <span className="text-rice-dim">© 2026</span>
        </div>
      </div>
      <div className="text-xs tracking-[2px] text-rice-dim">
        功夫人巅峰赛 · 第一届 问鼎 · 谁主沉浮
      </div>
    </footer>
  );
}
