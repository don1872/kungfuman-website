import type { Locale } from "./locales";

/**
 * 全站界面文案。
 *
 * 设计约定（见 README「英文版策略」）：
 * - 中文书法巨字（谁主沉浮 / 問鼎 / 鼎阵锋王极 / 擂台 / 武者报名表 / 已受理）在两个语种下
 *   都保留为**视觉符号**，不参与翻译；它们承载品牌的东方身份。
 * - 选手姓名、绰号、拳种保持汉字；英文版给拳种补罗马字注。
 * - 其余全部界面文案、导航、表单、地名随语言切换。
 */

export type Dict = {
  /** 品牌视觉符号。中文版是书法字，英文版是拉丁字母 */
  brand: { seal: string; sealWu: string; watermark: string; watermarkVertical: boolean };
  nav: { events: string; rankings: string; saga: string; founder: string; tickets: string; switchTo: string };
  hero: {
    editionTag: string;
    editionLine: string;
    title: string;
    tagline: string;
    intro: string;
    countdown: [string, string, string, string];
    dateLine: string;
    venueLine: string;
    scroll: string;
  };
  mainEvent: { meta: string; flag: string; vs: string };
  quote: { eyebrow: string; l1: string; l2: string };
  legacy: { eyebrow: string; l1: string; l2: string };
  events: { heading: string; sub: string; hot: string; soon: string };
  rankings: { heading: string; sub: string; pts: string };
  editions: { heading: string; sub: string; intro: string; now: string };
  founder: {
    heading: string; sub: string;
    name: string; alias: string; title: string;
    bio1: string; bio2: string;
    portraitCaption: string;
    stats: [string, string, string];
    journeyBrush: string; journeySub: string; lineageValue: string;
  };
  media: { heading: string; sub: string };
  cta: {
    brush: string; sub: string;
    watchTitle: string; watchBody: string; watchBtn: string;
    applyTitle: string; applyBody: string; applyBtn: string;
  };
  footer: { tagline: string };
  overlay: { close: string };
  ticket: {
    title: string; step1: string; step2: string;
    changeSession: string; from: string; pick: string; pickFinal: string;
    yourSeats: string; emptyHint: string; qty: string; total: string;
    checkout: string; doneTitle: string; doneBody: string;
    ring: string | null; ringSub: string;
    legend: [string, string, string, string];
    notes: [string, string, string];
  };
  register: {
    title: string; formTitle: string; intro: string;
    fields: { name: string; alias: string; age: string; nation: string; style: string; phone: string };
    placeholders: { name: string; alias: string; age: string; nation: string; style: string; phone: string };
    channel: string; error: string; submit: string;
    cardNo: string; stamp: string;
    edit: string; done: string;
    /** 英雄帖 */
    summons: {
      /** 大字帖名（中文竖排书法 / 英文横排大写） */
      title: string;
      /** 帖首：主办与届次 */
      lead: string[];
      /** 正文各句。{name} {alias} {style} {nation} {age} {cat} 由组件替换；
       *  含未填字段的句子会被整句略去，不出现「—」 */
      body: string[];
      /** 结语 */
      closing: string;
      /** 落款 */
      signature: string;
      /** 底栏小字 */
      footerNote: string;
      phoneLabel: string;
    };
  };
};

