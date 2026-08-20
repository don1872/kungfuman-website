import "./globals.css";

/**
 * 根布局。<html lang> 由 [locale]/layout.tsx 决定，这里只做壳。
 * 中间件会把裸路径重定向到 /zh 或 /en，因此实际渲染的总是带语言前缀的路由。
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
