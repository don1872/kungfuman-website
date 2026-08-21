/**
 * KungFuMan 站点数据层
 *
 * 双语策略：只有真正随语言变化的字段用 L = {zh, en}；
 * 选手姓名 / 绰号 / 拳种汉字、日期、比分等保持单一值（见 dict.ts 顶部说明）。
 * 组件调用 getXxx(locale) 拿到的是**已解析的纯字符串**，不需要感知 L。
 *
 * 上线时这一层应替换为 CMS / API（README「后续开发清单」第 2 条）。
 */
import type { L, Locale } from "./locales";

/* ────────────────────────── 类型 ────────────────────────── */

export type Event = { date: string; title: string; venue: string; card: string; status: "hot" | "soon" };
export type Fighter = {
  rank: string; name: string; alias: string; style: string;
  nation: string; record: string; pts: string; photo: string;
};
export type Edition = { year: string; char: string; name: string; en: string; motto: string; live: boolean };
export type MediaItem = { char: string; title: string; meta: string; src: string };
export type Session = { date: string; title: string; venue: string; priceFrom: string; isFinal: boolean };
export type Tier = "p" | "a" | "b" | "c";
export type SeatSection = { id: string; label: string; tier: Tier; x: number; y: number; w: number; h: number; rot: number };

const t = (v: L, l: Locale) => v[l];

/* ──────────────── 占位图（⚠️ 上线前必须替换） ────────────────
 * 选手头像与集锦封面为 Wikimedia Commons 公开图热链，授权多为 CC-BY / CC-BY-SA。
 * 商用上线前必须替换为自有版权素材，或补齐合规署名。
 * ---------------------------------------------------------- */
