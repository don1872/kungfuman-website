/**
 * KungFuMan 站点数据层
 *
 * 目前为静态常量，对应设计稿逻辑类中的 events / data / eds / media / journey / sessData。
 * 上线时这一层应替换为 CMS / API 拉取（见 README「后续开发清单」第 2 条），
 * 组件只依赖下面这些类型，因此换数据源不需要改 UI。
 */

/* ────────────────────────── 类型 ────────────────────────── */

export type Event = {
  date: string;
  title: string;
  venue: string;
  card: string;
  status: "hot" | "soon";
};

export type Fighter = {
  rank: string;
  name: string;
  alias: string;
  style: string;
  nation: string;
  record: string;
  pts: string;
  photo: string;
};

export type Edition = {
  year: string;
  char: string;
  name: string;
  en: string;
  motto: string;
  live: boolean;
};

export type MediaItem = {
  char: string;
  title: string;
  meta: string;
  src: string;
};

export type JourneyItem = {
  src: string;
  tag: string;
  cap: string;
  span: 1 | 2;
};

export type Session = {
  date: string;
  title: string;
  venue: string;
  priceFrom: string;
  isFinal: boolean;
};

export type Tier = "p" | "a" | "b" | "c";

export type SeatSection = {
  id: string;
  label: string;
  tier: Tier;
  /** 圆形场馆内的百分比坐标（极坐标换算而来） */
  x: number;
  y: number;
  w: number;
  h: number;
  /** 朝向圆心的旋转角 */
  rot: number;
};

/* ──────────────────── 占位图（⚠️ 上线前必须替换） ────────────────────
 * 选手头像与集锦封面暂用 Wikimedia Commons 公开图热链，授权多为 CC-BY / CC-BY-SA。
 * README「Assets」明确要求：商用上线前替换为自有版权素材，或补齐合规署名。
 * ------------------------------------------------------------------ */
