"use client";

import { useState } from "react";
import { getRegCategories } from "@/lib/data";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/locales";
import { HeroSummons } from "./HeroSummons";
import { Overlay } from "./Overlay";

type Form = { name: string; alias: string; age: string; nation: string; style: string; phone: string };
const EMPTY: Form = { name: "", alias: "", age: "", nation: "", style: "", phone: "" };

const FIELD_ORDER: (keyof Form)[] = ["name", "alias", "age", "nation", "style", "phone"];
const INPUT_TYPE: Partial<Record<keyof Form, string>> = { age: "number", phone: "tel" };

export function RegisterOverlay({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const d = getDict(locale);
  const rg = d.register;
  const categories = getRegCategories(locale);

  const [form, setForm] = useState<Form>(EMPTY);
  const [category, setCategory] = useState(categories[2]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [regNo, setRegNo] = useState("");

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError(rg.error);
      return;
    }
    // TODO: 生产环境改为 POST 到报名接口，落库后由服务端下发编号
    //       （README 后续开发清单第 4 条：表单入库 + 审核后台 + 报名表 PDF）
    setRegNo("KFM-2026-" + String(Date.now() % 100000).padStart(5, "0"));
    setDone(true);
  };

  return (
    <Overlay title={rg.title} closeLabel={d.overlay.close} seal={d.brand.sealWu} sealVariant="gold" maxWidth="860px" onClose={onClose}>
      {!done ? (
        <div className="border border-gold/30 bg-ink-card p-6 md:px-11 md:py-10">
          <div className={`text-white ${locale === "zh" ? "font-brush text-[34px]" : "font-latin text-[26px] font-semibold tracking-[3px]"}`}>
            {rg.formTitle}
          </div>
          <p className="mt-2 mb-[30px] text-[13px] leading-[1.9] text-rice-dim">{rg.intro}</p>

          <div className="grid grid-cols-1 gap-[18px_20px] md:grid-cols-2">
            {FIELD_ORDER.map((k) => (
              <div key={k}>
                <label htmlFor={`rg-${k}`} className="mb-2 block text-xs tracking-[2px] text-gold">
                  {rg.fields[k]}
                </label>
                <input
                  id={`rg-${k}`}
                  type={INPUT_TYPE[k] ?? "text"}
                  value={form[k]}
                  onChange={set(k)}
                  placeholder={rg.placeholders[k]}
                  className="w-full border border-gold/35 bg-ink px-[14px] py-[13px] font-serif-sc text-sm text-white placeholder:text-rice-dim/50 focus:border-gold focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-2.5 text-xs tracking-[2px] text-gold">{rg.channel}</div>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`cursor-pointer border px-6 py-[11px] font-serif-sc text-sm whitespace-nowrap transition-colors ${
                    category === c
                      ? "border-cinnabar bg-cinnabar text-white"
                      : "border-rice-dim/40 text-rice-dim hover:border-gold hover:text-gold"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div role="alert" className="mt-5 border border-flame/40 bg-cinnabar/10 px-[14px] py-2.5 text-[13px] text-flame">
              {error}
            </div>
          )}

          <button
            onClick={submit}
            className="mt-7 w-full cursor-pointer bg-cinnabar py-4 font-latin text-[15px] font-semibold tracking-[4px] text-white shadow-[0_0_26px_rgba(224,58,32,.4)] transition-colors hover:bg-flame"
          >
            {rg.submit}
          </button>
        </div>
      ) : (
        /* 提交后自动生成英雄帖 */
        <>
          <HeroSummons
            locale={locale}
            data={{
              name: form.name,
              alias: form.alias,
              age: form.age,
              nation: form.nation,
              style: form.style,
              category,
              phone: form.phone,
              no: regNo,
              date: new Date(),
            }}
          />

          <div className="mt-[30px] flex gap-3">
            <button
              onClick={() => setDone(false)}
              className="flex-1 cursor-pointer border border-rice-dim/50 py-[13px] font-latin text-[13px] tracking-[3px] text-rice-dim transition-colors hover:border-gold hover:text-gold"
            >
              {rg.edit}
            </button>
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer bg-gold py-[13px] font-latin text-[13px] font-semibold tracking-[3px] text-ink transition-colors hover:bg-gold-soft"
            >
              {rg.done}
            </button>
          </div>
        </>
      )}
    </Overlay>
  );
}
