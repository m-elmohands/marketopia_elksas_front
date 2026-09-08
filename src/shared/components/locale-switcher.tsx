"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const otherLocale = locale === "ar" ? "en" : "ar";
  const segments = pathname.split("/");
  segments[1] = otherLocale;

  return <Link className="language" href={segments.join("/") || `/${otherLocale}`} hrefLang={otherLocale}>{label}</Link>;
}
