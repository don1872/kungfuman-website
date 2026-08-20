/**
 * 创始人陈庆彪履历
 *
 * 全部内容来自本人提供的简历（陈庆彪简历.pptx），未作任何推测或补充。
 * 此前站上的创始人文案是设计交付稿里的虚构占位（「八极拳第八代传人」
 * 「2025年变卖武馆」等），已全部替换。
 *
 * 有意略去的一项：简历第 14 页末尾提到 2016 年股东经营纠纷并点名了两位
 * 第三方个人。公开网站上发布对具名个人的负面陈述不合适，故不收录。
 */
import type { L, Locale } from "./locales";

export type Era = { key: string; label: L };

export type Milestone = {
  /** 年份或年份区间，直接展示 */
  year: string;
  era: string;
  title: L;
  /** 补充说明，可省略 */
  detail?: L;
  /** 配图路径，可省略 */
  photo?: string;
  /** 图片说明 */
  alt?: L;
};

export const ERAS: Era[] = [
  { key: "origin",  label: { zh: "起点",      en: "ORIGINS" } },
  { key: "screen",  label: { zh: "影视",      en: "SCREEN" } },
  { key: "arena",   label: { zh: "竞技",      en: "COMPETITION" } },
  { key: "create",  label: { zh: "创作与传承", en: "CREATION & LEGACY" } },
];