const zh: Dict = {
  brand: { seal: "功", sealWu: "武", watermark: "問鼎", watermarkVertical: true },
  nav: { events: "赛程 EVENTS", rankings: "英雄榜 RANKINGS", saga: "五届 SAGA", founder: "创始人 FOUNDER", tickets: "购票", switchTo: "EN" },
  hero: {
    editionTag: "EDITION I · 2026",
    editionLine: "第一届 · 问鼎 THE QUEST FOR THE CROWN",
    title: "谁主沉浮",
    tagline: "WHO RULES THE WORLD",
    intro: "全球十二国传统武术宗门，八极、咏春、太极、形意、洪拳诸派同台。拳械套路与全接触对抗双线并行，问鼎天下第一之位。",
    countdown: ["天 DAYS", "时 HRS", "分 MIN", "秒 SEC"],
    dateLine: "OCT 24 2026",
    venueLine: "西安 · 问鼎首站",
    scroll: "SCROLL ↓",
  },
  mainEvent: { meta: "主赛 MAIN EVENT · 综合对抗 84KG", flag: "● 长安站压轴", vs: "对决" },
  quote: { eyebrow: "创始人 · 陈庆彪 RAINBOW CHEN", l1: "功夫不在胜负，", l2: "在敢不敢站上去。" },
  legacy: { eyebrow: "LEGACY · 薪火相传", l1: "下一代功夫人，", l2: "已经站上垫子。" },
  events: { heading: "赛程", sub: "EDITION I · WORLD TOUR", hot: "热售 HOT", soon: "即将开售 SOON" },
  rankings: { heading: "天下英雄榜", sub: "WORLD RANKINGS", pts: "PTS" },
  editions: {
    heading: "五届之路", sub: "THE FIVE-EDITION SAGA",
    intro: "问鼎、破阵、争锋、封王、登极——一个武者从挑战到称王的完整登顶之路。",
    now: "NOW",
  },
  founder: {
    heading: "创始人", sub: "THE FOUNDER",
    name: "陈庆彪", alias: "Rainbow",
    title: "RAINBOW CHEN QINGBIAO · FOUNDER & CHAIRMAN",
    // ⚠️ 占位虚构文案，上线前须以真实履历核定
    bio1: "八极拳第八代传人，习武四十余年。曾率中国武术代表团出访三十余国，深感传统武术缺少一个属于自己的世界级擂台——套路被视作表演，实战被归入他人的规则。",
    bio2: "2025年，他变卖武馆创办功夫人巅峰赛，立下五届之约：以问鼎起，以登极终，让全世界在同一座擂台上，重新认识中国功夫。",
    portraitCaption: "2004 · 首届世界传统武术节 双金",
    stats: ["年习武 YEARS", "国出访 NATIONS", "第八代传人 LINEAGE"],
    journeyBrush: "江湖印记", journeySub: "THE JOURNEY", lineageValue: "八极",
  },
  media: { heading: "集锦", sub: "HIGHLIGHTS" },
  cta: {
    brush: "上擂台，见真章", sub: "YOUR MOMENT. YOUR LEGACY.",
    watchTitle: "现场观赛",
    watchBody: "西安 · 拉斯维加斯 · 新加坡 · 巴黎，现场见证问鼎之战。",
    watchBtn: "立即购票 BUY NOW",
    applyTitle: "武者报名",
    applyBody: "全球海选，套路、器械、对抗三条通道，英雄不问出处。",
    applyBtn: "报名参赛 APPLY",
  },
  footer: { tagline: "功夫人巅峰赛 · 第一届 问鼎 · 谁主沉浮" },
  overlay: { close: "关闭 CLOSE" },
  ticket: {
    title: "购票 TICKETS", step1: "① 选场次 SESSION", step2: "② 选座位 SEATS",
    changeSession: "← 换场次", from: "起", pick: "选场次 →", pickFinal: "总决赛 →",
    yourSeats: "已选座区 YOUR SEATS",
    emptyHint: "点击左侧环形座位图\n选择座位区域",
    qty: "数量 QTY", total: "合计 TOTAL", checkout: "确认购买 CHECKOUT",
    doneTitle: "出票成功", doneBody: "电子票已发送至你的账户 · 现场凭码入场",
    ring: "擂台", ringSub: "THE RING",
    legend: ["主席台 ¥8888", "内场 A ¥1888", "看台 B ¥888", "看台 C ¥488"],
    notes: [
      "主席台含贵宾通道、赛后见面会资格",
      "内场 A 为擂台四周首排至五排",
      "每单限购 8 张，演示界面暂不接入真实支付",
    ],
  },
  register: {
    title: "武者报名 FIGHTER TRYOUTS", formTitle: "报名信息",
    intro: "全球海选面向所有门派开放，英雄不问出处。提交后自动生成报名表，组委会 7 个工作日内联系初审。",
    fields: { name: "姓名 *", alias: "绰号（选填）", age: "年龄", nation: "国籍 / 地区", style: "门派 / 拳种", phone: "联系电话 *" },
    placeholders: { name: "真实姓名", alias: "如：铁山", age: "18–45", nation: "如：中国", style: "如：八极拳、咏春、太极", phone: "手机或 WhatsApp" },
    channel: "报名通道", error: "请至少填写姓名和联系电话", submit: "提交报名 SUBMIT",
    cardNo: "NO.", stamp: "已受理",
    edit: "← 修改信息", done: "完成 DONE",
    summons: {
      title: "英雄帖",
      lead: ["功夫人巅峰赛", "第一届 · 问鼎"],
      body: [
        "广邀天下英雄，不问出处",
        "兹有 {name} {alias}",
        "{style} 门下，{nation} 籍",
        "年 {age}",
        "应 {cat} 之选",
      ],
      closing: "帖到即验，候召赴会",
      signature: "功夫人巅峰赛组委会",
      footerNote: "本帖由系统自动生成，组委会初审通过后将以电话通知海选时间与地点。",
      phoneLabel: "联系电话",
    },
  },
};

