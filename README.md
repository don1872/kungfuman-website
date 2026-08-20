# KungFuMan 功夫人巅峰赛 · 官网

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
├─ app/
│  ├─ globals.css     设计 token（@theme）、keyframes、响应式组件类
│  ├─ layout.tsx      字体引入、SEO metadata
│  └─ page.tsx        页面组装 + 顶层状态（语言 / 两个覆盖层）
├─ components/        每个板块一个组件
└─ lib/
   ├─ data.ts         赛程、榜单、五届、集锦、照片墙、13 场次、座区几何
   └─ i18n.ts         中英文案（8 处叙事文案切换）
```

## 设计规范

暖褐红夜色主题，全部 token 见 `globals.css`：

| 用途 | Token | 值 |
|---|---|---|
| 页面底色 | `--color-ink` | `#140b08` |
| 卡片底 | `--color-ink-card` | `#1a0e09` |
| 主红（朱砂） | `--color-cinnabar` | `#e03a20` |
| 亮红 | `--color-flame` | `#ff5a3c` |
| 鎏金 | `--color-gold` | `#e0aa4e` |
| 米白正文 | `--color-rice` | `#f5ead8` |
| 次级文字 | `--color-rice-dim` | `#c9b394` |

响应式断点为 **780px**（覆盖了 Tailwind 默认的 `md:768px`），与设计稿一致。

## 已实现

- 首页全部板块：导航、Hero（倒计时 / 火星 / 竖排水印）、快讯跑马灯、主赛对阵、
  视差插页 ×3、赛程、天下英雄榜（三 tab）、五届之路、创始人 + 江湖印记照片墙、集锦、收尾 CTA、页脚
- 购票二级页：13 场次 → 环形选座（极坐标，主席台 / A / B / C 四档共 36 区）→ 数量步进（1–8）→ 合计 → 出票
- 武者报名二级页：表单校验 → 自动生成武者报名表（编号 / 印章 / 信息行）
- 中英切换（8 处叙事文案；标题类中英并置不切换，为设计特征）
- 780px 响应式、`prefers-reduced-motion` 降级、覆盖层 Esc 关闭与滚动锁

## ⚠️ 上线前必须处理

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
| 报名 | 演示态，编号本地生成 | 表单入库、审核后台、报名表 PDF 导出 |
| 集锦 | 卡片可点击但无行为 | 视频播放器 |
| 选手详情页 | 设计稿未含 | 需另出设计 |
| 多语言 | 客户端切换 | `/zh` `/en` 路由分发（SEO） |
