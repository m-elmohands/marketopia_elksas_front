import { notFound } from "next/navigation";
import { getMotorcycles } from "@/features/home/services/content-api";
import { MotorcycleList } from "@/features/motorcycles/components/motorcycle-list";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { PageHero } from "@/shared/components/page-hero";

export default async function MotorcyclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getMessages(locale);
  return <><PageHero eyebrow={messages.motorcyclesPage.eyebrow} title={messages.motorcyclesPage.title} description={messages.motorcyclesPage.description} /><section className="section dark-section listing-section"><MotorcycleList motorcycles={await getMotorcycles(locale)} locale={locale} messages={messages} /></section></>;
}
