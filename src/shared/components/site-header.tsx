import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import { FacebookIcon } from "./icons";
import { LocaleSwitcher } from "./locale-switcher";

export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100064234203552&locale=ar_AR";

export function SiteHeader({ locale, messages: m, logoUrl }: { locale: Locale; messages: Messages; logoUrl: string | null }) {
  return <header className="header">
    <Link className="brand" href={`/${locale}`} aria-label={m.accessibility.homeLabel}><Image src={logoUrl ?? "/images/el-ksas-logo.jpg"} alt="El-Ksas | القصاص" width={1056} height={992} priority unoptimized={process.env.NODE_ENV === "development" && Boolean(logoUrl)} /><span>EL-KSAS<small>القصاص</small></span></Link>
    <nav aria-label={m.accessibility.primaryNavigation}>
      <Link href={`/${locale}`}>{m.nav.home}</Link>
      <Link href={`/${locale}/motorcycles`}>{m.nav.motorcycles}</Link>
      <Link href={`/${locale}/guides`}>{m.nav.guides}</Link>
      <Link href={`/${locale}/about`}>{m.nav.about}</Link>
    </nav>
    <div className="header-actions"><LocaleSwitcher locale={locale} label={m.nav.language} /><a className="facebook compact" href={FACEBOOK_URL} target="_blank" rel="noreferrer"><FacebookIcon />{m.nav.facebook}</a></div>
  </header>;
}
