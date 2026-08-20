export const LOCALES = ["zh", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh";

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/** 另一种语言 —— 供语言切换链接使用 */
export const otherLocale = (l: Locale): Locale => (l === "zh" ? "en" : "zh");

/** 双语字段。地道做法：只有真正随语言变化的内容才用它 */
export type L = { zh: string; en: string };

export const pick = (v: L, l: Locale) => v[l];

/** 由 Accept-Language 猜测首选语言；认不出就回落中文 */
export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag.startsWith("zh")) return "zh";
    if (tag.startsWith("en")) return "en";
  }
  return DEFAULT_LOCALE;
}