const wiki = (name: string, width = 400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=${width}`;

/** 问鼎首站 · 西安 · 2026-10-24 19:00 (UTC+8) */
export const COUNTDOWN_TARGET = new Date("2026-10-24T19:00:00+08:00").getTime();

/* ────────────────────────── 首页精选赛程 ────────────────────────── */

const EVENTS: (Omit<Event, "title" | "venue" | "card"> & { title: L; venue: L; card: L })[] = [
  { date: "10.24", status: "hot",
    title: { zh: "问鼎 · 长安站", en: "THE QUEST · XI'AN" },
    venue: { zh: "中国西安 · 奥体中心", en: "Olympic Sports Centre, Xi'an, China" },
    card:  { zh: "主赛 陈山河 vs 白鹤鸣", en: "MAIN CHEN vs PAK" } },
  { date: "11.21", status: "hot",
    title: { zh: "问鼎 · 不夜城站", en: "THE QUEST · LAS VEGAS" },
    venue: { zh: "美国拉斯维加斯 · T-Mobile Arena", en: "T-Mobile Arena, Las Vegas, USA" },
    card:  { zh: "主赛 石破军 vs J. 科尔特斯", en: "MAIN SHI vs CORTÉS" } },
  { date: "12.19", status: "soon",
    title: { zh: "问鼎 · 狮城站", en: "THE QUEST · SINGAPORE" },
    venue: { zh: "新加坡 · 室内体育馆", en: "Singapore Indoor Stadium" },
    card:  { zh: "器械之夜 WEAPONS NIGHT", en: "WEAPONS NIGHT" } },
  { date: "01.30", status: "soon",
    title: { zh: "问鼎 · 终章 THE CROWN", en: "THE QUEST · THE CROWN" },
    venue: { zh: "法国巴黎 · Accor Arena", en: "Accor Arena, Paris, France" },
    card:  { zh: "总决赛 GRAND FINAL", en: "GRAND FINAL" } },
];

export const getEvents = (l: Locale): Event[] =>
  EVENTS.map((e) => ({ ...e, title: t(e.title, l), venue: t(e.venue, l), card: t(e.card, l) }));

/* ────────────────────────── 主赛对阵 ────────────────────────── */

const MAIN_EVENT = {
  red: {
    style: { zh: "八极拳 · 中国 CHN", en: "BAJIQUAN · CHN" },
    name:  { zh: "陈山河", en: "CHEN Shanhe" },
    latin: '"IRON MOUNTAIN" · 14–1',
    photo: wiki("Shaolin Kung Fu In Iran.jpg", 600),
  },
  gold: {
    style: { zh: "咏春拳 · 中国香港 HKG", en: "WING CHUN · HKG" },
    name:  { zh: "白鹤鸣", en: "PAK Hok-ming" },
    latin: '"WHITE CRANE" · 12–0',
    photo: wiki("ARIEL SOMASCHINI 师傅鳳凰.png", 600),
  },
};

export const getMainEvent = (l: Locale) => ({
  red:  { ...MAIN_EVENT.red,  style: t(MAIN_EVENT.red.style, l),  name: t(MAIN_EVENT.red.name, l) },
  gold: { ...MAIN_EVENT.gold, style: t(MAIN_EVENT.gold.style, l), name: t(MAIN_EVENT.gold.name, l) },
});

/* ────────────────────────── 天下英雄榜 ────────────────────────── */

export const getRankingTabs = (l: Locale): string[] =>
  l === "zh"
    ? ["综合对抗 COMBAT", "拳法套路 FORMS", "器械 WEAPONS"]
    : ["FULL CONTACT", "FORMS", "WEAPONS"];

const rankingPhotos = [
  ["20241103 Shaolin Martial Art Performance 01.jpg", "20241103 Shaolin Martial Art Performance 02.jpg", "20241103 Shaolin Martial Art Performance 03.jpg", "20241103 Shaolin Martial Art Performance 04.jpg", "Sifu Behrouz Dehnadi.jpg", "Shaolin Tiger Boxing - Shaolin Kuan shifu gustavo MIlazzo.jpg"],
  ["20241103 Shaolin Martial Art Performance 05.jpg", "20241103 Shaolin Martial Art Performance 08.jpg", "Drunken boxing shaolin wushu kwan gustavo milazzo in the big wall Mutyanyu China.jpg", "Eagle Claw Kung Fu Claw Position.jpg", "Jonny Blu Martial Arts Demo - Still Photo 1.png", "1 patti 060121 1Ds 8266.jpg"],
  ["Two Dao - Shaolin wushu.jpg", "Andreas W Friedrich, Keule, 2014.JPG", "Eagle boxing sifu gustavo milazzo inside shaolin temple 2017.jpg", "Taïchi Chuan. Pascal Renault Senseï au Budokaï Dojo.jpg", 'Foto da contra-capa do livro "Tai Chi-Chuan" do Dr. Wu.jpg', "Grandmaster Fu Sheng Yuan, Yong Nian, 2005.JPG"],
];

type Row = { rank: string; name: L; alias: L; style: string; styleEn: string; nation: L; score: number | string; pts: string };

const AVG: L = { zh: "均分", en: "AVG" };

const RANKING_ROWS: Row[][] = [
  [
    { rank: "01", name: { zh: "白鹤鸣", en: "PAK Hok-ming" },     alias: { zh: "梨花照雪", en: "Snowfall Blossom" }, style: "咏春拳",   styleEn: "WING CHUN",   nation: { zh: "中国香港", en: "Hong Kong" },  score: "12–0", pts: "980" },
    { rank: "02", name: { zh: "陈山河", en: "CHEN Shanhe" },     alias: { zh: "铁山", en: "Iron Mountain" },     style: "八极拳",   styleEn: "BAJIQUAN",    nation: { zh: "中国",     en: "China" },      score: "14–1", pts: "955" },
    { rank: "03", name: { zh: "石破军", en: "SHI Pojun" },     alias: { zh: "崩岳", en: "Crushing Peak" },     style: "形意拳",   styleEn: "XINGYIQUAN",  nation: { zh: "中国",     en: "China" },      score: "11–2", pts: "890" },
    { rank: "04", name: { zh: "J. 科尔特斯", en: "J. Cortés" }, alias: { zh: "斗牛", en: "The Bull" },    style: "洪拳",     styleEn: "HUNG GA",     nation: { zh: "墨西哥",   en: "Mexico" },     score: "10–2", pts: "842" },
    { rank: "05", name: { zh: "安藤武藏", en: "ANDO Musashi" },   alias: { zh: "不动", en: "Immovable" },     style: "太极推手", styleEn: "TAI CHI",     nation: { zh: "日本",     en: "Japan" },      score: "9–3",  pts: "801" },
    { rank: "06", name: { zh: "K. 奥科耶", en: "K. Okoye" },  alias: { zh: "黑豹", en: "Black Panther" },     style: "蔡李佛",   styleEn: "CHOY LI FUT", nation: { zh: "尼日利亚", en: "Nigeria" },    score: "9–2",  pts: "788" },
  ],
  [
    { rank: "01", name: { zh: "沈青梧", en: "SHEN Qingwu" },     alias: { zh: "穿云手", en: "Cloud-Piercing Hands" },   style: "通背拳",   styleEn: "TONGBEIQUAN", nation: { zh: "中国",     en: "China" },      score: 9.82, pts: "990" },
    { rank: "02", name: { zh: "M. 杜兰特", en: "M. Durand" },  alias: { zh: "西洋鹤", en: "Western Crane" },   style: "白鹤拳",   styleEn: "WHITE CRANE", nation: { zh: "法国",     en: "France" },     score: 9.76, pts: "962" },
    { rank: "03", name: { zh: "林小楼", en: "LIN Xiaolou" },     alias: { zh: "燕子", en: "The Swallow" },     style: "翻子拳",   styleEn: "FANZIQUAN",   nation: { zh: "中国",     en: "China" },      score: 9.71, pts: "930" },
    { rank: "04", name: { zh: "朴正勋", en: "PARK Jeong-hun" },     alias: { zh: "劲松", en: "Steadfast Pine" },     style: "螳螂拳",   styleEn: "MANTIS",      nation: { zh: "韩国",     en: "Korea" },      score: 9.65, pts: "901" },
    { rank: "05", name: { zh: "A. 佩特洛娃", en: "A. Petrova" }, alias: { zh: "雪线", en: "Snowline" },    style: "八卦掌",   styleEn: "BAGUAZHANG",  nation: { zh: "俄罗斯",   en: "Russia" },     score: 9.60, pts: "876" },
    { rank: "06", name: { zh: "黄一苇", en: "HUANG Yiwei" },     alias: { zh: "渡江", en: "River Crossing" },     style: "长拳",     styleEn: "CHANGQUAN",   nation: { zh: "中国",     en: "China" },      score: 9.55, pts: "850" },
  ],
  [
    { rank: "01", name: { zh: "柳残阳", en: "LIU Canyang" },     alias: { zh: "枪挑七星", en: "Seven Stars Spear" }, style: "大枪",     styleEn: "SPEAR",       nation: { zh: "中国",     en: "China" },      score: 9.90, pts: "996" },
    { rank: "02", name: { zh: "关月娥", en: "GUAN Yue'e" },     alias: { zh: "春秋刀", en: "Spring-Autumn Blade" },   style: "大刀",     styleEn: "GUANDAO",     nation: { zh: "中国",     en: "China" },      score: 9.80, pts: "958" },
    { rank: "03", name: { zh: "D. 惠特克", en: "D. Whittaker" },  alias: { zh: "双钩", en: "Twin Hooks" },     style: "虎头钩",   styleEn: "TIGER HOOKS", nation: { zh: "英国",     en: "UK" },         score: 9.72, pts: "921" },
    { rank: "04", name: { zh: "赵无极", en: "ZHAO Wuji" },     alias: { zh: "剑胆", en: "Sword Heart" },     style: "太极剑",   styleEn: "TAI CHI SWORD", nation: { zh: "中国",   en: "China" },      score: 9.68, pts: "899" },
    { rank: "05", name: { zh: "武氏梅", en: "VO Thi Mai" },     alias: { zh: "棍扫六合", en: "Staff of Six Harmonies" }, style: "齐眉棍",   styleEn: "STAFF",       nation: { zh: "越南",     en: "Vietnam" },    score: 9.61, pts: "870" },
    { rank: "06", name: { zh: "S. 拉赫曼", en: "S. Rahman" },  alias: { zh: "流星", en: "Meteor" },     style: "九节鞭",   styleEn: "CHAIN WHIP",  nation: { zh: "马来西亚", en: "Malaysia" },   score: 9.54, pts: "845" },
  ],
];

export const getRankings = (l: Locale): Fighter[][] =>
  RANKING_ROWS.map((list, tab) =>
    list.map((f, i) => ({
      rank: f.rank,
      name: t(f.name, l),
      alias: t(f.alias, l),
      style: l === "en" ? f.styleEn : f.style,
      nation: t(f.nation, l),
      record: typeof f.score === "number" ? `${f.score.toFixed(2)} ${t(AVG, l)}` : f.score,
      pts: f.pts,
      photo: wiki(rankingPhotos[tab][i]),
    })),
  );

/* ────────────────────────── 五届之路 ────────────────────────── */

const EDITIONS: (Omit<Edition, "name" | "motto" | "char"> & { char: L; name: L; motto: L })[] = [
  { year: "2026", char: { zh: "鼎", en: "I" }, en: "THE QUEST",           live: true,
    name: { zh: "问鼎", en: "THE QUEST" },   motto: { zh: "谁主沉浮",           en: "Who rules the world" } },
  { year: "2027", char: { zh: "阵", en: "II" }, en: "BREAK THE FORMATION", live: false,
    name: { zh: "破阵", en: "BREAK FORMATION" }, motto: { zh: "阵前无名，阵破成名", en: "Nameless before the line, famous once it breaks" } },
  { year: "2028", char: { zh: "锋", en: "III" }, en: "CLASH OF BLADES",     live: false,
    name: { zh: "争锋", en: "CLASH OF BLADES" },  motto: { zh: "针尖对麦芒",       en: "Needle point against wheat awn" } },
  { year: "2029", char: { zh: "王", en: "IV" }, en: "CROWNING OF KINGS",   live: false,
    name: { zh: "封王", en: "CROWNING" },     motto: { zh: "一派一王，王见王",   en: "One school, one king — then king meets king" } },
  { year: "2030", char: { zh: "极", en: "V" }, en: "ASCENSION",           live: false,
    name: { zh: "登极", en: "ASCENSION" },    motto: { zh: "会当凌绝顶",         en: "To stand at the very summit" } },
];

export const getEditions = (l: Locale): Edition[] =>
  EDITIONS.map((e) => ({ ...e, char: t(e.char, l), name: t(e.name, l), motto: t(e.motto, l) }));

/* ────────────────────────── 集锦 ────────────────────────── */

const MEDIA: (Omit<MediaItem, "title" | "meta" | "char"> & { char: L; title: L; meta: L })[] = [
  { char: { zh: "崩", en: "CRUSH" }, src: wiki("Shaolin Kung Fu.jpg", 800),
    title: { zh: "陈山河一记崩拳终结比赛", en: "CHEN Shanhe ends it with one crushing fist" },
    meta:  { zh: "02:14 · 问鼎发布会实战",  en: "02:14 · Launch showcase bout" } },
  { char: { zh: "枪", en: "SPEAR" }, src: wiki("10th all china games Gun 931.jpg", 800),
    title: { zh: "柳残阳大枪 9.9 分全场",   en: "LIU Canyang takes the spear to 9.9" },
    meta:  { zh: "04:02 · 器械资格赛",      en: "04:02 · Weapons qualifier" } },
  { char: { zh: "封", en: "TRAP" }, src: wiki("Wushu (sport).jpg", 800),
    title: { zh: "白鹤鸣封手连击教学",      en: "PAK Hok-ming breaks down the trapping chain" },
    meta:  { zh: "06:30 · 宗师课堂",        en: "06:30 · Master class" } },
  { char: { zh: "势", en: "FORCE" }, src: wiki("Shaolin wushu.jpg", 800),
    title: { zh: "十二国宗门入场仪式",      en: "Twelve nations enter the arena" },
    meta:  { zh: "03:48 · 全球海选",        en: "03:48 · Global tryouts" } },
];

export const getMedia = (l: Locale): MediaItem[] =>
  MEDIA.map((m) => ({ ...m, char: t(m.char, l), title: t(m.title, l), meta: t(m.meta, l) }));

/* ──────────── 江湖印记（创始人真实照片，可用于上线） ────────────
 * 照片本身是本人提供的真实素材。原设计稿给每张配了说明文字
 *（「片场论武」「海外传艺 · 少年武学班」等），但那些是设计师杜撰的，
 * 未经核实，已全部移除——只保留图片，作为纯视觉的影像墙。
 * 若日后拿到准确说明，可为每张补回 caption。
 * ------------------------------------------------------------ */

export const journeyPhotos: { src: string; span: 1 | 2 }[] = [
  // 两张跨两列的大图并排。10 张图若只有一张跨两列共 11 格，
  // 4 列网格会在右下角空出一格；两张跨两列正好 12 格，三行填满。
  // 主图：2004 年《功夫》上映活动现场，背景横幅可见「周星驰」
  { src: "/assets/founder_132.jpg",                span: 2 },
  { src: "/assets/founder_139_onimusha_crew.jpg",  span: 2 },
  { src: "/assets/founder_135_kids_class.jpg",     span: 1 },
  { src: "/assets/founder_136_chilife_studio.jpg", span: 1 },
  { src: "/assets/founder_142_with_master.jpg",    span: 1 },
  { src: "/assets/founder_138.jpg",                span: 1 },
  { src: "/assets/founder_140_beach_taichi.jpg",   span: 1 },
  { src: "/assets/founder_131.jpg",                span: 1 },
  { src: "/assets/founder_146_lantern_gym.jpg",    span: 1 },
  { src: "/assets/founder_145_cage.jpg",           span: 1 },
];

export const photos = {
  heroCage:        "/assets/founder_145_cage.jpg",
  quoteOnSet:      "/assets/founder_141_onset_wide.jpg",
  legacyKidsClass: "/assets/founder_135_kids_class.jpg",
  ctaLanternGym:   "/assets/founder_146_lantern_gym.jpg",
  founderPortrait: "/assets/founder_133_medals_portrait.jpg",
};

/* ────────────────────────── 购票：13 场次 ────────────────────────── */

const SESSIONS: (Omit<Session, "title" | "venue"> & { title: L; venue: L })[] = [
  { date: "01.24", priceFrom: "$488", isFinal: false, title: { zh: "问鼎 · 西安站",   en: "THE QUEST · XI'AN" },     venue: { zh: "中国西安 · 奥体中心",       en: "Olympic Sports Centre, Xi'an" } },
  { date: "02.21", priceFrom: "$388", isFinal: false, title: { zh: "问鼎 · 曼谷站",   en: "THE QUEST · BANGKOK" },   venue: { zh: "泰国曼谷 · Impact Arena",   en: "Impact Arena, Bangkok" } },
  { date: "03.21", priceFrom: "$388", isFinal: false, title: { zh: "问鼎 · 新加坡站", en: "THE QUEST · SINGAPORE" }, venue: { zh: "新加坡 · 室内体育馆",       en: "Singapore Indoor Stadium" } },
  { date: "04.18", priceFrom: "$488", isFinal: false, title: { zh: "问鼎 · 东京站",   en: "THE QUEST · TOKYO" },     venue: { zh: "日本东京 · 有明体育馆",     en: "Ariake Arena, Tokyo" } },
  { date: "05.23", priceFrom: "$388", isFinal: false, title: { zh: "问鼎 · 悉尼站",   en: "THE QUEST · SYDNEY" },    venue: { zh: "澳大利亚悉尼 · Qudos Bank Arena", en: "Qudos Bank Arena, Sydney" } },
  { date: "06.20", priceFrom: "$588", isFinal: false, title: { zh: "问鼎 · 迪拜站",   en: "THE QUEST · DUBAI" },     venue: { zh: "阿联酋迪拜 · Coca-Cola Arena", en: "Coca-Cola Arena, Dubai" } },
  { date: "07.25", priceFrom: "$488", isFinal: false, title: { zh: "问鼎 · 伦敦站",   en: "THE QUEST · LONDON" },    venue: { zh: "英国伦敦 · O2 Arena",       en: "The O2 Arena, London" } },
  { date: "08.22", priceFrom: "$488", isFinal: false, title: { zh: "问鼎 · 巴黎站",   en: "THE QUEST · PARIS" },     venue: { zh: "法国巴黎 · Accor Arena",    en: "Accor Arena, Paris" } },
  { date: "09.19", priceFrom: "$588", isFinal: false, title: { zh: "问鼎 · 纽约站",   en: "THE QUEST · NEW YORK" },  venue: { zh: "美国纽约 · 麦迪逊广场花园", en: "Madison Square Garden, New York" } },
  { date: "10.24", priceFrom: "$588", isFinal: false, title: { zh: "问鼎 · 拉斯维加斯站", en: "THE QUEST · LAS VEGAS" }, venue: { zh: "美国拉斯维加斯 · T-Mobile Arena", en: "T-Mobile Arena, Las Vegas" } },
  { date: "11.21", priceFrom: "$388", isFinal: false, title: { zh: "问鼎 · 圣保罗站", en: "THE QUEST · SÃO PAULO" }, venue: { zh: "巴西圣保罗 · Ginásio Ibirapuera", en: "Ginásio Ibirapuera, São Paulo" } },
  { date: "12.05", priceFrom: "$488", isFinal: false, title: { zh: "问鼎 · 香港站",   en: "THE QUEST · HONG KONG" }, venue: { zh: "中国香港 · 红磡体育馆",     en: "Hung Hom Coliseum, Hong Kong" } },
  { date: "12.30", priceFrom: "$888", isFinal: true,  title: { zh: "年终总决赛 · 问鼎之夜", en: "GRAND FINAL · NIGHT OF THE QUEST" }, venue: { zh: "中国澳门 · 威尼斯人金光综艺馆", en: "Venetian Cotai Arena, Macau" } },
];

export const getSessions = (l: Locale): Session[] =>
  SESSIONS.map((s) => ({ ...s, title: t(s.title, l), venue: t(s.venue, l) }));

/* ──────────── 购票：环形场馆座区（极坐标布局） ────────────
 * 主席台正北固定；A/B/C 三环按 x = 50 + r·sin(a), y = 50 − r·cos(a) 均分，
 * 每块再 rotate(a) 使其朝向圆心。半径：A 环 26 / B 环 37.5 / C 环 46。
 * -------------------------------------------------------- */

/** 票价（美元）。⚠️ 仍为演示数据，正式售票前须按实际定价调整 */
export const TIER_PRICES: Record<Tier, number> = { p: 8888, a: 1888, b: 888, c: 488 };

function ring(
  tier: Tier, count: number, radius: number,
  /** 相邻两块之间的夹角 */ step: number,
  /** 首块相对正北的偏移角 */ offset: number,
  w: number, h: number,
): SeatSection[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = step * i + offset;
    const rad = (Math.PI * angle) / 180;
    const id = tier.toUpperCase() + (i + 1);
    return { id, label: id, tier, x: 50 + radius * Math.sin(rad), y: 50 - radius * Math.cos(rad), w, h, rot: angle };
  });
}

export const seatSections: SeatSection[] = [
  { id: "P", label: "主席台", tier: "p", x: 50, y: 20, w: 24, h: 8, rot: 0 },
  ...ring("a", 7, 26, 45, 45, 13, 7),
  ...ring("b", 12, 37.5, 30, 15, 12.5, 6.5),
  ...ring("c", 16, 46, 22.5, 11.25, 9.5, 5.5),
];

const TIER_NAME: Record<Tier, L> = {
  p: { zh: "主席台", en: "Chairman's Box" },
  a: { zh: "内场 ",  en: "Floor " },
  b: { zh: "看台 ",  en: "Stand " },
  c: { zh: "看台 ",  en: "Stand " },
};

/** 座区中文名：主席台 / 内场 A1 / 看台 B3 —— 英文：Chairman's Box / Floor A1 / Stand B3 */
export function seatLabel(s: SeatSection, l: Locale): string {
  return s.tier === "p" ? t(TIER_NAME.p, l) : t(TIER_NAME[s.tier], l) + s.id;
}

/** 座位图上主席台方块内的短标签（空间有限） */
export const seatBlockLabel = (s: SeatSection, l: Locale): string =>
  s.tier === "p" ? (l === "zh" ? "主席台" : "BOX") : s.label;

/* ────────────────────────── 报名通道 ────────────────────────── */

export const REG_CATEGORIES: L[] = [
  { zh: "拳法套路",   en: "Forms" },
  { zh: "器械",       en: "Weapons" },
  { zh: "全接触对抗", en: "Full Contact" },
];

export const getRegCategories = (l: Locale): string[] => REG_CATEGORIES.map((c) => t(c, l));

/* ────────────────────────── 快讯跑马灯 ────────────────────────── */

const TICKER: L[] = [
  { zh: "快讯 — 巴黎站门票开售",     en: "NEWS — PARIS TICKETS ON SALE" },
  { zh: "白鹤鸣宣布卫冕战",           en: "PAK HOK-MING ANNOUNCES TITLE DEFENSE" },
  { zh: "器械榜新科榜首：柳残阳",     en: "NEW WEAPONS NO.1 — LIU CANYANG" },
  { zh: "全球海选报名开启",           en: "OPEN TRYOUTS NOW LIVE" },
];

export const getTickerItems = (l: Locale): string[] => TICKER.map((x) => t(x, l));
