# 功夫侠国际武术巅峰赛 KUNGFUMAN · 官网

第一届「问鼎」赛事官网。由 [Claude Design 交付包](../Desktop/功夫侠网站资料/design_handoff_kungfuman_website/)
的高保真设计稿在 Next.js 中重新实现。

## 技术栈

- **Next.js 16**（App Router，Turbopack）
- **React 19** + TypeScript
- **Tailwind CSS v4** —— 设计 token 定义在 `src/app/globals.css` 的 `@theme` 块
- 字体：Ma Shan Zheng（书法）/ Noto Serif SC（中文正文）/ Oswald（拉丁数字），经 Google Fonts 引入

## 开发

```bash
npm run dev     # http://localhost:3000
npm run build   # 生产构建
npm run lint
```

## 目录结构

```
src/
├─ proxy.ts           裸路径按 Accept-Language 重定向到 /zh 或 /en
├─ app/
│  ├─ globals.css     设计 token（@theme）、keyframes、响应式组件类
│  ├─ layout.tsx      根壳
│  └─ [locale]/
│     ├─ layout.tsx   <html lang>、字体引入、按语种的 SEO metadata + hreflang
│     └─ page.tsx     语种校验 → SiteShell
├─ components/
│  ├─ SiteShell.tsx   页面组装 + 两个覆盖层的开关状态
│  └─ ...             每个板块一个组件，统一接收 locale
└─ lib/
   ├─ locales.ts      Locale 类型、语言检测、双语字段 L
   ├─ dict.ts         全站界面文案（zh / en）
   ├─ data.ts         赛程、榜单、五届、集锦、影像墙、13 场次、座区几何（双语）
   ├─ founder.ts      创始人履历 16 条（源自本人简历，见文件顶部编辑准则）
   └─ legal.ts        隐私政策与服务条款模板（含 10 处 [待定]）
```

线上地址 `https://kungfum.com`，托管于 Vercel，`main` 分支推送后自动部署。

## 中英双语

两套独立路由，各自静态预渲染：

| 路由 | 说明 |
|---|---|
| `/zh` | 中文版 |
| `/en` | 英文版 |
| `/` | `src/proxy.ts` 按 `Accept-Language` 302 到对应语种，认不出回落 `/zh` |

SEO：每个语种有独立 `<html lang>`、`<title>`、`description`、canonical，
并互相声明 `hreflang`（`zh-CN` / `en` / `x-default`）与 `og:locale:alternate`。
语言切换是真实 `<Link>`，搜索引擎能顺着抓到另一语种。

### 英文版策略

英文版**不含汉字**（唯一例外是语言切换按钮上的「中文」——切换控件按惯例用目标语言书写）。
设计稿的视觉骨架是中文书法，因此英文版需要一套等效的拉丁替身：

| 中文版 | 英文版 |
|---|---|
| 书法主标题「谁主沉浮」 | `WHO RULES THE WORLD`（Oswald 窄体大写） |
| 竖排书法水印「問鼎」 | `THE QUEST`，同样竖排（拉丁字母在 `writing-mode: vertical-rl` 下整体旋转 90°，像书脊） |
| 章节书法标题（赛程 / 天下英雄榜 / 五届之路 / 创始人 / 集锦 / 江湖印记） | 对应英文词，Oswald 粗体 + 大字距 |
| 五届书法单字 鼎阵锋王极 | 罗马数字 `I II III IV V` |
| 集锦描边大字 崩枪封势 | `CRUSH / SPEAR / TRAP / FORCE` |
| 红底「功」方章、金底「武」方章 | `KF` 字母组合，同样的方章造型 |
| 对决菱形章 | `VS` |
| 「擂台 THE RING」 | 只留 `THE RING` |
| 「武者报名表」「已受理」印章 | `FIGHTER ENTRY FORM`、`RECEIVED` |
| 选手姓名、绰号、拳种 | 罗马字：`PAK Hok-ming`、`"Snowfall Blossom"`、`WING CHUN` |
| 直角引号「」 | 弯引号 `""` |

**新增文案时注意** —— `Ma Shan Zheng` 没有拉丁字形：

- `--font-brush` 的兜底已收紧为 `Noto Serif SC`（而非通用 `cursive`，那会在 Windows 上落到 Comic Sans）
- 但英文内容仍应显式选字，不要依赖兜底。组件里的模式是
  `locale === "zh" ? "font-brush ..." : "font-latin ..."`
- 英文字串比中文长，几处需要额外让位：五届届名预留两行高度、榜单绰号独占一行、
  集锦描边大字压小字号。改文案时留意别把这些撑破。

