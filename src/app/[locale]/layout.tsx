import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomeContent } from "@/features/home/services/content-api";
import { isLocale, locales } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { SiteFooter } from "@/shared/components/site-footer";
import { SiteHeader } from "@/shared/components/site-header";
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getMessages(locale);
  const logoUrl = (await getHomeContent(locale))?.settings.site_logo_url ?? "/favicon-default.ico";
  return { title: meta.title, description: meta.description, icons: { icon: logoUrl, shortcut: logoUrl, apple: logoUrl } };
}
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getMessages(locale);
  const logoUrl = (await getHomeContent(locale))?.settings.site_logo_url ?? null;
  return <div className="site-shell" lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}><a className="skip-link" href="#content">{messages.accessibility.skipToContent}</a><SiteHeader locale={locale} messages={messages} logoUrl={logoUrl} /><main>{children}</main><SiteFooter messages={messages} logoUrl={logoUrl} /></div>;
}
