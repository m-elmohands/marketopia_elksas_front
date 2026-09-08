import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import type { Article } from "@/features/home/types/content";
import { GuideCard } from "./guide-card";

export function GuideList({ articles, locale, messages }: { articles: Article[]; locale: Locale; messages: Messages }) {
  if (!articles.length) return <p className="empty dark">{messages.guidesPage.empty}</p>;
  return <div className="guide-grid">{articles.map((article, index) => <GuideCard article={article} index={index} locale={locale} messages={messages} key={article.id} />)}</div>;
}