## 已实现

- 首页全部板块：导航、Hero（倒计时 / 火星 / 竖排水印）、快讯跑马灯、主赛对阵、
  视差插页 ×3、赛程、天下英雄榜（三 tab）、五届之路、创始人 + 江湖印记照片墙、集锦、收尾 CTA、页脚
- 购票二级页：13 场次 → 环形选座（极坐标，主席台 / A / B / C 四档共 36 区）→ 数量步进（1–8）→ 合计 → 出票
- 武者报名二级页：表单校验 → 自动生成**英雄帖**
  - 中文版为传统帖式：竖排右起、双金框、四角回纹、朱印钤于落款之后，
    年龄与日期用汉字数字（年二十九 / 二〇二六年八月二十日）
  - 英文版竖排不成立，改为同一框型的横排召集函 THE HERO'S SUMMONS
  - 未填写的选填字段整句略去，帖上不出现「—」
  - 竖排字号与列距用 `clamp()` 随视口连续缩放 —— 单断点切换在 780px 附近会溢出被裁
- **擂台现场**（`Arena`）：整幅效果图 + 四个看点 + 购票入口，置于集锦与最终 CTA 之间
- **创始人履历时间线**（`Timeline`）：16 条，分「起点 / 影视 / 竞技 / 创作与传承」四章，
  配简历原图；下接「江湖印记」影像墙（10 张，无说明文字）
- **隐私政策与服务条款**：`/[locale]/privacy`、`/[locale]/terms`，中英各一份
- **企业页脚**：法人信息、注册地、联系方式（电话 / 邮箱 / Instagram）、站内导航三列、法务链接
- 中英双语：`/zh` `/en` 两套独立路由，各自静态预渲染 + hreflang
- 780px 响应式、`prefers-reduced-motion` 降级、覆盖层 Esc 关闭与滚动锁

## 内容准则

### 创始人板块只收录真实内容

`src/lib/founder.ts` 的全部内容来自本人提供的简历（`陈庆彪简历.pptx`），
未作任何推测或补充。此前设计交付稿里的创始人文案（「八极拳第八代传人」
「率团出访三十余国」「2025 年变卖武馆创办赛事」）是虚构占位，涉及真实人物，已全部移除。

### 一切负面内容不予收录

经确认的编辑准则，适用于全站而非仅创始人板块：

- 经营纠纷、股权变动、亏损、关店等挫折性事件
- 对任何具名个人的负面陈述或责任归属
- 未决的争议、诉讼、指控

已据此略去简历中 2016 年的一段经营纠纷（其中点名了两位第三方个人）。
后续补充内容时同样适用 —— 只收录成就与事实性节点。

## ⚠️ 上线前必须处理

0. **票价仍是演示数据**。计价单位已改美元，但金额沿用原人民币档位
   （$8,888 / $1,888 / $888 / $488），换算后明显偏高，须按实际定价重新分档。
   见 `src/lib/data.ts` 的 `TIER_PRICES` 与 `SESSIONS`。

0. **隐私政策与服务条款是模板，不是法律意见**。`src/lib/legal.ts` 顶部列了五项
   须由律师按实际业务确认的事项，正文中以 `[待定]` 标出对应位置，共 10 处。
   正式收集个人信息（报名、购票）前必须审定。

1. **选手头像与集锦封面为 Wikimedia Commons 占位图**（`src/lib/data.ts` 中的 `wiki()`），
   授权多为 CC-BY / CC-BY-SA。商用前必须替换为自有版权素材，或补齐合规署名。
2. **创始人陈庆彪的两段简介为占位虚构文案**（`src/lib/i18n.ts` 中的 `bio1` / `bio2`），
   须以真实履历核定。
3. `public/assets/` 内 13 张创始人照片为真实素材，可直接上线。

## 待接入

| 模块 | 现状 | 需要 |
|---|---|---|
| 赛程 / 榜单数据 | `src/lib/data.ts` 静态常量 | CMS 或 API |
| 购票 | 演示态，无库存无支付 | 座位库存服务、订单、支付网关、电子票 |
| 报名 | 演示态，编号本地生成 | 表单入库、审核后台、英雄帖 PDF / 图片导出 |
| 集锦 | 卡片可点击但无行为 | 视频播放器 |
| 选手详情页 | 设计稿未含 | 需另出设计 |
| 域名 | `[locale]/layout.tsx` 中 `SITE` 为占位 | 换成实际域名，否则 canonical / og:url 不对 |
