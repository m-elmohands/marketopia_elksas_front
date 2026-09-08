import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import { ArrowIcon } from "@/shared/components/icons";
import type { Article } from "@/features/home/types/content";

export function GuideCard({ article, index, locale, messages: m }: { article: Article; index: number; locale: Locale; messages: Messages }) {
  return <Link className="guide-card" href={`/${locale}/guides/${article.slug}`}>{article.image_url ? <div className="guide-image"><Image src={article.image_url} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" unoptimized={process.env.NODE_ENV === "development"} /></div> : <div className="guide-number">{String(index + 1).padStart(2, "0")}</div>}<p className="guide-date">{new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(article.published_at))}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span className="text-link">{m.guides.read}<ArrowIcon /></span></Link>;
}
