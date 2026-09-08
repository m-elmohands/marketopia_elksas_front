import { notFound } from "next/navigation";
import { getArticles } from "@/features/home/services/content-api";
import { GuideList } from "@/features/guides/components/guide-list";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { PageHero } from "@/shared/components/page-hero";

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getMessages(locale);
  return <><PageHero eyebrow={messages.guidesPage.eyebrow} title={messages.guidesPage.title} description={messages.guidesPage.description} /><section className="section listing-section"><GuideList articles={await getArticles(locale)} locale={locale} messages={messages} /></section></>;
}
