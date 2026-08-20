import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, detectLocale } from "@/lib/locales";

/**
 * 裸路径 / 按 Accept-Language 重定向到 /zh 或 /en。
 * 已带语言前缀的路径原样放行。
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // 跳过静态资源与图片优化端点
  matcher: ["/((?!_next|assets|favicon.ico|.*\\.).*)"],
};
