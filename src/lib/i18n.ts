/**
 * 中英文案
 *
 * 设计特征：只切换 8 处叙事文案，标题类（谁主沉浮 / WHO RULES THE WORLD、
 * 赛程 EVENTS 等）中英并置，不参与切换。
 *
 * ⚠️ 当前为客户端切换。若需要 SEO 收录英文版，应改为 /zh /en 路由分发
 * （README「后续开发清单」第 6 条）。
 */

export type Lang = "zh" | "en";

export type Copy = {
  heroP: string;
  quoteL1: string;
  quoteL2: string;
  legacyL1: string;
  legacyL2: string;
  sagaP: string;
  bio1: string;
  bio2: string;
  cta1: string;
  cta2: string;
  /** 切换按钮上显示的目标语言 */
  langLabel: string;
};

export const COPY: Record<Lang, Copy> = {
  zh: {
    heroP:
      "全球十二国传统武术宗门，八极、咏春、太极、形意、洪拳诸派同台。拳械套路与全接触对抗双线并行，问鼎天下第一之位。",
    quoteL1: "功夫不在胜负，",
    quoteL2: "在敢不敢站上去。",
    legacyL1: "下一代功夫人，",
    legacyL2: "已经站上垫子。",
    sagaP: "问鼎、破阵、争锋、封王、登极——一个武者从挑战到称王的完整登顶之路。",
    // ⚠️ 占位虚构文案。README 明确要求上线前以陈庆彪先生真实履历核定。
    bio1:
      "八极拳第八代传人，习武四十余年。曾率中国武术代表团出访三十余国，深感传统武术缺少一个属于自己的世界级擂台——套路被视作表演，实战被归入他人的规则。",
    bio2:
      "2025年，他变卖武馆创办功夫人巅峰赛，立下五届之约：以问鼎起，以登极终，让全世界在同一座擂台上，重新认识中国功夫。",
    cta1: "西安 · 拉斯维加斯 · 新加坡 · 巴黎，现场见证问鼎之战。",
    cta2: "全球海选，套路、器械、对抗三条通道，英雄不问出处。",
    langLabel: "EN",
  },
  en: {
    heroP:
      "Twelve nations. The great traditional schools — Baji, Wing Chun, Tai Chi, Xingyi, Hung Ga — on one stage. Forms and full-contact combat, two roads to one crown.",
    quoteL1: "Kung fu is not about winning.",
    quoteL2: "It's about daring to step up.",
    legacyL1: "The next generation of kung fu,",
    legacyL2: "already on the mat.",
    sagaP:
      "Wending, Pozhen, Zhengfeng, Fengwang, Dengji — five editions, one warrior's complete road from challenger to king.",
    // ⚠️ Placeholder biography — must be verified against the real record before launch.
    bio1:
      "Eighth-generation lineage holder of Bajiquan with over forty years of practice. He led Chinese wushu delegations to more than thirty countries — and saw that traditional kung fu had no world-class ring of its own: forms dismissed as performance, combat folded into other people's rules.",
    bio2:
      "In 2025 he sold his school to found KungFuMan, with a five-edition vow: begin with the Quest, end with Ascension — and let the world meet Chinese kung fu on one stage.",
    cta1: "Xi'an · Las Vegas · Singapore · Paris and beyond — witness the Quest live.",
    cta2: "Global tryouts open to every school. Forms, weapons, full-contact — heroes rise from anywhere.",
    langLabel: "中文",
  },
};