const M: Milestone[] = [
  {
    year: "1970", era: "origin",
    title: { zh: "生于山东武术世家", en: "Born into a martial arts family in Shandong" },
    detail: {
      zh: "六岁起随祖父与父亲习武，兼修武术、散打与太极。后毕业于安徽宿州体育学院、新加坡中华总商会管理学院。",
      en: "He began training with his grandfather and father at six, studying wushu, sanda and tai chi. Later a graduate of Suzhou Institute of Physical Education and SCCCI Institute of Business.",
    },
    photo: "/founder/1970-childhood.jpg",
    alt: { zh: "陈庆彪童年照", en: "Chen Qingbiao as a child" },
  },
  {
    year: "1992", era: "screen",
    title: { zh: "郑州 · 新加坡电视台功夫演员大赛", en: "Zhengzhou · MediaCorp Singapore kung fu talent search" },
    detail: {
      zh: "近千名参赛者中脱颖而出，获选前四名，受邀赴新加坡签约为电视台艺人。",
      en: "Handpicked from nearly a thousand entrants as one of the final four, and signed by MediaCorp Singapore.",
    },
    photo: "/founder/1992-selection.jpg",
    alt: { zh: "1992 年入选的四位功夫演员", en: "The four selected kung fu performers, 1992" },
  },
  {
    year: "1995 — 1996", era: "screen",
    title: { zh: "新加坡 · 电视剧与广告演出", en: "Singapore · television drama and commercials" },
  },
  {
    year: "1996", era: "screen",
    title: { zh: "《陆小凤》武术指导", en: "Fight choreographer, Lu Xiaofeng" },
    detail: { zh: "林志颖主演。", en: "Starring Jimmy Lin." },
    photo: "/founder/1996-luxiaofeng.jpg",
    alt: { zh: "《陆小凤》剧照", en: "On the set of Lu Xiaofeng" },
  },
  {
    year: "1998", era: "screen",
    title: { zh: "《笑傲江湖》武术指导", en: "Fight choreographer, The Smiling, Proud Wanderer" },
    detail: { zh: "范文芳主演。", en: "Starring Fann Wong." },
    photo: "/founder/1998-xiaoao.jpg",
    alt: { zh: "《笑傲江湖》剧照", en: "On the set of The Smiling, Proud Wanderer" },
  },
  {
    year: "1999", era: "screen",
    title: { zh: "纽西兰 ·《新阿郎的故事》", en: "New Zealand · A Story of Ah Long" },
    detail: { zh: "与袁咏仪、万梓良合作拍摄。", en: "Filmed with Anita Yuen and Alex Man." },
    photo: "/founder/1999-xinalang.jpg",
    alt: { zh: "与袁咏仪在拍摄现场", en: "With Anita Yuen on location" },
  },
  {
    year: "2000", era: "screen",
    title: { zh: "电影《公元2000》", en: "Film · 2000 AD" },
    detail: { zh: "与郭富城合作。", en: "With Aaron Kwok." },
    photo: "/founder/2000-gongyuan.jpg",
    alt: { zh: "与郭富城在片场", en: "With Aaron Kwok on set" },
  },
  {
    year: "2002", era: "screen",
    title: { zh: "日本 ·《鬼武者》", en: "Japan · Onimusha" },
    detail: { zh: "与甄子丹合作拍摄。", en: "Filmed with Donnie Yen." },
    photo: "/founder/2002-onimusha.jpg",
    alt: { zh: "《鬼武者》剧组合影", en: "The Onimusha production team" },
  },
  {
    year: "2002", era: "arena",
    title: { zh: "新加坡 · 开班授徒", en: "Singapore · teaching" },
    detail: {
      zh: "教导来自世界各地的学员功夫、散打与太极拳。",
      en: "Teaching kung fu, sanda and tai chi to students from around the world.",
    },
    photo: "/founder/kick.jpg",
    alt: { zh: "腾空踢击", en: "Flying kick" },
  },
  {
    year: "2003", era: "arena",
    title: { zh: "新加坡散打冠军 · 65 公斤级", en: "Singapore Sanda Champion · 65 kg" },
  },
  {
    year: "2004", era: "arena",
    title: { zh: "新加坡武术锦标赛 象形拳冠军", en: "Singapore Wushu Championship · Xiangxingquan gold" },
  },
  {
    year: "2004", era: "arena",
    title: { zh: "郑州 · 世界首届传统武术节 双金", en: "Zhengzhou · Double gold, First World Traditional Wushu Festival" },
    detail: {
      zh: "62 个参赛国家、2000 余名选手角逐，代表新加坡夺得地躺拳与象形拳双项冠军。",
      en: "Gold in both Ditangquan and Xiangxingquan, against 2,000+ competitors from 62 countries.",
    },
    photo: "/assets/founder_133_medals_portrait.jpg",
    alt: { zh: "2004 年获双金牌", en: "With both gold medals, 2004" },
  },
  {
    year: "2004", era: "arena",
    title: { zh: "美国西雅图 · 国际功夫大赛自由搏击冠军", en: "Seattle · Gold, US International Kung Fu Championship" },
    detail: { zh: "65 公斤级（145–155 磅）自由搏击冠军。", en: "Free sparring, 145–155 pound weight class." },
    photo: "/founder/2004-seattle.jpg",
    alt: { zh: "美国传统中国武术总会颁奖", en: "United States Traditional Kung Fu Wushu Federation" },
  },
  {
    year: "2004", era: "arena",
    title: { zh: "新加坡 · 功夫偶像大赛双冠", en: "Singapore · Kung Fu Idol, double champion" },
    detail: {
      zh: "哥伦比亚电影公司于周星驰《功夫》上映之际举办，获最佳功夫与最佳表演双项冠军。",
      en: "Held by Columbia Pictures for the Singapore launch of Stephen Chow's Kung Fu Hustle. Won Best Kung Fu and Best Performance.",
    },
    photo: "/founder/2004-kungfuidol.jpg",
    alt: { zh: "功夫偶像大赛现场", en: "At the Kung Fu Idol competition" },
  },
  {
    year: "2006", era: "create",
    title: { zh: "世界首部功夫音乐剧《黄飞鸿》", en: "The world's first kung fu musical · A Kung Fu Tale" },
    detail: {
      zh: "自编自导自演，于新加坡滨海艺术中心首演。时任新加坡总统纳丹先生出席首演之夜，李连杰的师父吴彬担任武术顾问。",
      en: "He wrote, directed and starred in it. It premiered at Singapore's Esplanade Theatre, with President S. R. Nathan at opening night. Wu Bin — Jet Li's own master — was martial arts consultant.",
    },
    photo: "/founder/2006-musical.jpg",
    alt: { zh: "《黄飞鸿》音乐剧海报", en: "A Kung Fu Tale poster" },
  },
  {
    year: "2008 — 2015", era: "create",
    title: { zh: "北京 ·《功夫宝贝 KUNG FU KIDS》", en: "Beijing · KUNG FU KIDS" },
    detail: {
      zh: "于蓝色港湾创立，至 2015 年发展至 9 家直营店，成为北京规模最大的功夫教育机构。",
      en: "Founded at Solana and grown to nine schools by 2015 — Beijing's largest kung fu academy.",
    },
    photo: "/founder/2008-kungfukids.jpg",
    alt: { zh: "《功夫宝贝》海报", en: "KUNG FU KIDS poster" },
  },
];

const t = (v: L, l: Locale) => v[l];

export type ResolvedMilestone = {
  year: string; era: string; title: string;
  detail?: string; photo?: string; alt?: string;
};

export const getMilestones = (l: Locale): ResolvedMilestone[] =>
  M.map((m) => ({
    year: m.year,
    era: m.era,
    title: t(m.title, l),
    detail: m.detail ? t(m.detail, l) : undefined,
    photo: m.photo,
    alt: m.alt ? t(m.alt, l) : undefined,
  }));

export const getEras = (l: Locale) => ERAS.map((e) => ({ key: e.key, label: t(e.label, l) }));