const wiki = (name: string, width = 400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=${width}`;

/* ────────────────────────── 倒计时目标 ────────────────────────── */

/** 问鼎首站 · 西安 · 2026-10-24 19:00 (UTC+8) */
export const COUNTDOWN_TARGET = new Date("2026-10-24T19:00:00+08:00").getTime();

/* ────────────────────────── 首页精选赛程 ────────────────────────── */

export const events: Event[] = [
  { date: "10.24", title: "问鼎 · 长安站",   venue: "中国西安 · 奥体中心 XI'AN, CHINA",        card: "主赛 陈山河 vs 白鹤鸣",           status: "hot" },
  { date: "11.21", title: "问鼎 · 不夜城站", venue: "美国拉斯维加斯 · T-MOBILE ARENA",         card: "主赛 石破军 vs J. 科尔特斯",      status: "hot" },
  { date: "12.19", title: "问鼎 · 狮城站",   venue: "新加坡 · 室内体育馆 SINGAPORE",           card: "器械之夜 WEAPONS NIGHT",          status: "soon" },
  { date: "01.30", title: "问鼎 · 终章 THE CROWN", venue: "法国巴黎 · ACCOR ARENA, PARIS",     card: "总决赛 GRAND FINAL",              status: "soon" },
];

/* ────────────────────────── 主赛对阵 ────────────────────────── */

export const mainEvent = {
  meta: "主赛 MAIN EVENT · 综合对抗 84KG",
  flag: "● 长安站压轴",
  red: {
    style: "八极拳 · 中国 CHN",
    name: "陈山河",
    latin: '"IRON MOUNTAIN" CHEN · 14–1',
    photo: wiki("Shaolin Kung Fu In Iran.jpg", 600),
  },
  gold: {
    style: "咏春拳 · 中国香港 HKG",
    name: "白鹤鸣",
    latin: '"WHITE CRANE" PAK · 12–0',
    photo: wiki("ARIEL SOMASCHINI 师傅鳳凰.png", 600),
  },
};

/* ────────────────────────── 天下英雄榜 ────────────────────────── */

export const rankingTabs = ["综合对抗 COMBAT", "拳法套路 FORMS", "器械 WEAPONS"];

const rankingPhotos = [
  ["20241103 Shaolin Martial Art Performance 01.jpg", "20241103 Shaolin Martial Art Performance 02.jpg", "20241103 Shaolin Martial Art Performance 03.jpg", "20241103 Shaolin Martial Art Performance 04.jpg", "Sifu Behrouz Dehnadi.jpg", "Shaolin Tiger Boxing - Shaolin Kuan shifu gustavo MIlazzo.jpg"],
  ["20241103 Shaolin Martial Art Performance 05.jpg", "20241103 Shaolin Martial Art Performance 08.jpg", "Drunken boxing shaolin wushu kwan gustavo milazzo in the big wall Mutyanyu China.jpg", "Eagle Claw Kung Fu Claw Position.jpg", "Jonny Blu Martial Arts Demo - Still Photo 1.png", "1 patti 060121 1Ds 8266.jpg"],
  ["Two Dao - Shaolin wushu.jpg", "Andreas W Friedrich, Keule, 2014.JPG", "Eagle boxing sifu gustavo milazzo inside shaolin temple 2017.jpg", "Taïchi Chuan. Pascal Renault Senseï au Budokaï Dojo.jpg", 'Foto da contra-capa do livro "Tai Chi-Chuan" do Dr. Wu.jpg', "Grandmaster Fu Sheng Yuan, Yong Nian, 2005.JPG"],
];

const rankingRows: Omit<Fighter, "photo">[][] = [
  [
    { rank: "01", name: "白鹤鸣",     alias: "梨花照雪", style: "咏春拳",   nation: "中国香港", record: "12–0", pts: "980" },
    { rank: "02", name: "陈山河",     alias: "铁山",     style: "八极拳",   nation: "中国",     record: "14–1", pts: "955" },
    { rank: "03", name: "石破军",     alias: "崩岳",     style: "形意拳",   nation: "中国",     record: "11–2", pts: "890" },
    { rank: "04", name: "J. 科尔特斯", alias: "斗牛",    style: "洪拳",     nation: "墨西哥",   record: "10–2", pts: "842" },
    { rank: "05", name: "安藤武藏",   alias: "不动",     style: "太极推手", nation: "日本",     record: "9–3",  pts: "801" },
    { rank: "06", name: "K. 奥科耶",  alias: "黑豹",     style: "蔡李佛",   nation: "尼日利亚", record: "9–2",  pts: "788" },
  ],
  [
    { rank: "01", name: "沈青梧",     alias: "穿云手",   style: "通背拳",   nation: "中国",     record: "9.82 均分", pts: "990" },
    { rank: "02", name: "M. 杜兰特",  alias: "西洋鹤",   style: "白鹤拳",   nation: "法国",     record: "9.76 均分", pts: "962" },
    { rank: "03", name: "林小楼",     alias: "燕子",     style: "翻子拳",   nation: "中国",     record: "9.71 均分", pts: "930" },
    { rank: "04", name: "朴正勋",     alias: "劲松",     style: "螳螂拳",   nation: "韩国",     record: "9.65 均分", pts: "901" },
    { rank: "05", name: "A. 佩特洛娃", alias: "雪线",    style: "八卦掌",   nation: "俄罗斯",   record: "9.60 均分", pts: "876" },
    { rank: "06", name: "黄一苇",     alias: "渡江",     style: "长拳",     nation: "中国",     record: "9.55 均分", pts: "850" },
  ],
  [
    { rank: "01", name: "柳残阳",     alias: "枪挑七星", style: "大枪",     nation: "中国",     record: "9.90 均分", pts: "996" },
    { rank: "02", name: "关月娥",     alias: "春秋刀",   style: "大刀",     nation: "中国",     record: "9.80 均分", pts: "958" },
    { rank: "03", name: "D. 惠特克",  alias: "双钩",     style: "虎头钩",   nation: "英国",     record: "9.72 均分", pts: "921" },
    { rank: "04", name: "赵无极",     alias: "剑胆",     style: "太极剑",   nation: "中国",     record: "9.68 均分", pts: "899" },
    { rank: "05", name: "武氏梅",     alias: "棍扫六合", style: "齐眉棍",   nation: "越南",     record: "9.61 均分", pts: "870" },
    { rank: "06", name: "S. 拉赫曼",  alias: "流星",     style: "九节鞭",   nation: "马来西亚", record: "9.54 均分", pts: "845" },
  ],
];

export const rankings: Fighter[][] = rankingRows.map((list, t) =>
  list.map((f, i) => ({ ...f, photo: wiki(rankingPhotos[t][i]) })),
);

/* ────────────────────────── 五届之路 ────────────────────────── */

export const editions: Edition[] = [
  { year: "2026", char: "鼎", name: "问鼎", en: "THE QUEST",             motto: "谁主沉浮",             live: true  },
  { year: "2027", char: "阵", name: "破阵", en: "BREAK THE FORMATION",   motto: "阵前无名，阵破成名",   live: false },
  { year: "2028", char: "锋", name: "争锋", en: "CLASH OF BLADES",       motto: "针尖对麦芒",           live: false },
  { year: "2029", char: "王", name: "封王", en: "CROWNING OF KINGS",     motto: "一派一王，王见王",     live: false },
  { year: "2030", char: "极", name: "登极", en: "ASCENSION",             motto: "会当凌绝顶",           live: false },
];

/* ────────────────────────── 集锦 ────────────────────────── */

export const media: MediaItem[] = [
  { char: "崩", title: "陈山河一记崩拳终结比赛", meta: "02:14 · 问鼎发布会实战", src: wiki("Shaolin Kung Fu.jpg", 800) },
  { char: "枪", title: "柳残阳大枪 9.9 分全场",  meta: "04:02 · 器械资格赛",     src: wiki("10th all china games Gun 931.jpg", 800) },
  { char: "封", title: "白鹤鸣封手连击教学",     meta: "06:30 · 宗师课堂",       src: wiki("Wushu (sport).jpg", 800) },
  { char: "势", title: "十二国宗门入场仪式",     meta: "03:48 · 全球海选",       src: wiki("Shaolin wushu.jpg", 800) },
];

/* ──────────────── 江湖印记（创始人真实照片，可用于上线） ──────────────── */

export const journey: JourneyItem[] = [
  { src: "/assets/founder_141_onset_wide.jpg",      tag: "ON SET",     cap: "片场论武",                span: 2 },
  { src: "/assets/founder_132.png",                 tag: "CINEMA",     cap: "与电影人切磋交流",        span: 1 },
  { src: "/assets/founder_139_onimusha_crew.png",   tag: "2002",       cap: "《鬼武者》CG电影剧组",    span: 1 },
  { src: "/assets/founder_135_kids_class.jpg",      tag: "LEGACY",     cap: "海外传艺 · 少年武学班",   span: 1 },
  { src: "/assets/founder_136_chilife_studio.jpg",  tag: "SINGAPORE",  cap: "创办 Ch'i Life Studio",   span: 1 },
  { src: "/assets/founder_142_with_master.jpg",     tag: "MASTERS",    cap: "与前辈宗师",              span: 1 },
  { src: "/assets/founder_138.png",                 tag: "DIPLOMACY",  cap: "武术文化外交",            span: 1 },
  { src: "/assets/founder_140_beach_taichi.png",    tag: "PRACTICE",   cap: "海上晨功",                span: 1 },
  { src: "/assets/founder_131.png",                 tag: "ENVOY",      cap: "受邀国事文化活动",        span: 1 },
  { src: "/assets/founder_146_lantern_gym.jpg",     tag: "OVERSEAS",   cap: "北美武馆交流",            span: 1 },
  { src: "/assets/founder_145_cage.jpg",            tag: "THE CAGE",   cap: "现代擂台 · 筹建赛事",     span: 1 },
];

/** 关键图片单独导出，供 Hero / 视差插页 / 创始人肖像复用 */
export const photos = {
  heroCage:        "/assets/founder_145_cage.jpg",
  quoteOnSet:      "/assets/founder_141_onset_wide.jpg",
  legacyKidsClass: "/assets/founder_135_kids_class.jpg",
  ctaLanternGym:   "/assets/founder_146_lantern_gym.jpg",
  founderPortrait: "/assets/founder_133_medals_portrait.png",
};

/* ────────────────────────── 购票：13 场次 ────────────────────────── */

export const sessions: Session[] = [
  { date: "01.24", title: "问鼎 · 西安站",        venue: "中国西安 · 奥体中心",              priceFrom: "¥488", isFinal: false },
  { date: "02.21", title: "问鼎 · 曼谷站",        venue: "泰国曼谷 · IMPACT ARENA",          priceFrom: "¥388", isFinal: false },
  { date: "03.21", title: "问鼎 · 新加坡站",      venue: "新加坡 · 室内体育馆",              priceFrom: "¥388", isFinal: false },
  { date: "04.18", title: "问鼎 · 东京站",        venue: "日本东京 · 有明体育馆",            priceFrom: "¥488", isFinal: false },
  { date: "05.23", title: "问鼎 · 悉尼站",        venue: "澳大利亚悉尼 · QUDOS BANK ARENA",  priceFrom: "¥388", isFinal: false },
  { date: "06.20", title: "问鼎 · 迪拜站",        venue: "阿联酋迪拜 · COCA-COLA ARENA",     priceFrom: "¥588", isFinal: false },
  { date: "07.25", title: "问鼎 · 伦敦站",        venue: "英国伦敦 · O2 ARENA",              priceFrom: "¥488", isFinal: false },
  { date: "08.22", title: "问鼎 · 巴黎站",        venue: "法国巴黎 · ACCOR ARENA",           priceFrom: "¥488", isFinal: false },
  { date: "09.19", title: "问鼎 · 纽约站",        venue: "美国纽约 · 麦迪逊广场花园",        priceFrom: "¥588", isFinal: false },
  { date: "10.24", title: "问鼎 · 拉斯维加斯站",  venue: "美国拉斯维加斯 · T-MOBILE ARENA",  priceFrom: "¥588", isFinal: false },
  { date: "11.21", title: "问鼎 · 圣保罗站",      venue: "巴西圣保罗 · GINÁSIO IBIRAPUERA",  priceFrom: "¥388", isFinal: false },
  { date: "12.05", title: "问鼎 · 香港站",        venue: "中国香港 · 红磡体育馆",            priceFrom: "¥488", isFinal: false },
  { date: "12.30", title: "年终总决赛 · 问鼎之夜", venue: "中国澳门 · 威尼斯人金光综艺馆",    priceFrom: "¥888", isFinal: true  },
];

/* ──────────────── 购票：环形场馆座区（极坐标布局） ────────────────
 * 主席台正北固定；A/B/C 三环按 x = 50 + r·sin(a), y = 50 − r·cos(a) 均分，
 * 每块再 rotate(a) 使其朝向圆心。半径：A 环 26 / B 环 37.5 / C 环 46。
 * ------------------------------------------------------------------ */

export const TIER_PRICES: Record<Tier, number> = { p: 8888, a: 1888, b: 888, c: 488 };

function ring(
  tier: Tier,
  count: number,
  radius: number,
  /** 相邻两块之间的夹角 */
  step: number,
  /** 首块相对正北的偏移角 */
  offset: number,
  w: number,
  h: number,
): SeatSection[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = step * i + offset;
    const rad = (Math.PI * angle) / 180;
    const id = tier.toUpperCase() + (i + 1);
    return {
      id,
      label: id,
      tier,
      x: 50 + radius * Math.sin(rad),
      y: 50 - radius * Math.cos(rad),
      w,
      h,
      rot: angle,
    };
  });
}

export const seatSections: SeatSection[] = [
  { id: "P", label: "主席台", tier: "p", x: 50, y: 20, w: 24, h: 8, rot: 0 },
  // A 环：7 块，从 45° 起每 45° 一块（正北 0° 留给主席台）
  ...ring("a", 7, 26, 45, 45, 13, 7),
  // B 环：12 块，每 30° 一块，偏移 15° 错开
  ...ring("b", 12, 37.5, 30, 15, 12.5, 6.5),
  // C 环：16 块，每 22.5° 一块，偏移 11.25° 错开
  ...ring("c", 16, 46, 22.5, 11.25, 9.5, 5.5),
];

/** 座区中文名：主席台 / 内场 A1 / 看台 B3 */
export function seatLabel(s: SeatSection): string {
  if (s.tier === "p") return "主席台";
  return (s.tier === "a" ? "内场 " : "看台 ") + s.id;
}

/* ────────────────────────── 报名通道 ────────────────────────── */

export const REG_CATEGORIES = ["拳法套路", "器械", "全接触对抗"] as const;
export type RegCategory = (typeof REG_CATEGORIES)[number];

/* ────────────────────────── 快讯跑马灯 ────────────────────────── */

export const tickerItems = [
  "快讯 — 巴黎站门票开售 PARIS ON SALE",
  "白鹤鸣宣布卫冕战 PAK ANNOUNCES DEFENSE",
  "器械榜新科榜首：柳残阳 NEW WEAPONS NO.1",
  "全球海选报名开启 OPEN TRYOUTS LIVE",
];
