import Link from "next/link";
import { isRouterHref } from "../lib/i18n";

// For the places where one anchor takes a mix of destinations — a nav row that
// might point at /nova, at a /prototypes embed, or at a #section; an MDX link
// that could go anywhere. Router-owned hrefs get client-side navigation, the
// rest stay real anchors. Where a link is always internal, use <Link> directly.
export default function SmartLink({ href, children, ...rest }) {
  if (!isRouterHref(href)) {
    return <a href={href} {...rest}>{children}</a>;
  }
  return <Link href={href} {...rest}>{children}</Link>;
}
