import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/features/home/services/content-api";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { ArrowIcon } from "@/shared/components/icons";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = await getArticle(locale, slug);
  return article ? { title: `${article.title} | El-Ksas`, description: article.excerpt } : {};
}

export default async function GuideDetailsPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = await getArticle(locale, slug);
  if (!article) notFound();
  const m = getMessages(locale);

  return <article className="article-detail" id="content"><header className="article-header"><Link className="text-link back-link" href={`/${locale}/guides`}><ArrowIcon />{m.common.back}</Link><p className="eyebrow"><span />{article.category?.name ?? m.guidesPage.eyebrow}</p><h1>{article.title}</h1><p className="lead">{article.excerpt}</p><time dateTime={article.published_at}>{m.common.published}: {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(article.published_at))}</time></header>{article.image_url ? <div className="article-cover"><Image src={article.image_url} alt={article.title} fill priority sizes="(max-width: 1200px) 100vw, 1100px" unoptimized={process.env.NODE_ENV === "development"} /></div> : null}<div className="prose article-body"><p>{article.body ?? article.excerpt}</p></div></article>;
}
