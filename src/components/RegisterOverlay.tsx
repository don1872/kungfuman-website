"use client";

import { useState } from "react";
import { REG_CATEGORIES, type RegCategory } from "@/lib/data";
import { Overlay } from "./Overlay";

type Form = {
  name: string;
  alias: string;
  age: string;
  nation: string;
  style: string;
  phone: string;
};

const EMPTY: Form = { name: "", alias: "", age: "", nation: "", style: "", phone: "" };

const FIELDS: { key: keyof Form; label: string; placeholder: string; type?: string }[] = [
  { key: "name",   label: "姓名 *",        placeholder: "真实姓名" },
  { key: "alias",  label: "绰号（选填）",   placeholder: "如：铁山" },
  { key: "age",    label: "年龄",          placeholder: "18–45", type: "number" },
  { key: "nation", label: "国籍 / 地区",   placeholder: "如：中国" },
  { key: "style",  label: "门派 / 拳种",   placeholder: "如：八极拳、咏春、太极" },
  { key: "phone",  label: "联系电话 *",    placeholder: "手机或 WhatsApp", type: "tel" },
];

export function RegisterOverlay({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [category, setCategory] = useState<RegCategory>("全接触对抗");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [regNo, setRegNo] = useState("");

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("请至少填写姓名和联系电话");
      return;
    }
    // TODO: 生产环境改为 POST 到报名接口，落库后由服务端下发编号
    //       （README 后续开发清单第 4 条：表单入库 + 审核后台 + 报名表 PDF）
    setRegNo("KFM-2026-" + String(Date.now() % 100000).padStart(5, "0"));
    setDone(true);
  };

  const rows: [string, string, boolean?][] = [
    ["姓 名", form.name],
    ["绰 号", form.alias || "—"],
    ["年 龄", form.age || "—"],
    ["国籍 / 地区", form.nation || "—"],
    ["门派 / 拳种", form.style || "—"],
    ["联系电话", form.phone],
    ["报名通道", category, true],
    ["提交日期", new Date().toLocaleDateString("zh-CN")],
  ];

  return (
    <Overlay title="武者报名 FIGHTER TRYOUTS" seal="武" sealVariant="gold" maxWidth="860px" onClose={onClose}>
      {!done ? (
        <div className="border border-gold/30 bg-ink-card p-6 md:px-11 md:py-10">
          <div className="font-brush text-[34px] text-white">报名信息</div>
          <p className="mt-2 mb-[30px] text-[13px] leading-[1.9] text-rice-dim">
            全球海选面向所有门派开放，英雄不问出处。提交后自动生成报名表，组委会 7
            个工作日内联系初审。
          </p>

          <div className="grid grid-cols-1 gap-[18px_20px] md:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label
                  htmlFor={`rg-${f.key}`}
                  className="mb-2 block text-xs tracking-[2px] text-gold"
                >
                  {f.label}
                </label>
                <input
                  id={`rg-${f.key}`}
                  type={f.type ?? "text"}
                  value={form[f.key]}
                  onChange={set(f.key)}
                  placeholder={f.placeholder}
                  className="w-full border border-gold/35 bg-ink px-[14px] py-[13px] font-serif-sc text-sm text-white placeholder:text-rice-dim/50 focus:border-gold focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-2.5 text-xs tracking-[2px] text-gold">报名通道</div>
            <div className="flex flex-wrap gap-2.5">
              {REG_CATEGORIES.map((c) => (
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
            <div
              role="alert"
              className="mt-5 border border-flame/40 bg-cinnabar/10 px-[14px] py-2.5 text-[13px] text-flame"
            >
              {error}
            </div>
          )}

          <button
            onClick={submit}
            className="mt-7 w-full cursor-pointer bg-cinnabar py-4 font-latin text-[15px] font-semibold tracking-[4px] text-white shadow-[0_0_26px_rgba(224,58,32,.4)] transition-colors hover:bg-flame"
          >
            提交报名 SUBMIT
          </button>
        </div>
      ) : (
        /* 自动生成的武者报名表 */
        <div className="relative overflow-hidden border-2 border-gold bg-[linear-gradient(180deg,#241108,#1a0e09)] p-6 md:px-12 md:py-11">
          <div className="stroke-char absolute -top-[30px] -right-5 font-brush text-[200px] [-webkit-text-stroke-color:rgba(224,170,78,.18)]">
            武
          </div>

          <div className="mb-[26px] border-b border-gold/30 pb-[22px] text-center">
            <div className="font-latin text-xs tracking-[6px] text-gold">
              KUNGFUMAN · 功夫人巅峰赛
            </div>
            <div className="mt-2 font-brush text-[42px] text-white">武者报名表</div>
            <div className="mt-1.5 font-latin text-[13px] tracking-[3px] text-flame">
              NO. {regNo}
            </div>
          </div>

          <div className="relative grid grid-cols-1 gap-[16px_40px] md:grid-cols-2">
            {rows.map(([label, value, accent]) => (
              <div
                key={label}
                className="flex justify-between border-b border-dashed border-rice-dim/35 pb-2.5"
              >
                <span className="text-[13px] text-rice-dim">{label}</span>
                <span className={`font-semibold ${accent ? "text-flame" : "text-white"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-[34px] flex items-center justify-between gap-4">
            <div className="text-xs leading-[1.9] text-rice-dim/75">
              本表由系统自动生成，组委会初审通过后
              <br />
              将以电话方式通知海选时间与地点。
            </div>
            <div className="flex h-[92px] w-[92px] flex-none -rotate-12 flex-col items-center justify-center rounded-full border-[3px] border-cinnabar text-flame">
              <div className="font-brush text-[26px] leading-[1.1]">已受理</div>
              <div className="font-latin text-[8px] tracking-[2px]">KUNGFUMAN</div>
            </div>
          </div>

          <div className="mt-[30px] flex gap-3">
            <button
              onClick={() => setDone(false)}
              className="flex-1 cursor-pointer border border-rice-dim/50 py-[13px] font-latin text-[13px] tracking-[3px] text-rice-dim transition-colors hover:border-gold hover:text-gold"
            >
              ← 修改信息
            </button>
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer bg-gold py-[13px] font-latin text-[13px] font-semibold tracking-[3px] text-ink transition-colors hover:bg-gold-soft"
            >
              完成 DONE
            </button>
          </div>
        </div>
      )}
    </Overlay>
  );
}
