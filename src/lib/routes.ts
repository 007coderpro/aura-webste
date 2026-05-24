export function shouldShowFooterLogin(pathname: string | null) {
  return pathname === "/blog" || Boolean(pathname?.startsWith("/blog/"));
}
