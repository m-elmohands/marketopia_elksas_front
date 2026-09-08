import { notFound } from "next/navigation";
import { HomePage } from "@/features/home/components/home-page";
import { getHomeContent } from "@/features/home/services/content-api";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} messages={getMessages(locale)} content={await getHomeContent(locale)} />;
}