const en: Dict = {
  // 英文版无汉字：方章用 KF 字母组合，水印用横排描边大字
  brand: { seal: "KF", sealWu: "KF", watermark: "THE QUEST", watermarkVertical: false },
  nav: { events: "EVENTS", rankings: "RANKINGS", saga: "THE SAGA", founder: "FOUNDER", tickets: "TICKETS", switchTo: "中文" },
  hero: {
    editionTag: "EDITION I · 2026",
    editionLine: "THE QUEST FOR THE CROWN",
    title: "WHO RULES THE WORLD",
    tagline: "TWELVE NATIONS · ONE CROWN",
    intro:
      "Twelve nations. The great traditional schools — Baji, Wing Chun, Tai Chi, Xingyi, Hung Ga — on one stage. Forms and full-contact combat, two roads to one crown.",
    countdown: ["DAYS", "HRS", "MIN", "SEC"],
    dateLine: "OCT 24 2026",
    venueLine: "Xi'an · Opening Night",
    scroll: "SCROLL ↓",
  },
  mainEvent: { meta: "MAIN EVENT · FULL CONTACT 84KG", flag: "● XI'AN HEADLINER", vs: "VS" },
  quote: { eyebrow: "FOUNDER · RAINBOW CHEN", l1: "Kung fu is not about winning.", l2: "It's about daring to step up." },
  legacy: { eyebrow: "LEGACY", l1: "The next generation of kung fu,", l2: "already on the mat." },
  events: { heading: "SCHEDULE", sub: "EDITION I · WORLD TOUR", hot: "ON SALE", soon: "COMING SOON" },
  rankings: { heading: "WORLD RANKINGS", sub: "EDITION I", pts: "PTS" },
  editions: {
    heading: "THE FIVE-EDITION SAGA", sub: "2026 — 2030",
    intro:
      "The Quest, Break the Formation, Clash of Blades, Crowning of Kings, Ascension — five editions tracing one warrior's full road from challenger to king.",
    now: "NOW",
  },
  founder: {
    heading: "THE FOUNDER", sub: "RAINBOW CHEN",
    name: "Rainbow Chen", alias: "Qingbiao",
    title: "FOUNDER & CHAIRMAN · 8TH-GENERATION BAJIQUAN",
    // ⚠️ Placeholder biography — verify against the real record before launch.
    bio1:
      "Eighth-generation lineage holder of Bajiquan with over forty years of practice. He led Chinese wushu delegations to more than thirty countries — and saw that traditional kung fu had no world-class ring of its own: forms dismissed as performance, combat folded into other people's rules.",
    bio2:
      "In 2025 he sold his school to found KungFuMan, with a five-edition vow: begin with the Quest, end with Ascension — and let the world meet Chinese kung fu on one stage.",
    portraitCaption: "2004 · Double gold, 1st World Traditional Wushu Festival",
    stats: ["YEARS OF PRACTICE", "NATIONS VISITED", "GENERATION"],
    journeyBrush: "THE JOURNEY", journeySub: "1994 — 2026", lineageValue: "8TH",
  },
  media: { heading: "HIGHLIGHTS", sub: "EDITION I" },
  cta: {
    brush: "STEP INTO THE RING", sub: "YOUR MOMENT. YOUR LEGACY.",
    watchTitle: "WATCH LIVE",
    watchBody: "Xi'an · Las Vegas · Singapore · Paris and beyond — witness the Quest live.",
    watchBtn: "BUY NOW",
    applyTitle: "FIGHTER TRYOUTS",
    applyBody: "Global tryouts open to every school. Forms, weapons, full-contact — heroes rise from anywhere.",
    applyBtn: "APPLY",
  },
  footer: { tagline: "KUNGFUMAN · EDITION I THE QUEST · WHO RULES THE WORLD" },
  overlay: { close: "CLOSE" },
  ticket: {
    title: "TICKETS", step1: "① SESSION", step2: "② SEATS",
    changeSession: "← CHANGE SESSION", from: "from", pick: "SELECT →", pickFinal: "GRAND FINAL →",
    yourSeats: "YOUR SEATS",
    emptyHint: "Tap a section on the seat map\nto choose your seats",
    qty: "QTY", total: "TOTAL", checkout: "CHECKOUT",
    doneTitle: "CONFIRMED", doneBody: "E-tickets sent to your account · scan at the gate",
    ring: null, ringSub: "THE RING",
    legend: ["Chairman's Box ¥8888", "Floor A ¥1888", "Stand B ¥888", "Stand C ¥488"],
    notes: [
      "Chairman's Box includes VIP entrance and post-event meet & greet",
      "Floor A covers rows 1–5 around the ring",
      "Limit 8 per order · demo interface, no live payment",
    ],
  },
  register: {
    title: "FIGHTER TRYOUTS", formTitle: "YOUR DETAILS",
    intro:
      "Global tryouts are open to every school. Submit and your entry form is generated instantly; the committee will contact you within 7 working days.",
    fields: { name: "Name *", alias: "Ring name (optional)", age: "Age", nation: "Nationality / Region", style: "School / Style", phone: "Phone *" },
    placeholders: { name: "Your legal name", alias: "e.g. Iron Mountain", age: "18–45", nation: "e.g. Singapore", style: "e.g. Bajiquan, Wing Chun", phone: "Mobile or WhatsApp" },
    channel: "ENTRY CATEGORY", error: "Please provide at least your name and phone number", submit: "SUBMIT",
    cardNo: "NO.", stamp: "RECEIVED",
    edit: "← EDIT", done: "DONE",
    summons: {
      title: "THE HERO'S SUMMONS",
      lead: ["KUNGFUMAN", "EDITION I · THE QUEST"],
      body: [
        "The world is called to the ring, and no one is asked where they came from.",
        "Let it be known that {name} {alias}",
        "of the {style} school, of {nation},",
        "aged {age},",
        "answers the call on the road of {cat}.",
      ],
      closing: "Present this summons when the call comes.",
      signature: "THE KUNGFUMAN COMMITTEE",
      footerNote: "Automatically generated. Once the committee clears your entry, you will be called with tryout time and location.",
      phoneLabel: "Phone",
    },
  },
};

export const DICT: Record<Locale, Dict> = { zh, en };
export const getDict = (locale: Locale) => DICT[locale];
