/**
 * 隐私政策与服务条款 —— 模板文本。
 *
 * ⚠️ 这是模板，不是法律意见。正式对外收集个人信息（报名、购票）之前，
 * 必须由律师按实际业务与适用法域审定。以下几处尤其需要确认：
 *
 *   1. 数据保留期限 —— 现写「不超过实现目的所必需的期限」，需给出具体年限
 *   2. 第三方处理者 —— 支付网关、CMS、邮件服务商确定后须逐一列明
 *   3. 适用法律 —— 现按法人注册地华盛顿州；若主要面向中国用户，
 *      可能同时受《个人信息保护法》约束，跨境传输另有要求
 *   4. 儿童条款 —— 报名年龄段若含未成年人，须补监护人同意流程
 *   5. 退改签规则 —— 购票条款中现为占位，须与实际售票政策一致
 *
 * 正文中的 [待定] 标记即为需要补充具体内容的位置。
 */
import type { L, Locale } from "./locales";

export type Section = { heading: L; body: L[] };
export type LegalDoc = { title: L; updated: L; intro: L; sections: Section[] };

const t = (v: L, l: Locale) => v[l];

export const PRIVACY: LegalDoc = {
  title: { zh: "隐私政策", en: "Privacy Policy" },
  updated: { zh: "最后更新：2026 年 8 月 21 日", en: "Last updated: 21 August 2026" },
  intro: {
    zh: "KUNG FU MAN CORP.（以下称「我们」）运营本网站。本政策说明我们如何收集、使用与保护你的个人信息。使用本网站即表示你已阅读并理解本政策。",
    en: "KUNG FU MAN CORP. (\"we\") operates this website. This policy explains how we collect, use and protect your personal information. By using this site you confirm that you have read and understood it.",
  },
  sections: [
    {
      heading: { zh: "我们收集哪些信息", en: "What we collect" },
      body: [
        { zh: "武者报名：姓名、绰号、年龄、国籍或地区、门派拳种、联系电话，以及你选择的报名通道。其中姓名与电话为必填，其余为选填。", en: "Fighter tryouts: name, ring name, age, nationality or region, school or style, phone number, and your chosen entry category. Name and phone are required; the rest are optional." },
        { zh: "购票：所选场次、座区、数量与订单信息。[待定：接入支付后，须列明支付服务商所收集的信息，我们本身不存储完整银行卡号]", en: "Ticketing: the session, seating area, quantity and order details you select. [TBD: once payment is integrated, list what the payment provider collects; we do not store full card numbers ourselves]" },
        { zh: "自动收集：访问日志、浏览器类型、语言偏好、页面停留等技术信息，用于保障服务运行与改进体验。", en: "Automatically collected: access logs, browser type, language preference and page interaction data, used to keep the service running and to improve it." },
      ],
    },
    {
      heading: { zh: "我们如何使用这些信息", en: "How we use it" },
      body: [
        { zh: "处理你的报名与购票，包括资格初审、通知海选时间与地点、出具电子票。", en: "To process your entry or ticket purchase, including eligibility review, notifying you of tryout time and location, and issuing e-tickets." },
        { zh: "就赛事安排、变更或取消与你联系。", en: "To contact you about event arrangements, changes or cancellations." },
        { zh: "维护网站安全、防范滥用与欺诈。", en: "To maintain site security and prevent abuse or fraud." },
        { zh: "我们不会将你的个人信息出售给第三方。", en: "We do not sell your personal information to third parties." },
      ],
    },
    {
      heading: { zh: "Cookie 与同类技术", en: "Cookies and similar technologies" },
      body: [
        { zh: "本网站使用必要的 Cookie 维持语言偏好与基本功能。[待定：如后续接入分析或广告类 Cookie，须在此列明并提供选择退出方式]", en: "This site uses essential cookies to remember your language preference and keep basic functions working. [TBD: if analytics or advertising cookies are added later, list them here and provide an opt-out]" },
      ],
    },
    {
      heading: { zh: "第三方服务", en: "Third-party services" },
      body: [
        { zh: "网站托管于 Vercel，其服务器日志会记录访问信息。字体由 Google Fonts 提供，加载时你的浏览器会向其发起请求。", en: "The site is hosted on Vercel, whose server logs record access information. Fonts are served by Google Fonts, which your browser requests directly." },
        { zh: "[待定：支付网关、内容管理系统、邮件服务商确定后，须在此逐一列明其名称、用途与所在地]", en: "[TBD: once the payment gateway, CMS and email provider are chosen, list each by name, purpose and location]" },
      ],
    },
    {
      heading: { zh: "信息保存与安全", en: "Retention and security" },
      body: [
        { zh: "我们仅在实现上述目的所必需的期限内保存你的个人信息。[待定：须给出具体保存年限，例如报名信息自赛事结束起保存 N 年]", en: "We keep your personal information only as long as necessary for the purposes above. [TBD: specify a concrete retention period, e.g. entry data kept for N years after the event]" },
        { zh: "我们采取合理的技术与管理措施保护信息安全，但任何互联网传输都无法保证绝对安全。", en: "We apply reasonable technical and organisational safeguards, though no transmission over the internet can be guaranteed absolutely secure." },
      ],
    },
    {
      heading: { zh: "你的权利", en: "Your rights" },
      body: [
        { zh: "你可以要求查阅、更正或删除我们所持有的你的个人信息，也可以撤回此前给出的同意。", en: "You may request access to, correction of, or deletion of the personal information we hold about you, and you may withdraw consent previously given." },
        { zh: "如需行使上述权利，请通过本页末尾的联系方式与我们联系。", en: "To exercise these rights, contact us using the details at the end of this page." },
      ],
    },
    {
      heading: { zh: "未成年人", en: "Minors" },
      body: [
        { zh: "[待定：报名年龄段若包含未成年人，须在此说明监护人同意的取得方式与验证流程]", en: "[TBD: if entrants may be minors, describe how guardian consent is obtained and verified]" },
      ],
    },
    {
      heading: { zh: "跨境传输", en: "International transfers" },
      body: [
        { zh: "我们的服务器与服务商可能位于你所在国家或地区之外。使用本网站即表示你理解信息可能被传输至其他法域并在当地处理。[待定：若面向中国大陆用户收集信息，跨境传输另有合规要求]", en: "Our servers and service providers may be located outside your country or region. By using this site you understand that information may be transferred to and processed in other jurisdictions. [TBD: transfers involving users in mainland China carry additional requirements]" },
      ],
    },
    {
      heading: { zh: "政策更新", en: "Changes to this policy" },
      body: [
        { zh: "我们可能不时更新本政策，更新后的版本将在本页发布并标注更新日期。", en: "We may update this policy from time to time. The updated version will be posted on this page with a revised date." },
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: { zh: "服务条款", en: "Terms of Service" },
  updated: { zh: "最后更新：2026 年 8 月 21 日", en: "Last updated: 21 August 2026" },
  intro: {
    zh: "本条款是你与 KUNG FU MAN CORP. 之间就使用本网站及相关服务达成的协议。访问或使用本网站即表示你接受本条款。",
    en: "These terms form an agreement between you and KUNG FU MAN CORP. regarding your use of this website and related services. By accessing or using the site you accept them.",
  },
  sections: [
    {
      heading: { zh: "服务说明", en: "The service" },
      body: [
        { zh: "本网站提供功夫侠国际武术巅峰赛的赛事信息、购票与武者报名功能。", en: "This site provides information about the KUNGFUMAN International Wushu Championship, together with ticketing and fighter registration." },
        { zh: "网站上的赛程、选手、榜单等内容可能随赛事安排调整，我们保留随时修改的权利。", en: "Schedules, fighters, rankings and similar content may change as the event develops, and we reserve the right to update them at any time." },
      ],
    },
    {
      heading: { zh: "购票", en: "Tickets" },
      body: [
        { zh: "购票即视为接受入场规则与场馆规定。电子票不得转售牟利。", en: "Purchasing a ticket constitutes acceptance of the admission rules and venue regulations. E-tickets may not be resold for profit." },
        { zh: "[待定：退改签规则须与实际售票政策一致，包括是否可退、手续费、赛事取消或延期时的处理方式]", en: "[TBD: refund and exchange rules must match the actual ticketing policy, including whether refunds are available, any fees, and what happens if the event is cancelled or postponed]" },
      ],
    },
    {
      heading: { zh: "武者报名", en: "Fighter tryouts" },
      body: [
        { zh: "提交报名不构成参赛资格。组委会将进行初审，并保留是否接受报名的最终决定权。", en: "Submitting an entry does not confer the right to compete. The committee reviews all entries and retains final discretion over acceptance." },
        { zh: "你须保证所提交信息真实、准确、完整。信息不实可能导致资格取消。", en: "You must ensure the information you submit is true, accurate and complete. Inaccurate information may result in disqualification." },
        { zh: "[待定：须补充参赛的健康与保险要求、责任免除书签署流程]", en: "[TBD: add health and insurance requirements for competing, and the waiver signing process]" },
      ],
    },
    {
      heading: { zh: "知识产权", en: "Intellectual property" },
      body: [
        { zh: "本网站的标识、名称、文字、图片、视频与设计均归 KUNG FU MAN CORP. 或相应权利人所有，未经书面许可不得复制、传播或用于商业用途。", en: "The marks, names, text, images, video and design on this site belong to KUNG FU MAN CORP. or the respective rights holders, and may not be copied, distributed or used commercially without written permission." },
      ],
    },
    {
      heading: { zh: "用户行为", en: "Acceptable use" },
      body: [
        { zh: "不得利用本网站从事违法活动、干扰服务运行、爬取或批量抓取数据、冒充他人身份。", en: "You may not use this site for unlawful purposes, interfere with its operation, scrape or bulk-harvest data, or impersonate others." },
      ],
    },
    {
      heading: { zh: "免责与责任限制", en: "Disclaimers and limitation of liability" },
      body: [
        { zh: "本网站按「现状」提供。我们尽力保证信息准确，但不对内容的完整性、时效性作出保证。", en: "The site is provided \"as is\". We aim for accuracy but make no warranty as to completeness or timeliness." },
        { zh: "在适用法律允许的最大范围内，我们不对因使用或无法使用本网站而产生的间接、附带或后果性损失承担责任。", en: "To the fullest extent permitted by law, we are not liable for indirect, incidental or consequential losses arising from use of, or inability to use, this site." },
      ],
    },
    {
      heading: { zh: "适用法律", en: "Governing law" },
      body: [
        { zh: "本条款受美国华盛顿州法律管辖。[待定：若主要用户位于中国大陆，须由律师确认管辖与争议解决安排]", en: "These terms are governed by the laws of the State of Washington, USA. [TBD: if most users are in mainland China, have counsel confirm jurisdiction and dispute resolution]" },
      ],
    },
    {
      heading: { zh: "条款变更", en: "Changes to these terms" },
      body: [
        { zh: "我们可能不时修订本条款，修订后的版本将在本页发布。继续使用本网站即视为接受修订。", en: "We may revise these terms from time to time; the revised version will be posted on this page. Continued use of the site constitutes acceptance." },
      ],
    },
  ],
};

export type ResolvedDoc = {
  title: string; updated: string; intro: string;
  sections: { heading: string; body: string[] }[];
};

export const resolveDoc = (doc: LegalDoc, l: Locale): ResolvedDoc => ({
  title: t(doc.title, l),
  updated: t(doc.updated, l),
  intro: t(doc.intro, l),
  sections: doc.sections.map((sec) => ({
    heading: t(sec.heading, l),
    body: sec.body.map((b) => t(b, l)),
  })),
});
