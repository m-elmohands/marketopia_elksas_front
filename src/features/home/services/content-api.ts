import { cache } from "react";
import type { Locale } from "@/i18n/config";
import { apiGet } from "@/shared/services/api-client";
import type { ApiEnvelope, Article, HomeContent, Motorcycle, PaginatedEnvelope } from "../types/content";

const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL ?? "http://localhost:8000";

function normalizeMediaUrl(url: string): string {
  try {
    const source = new URL(url);

    if (source.hostname !== "localhost" && source.hostname !== "127.0.0.1") return url;

    return new URL(`${source.pathname}${source.search}`, MEDIA_URL).toString();
  } catch {
    return url;
  }
}

function normalizeMotorcycle(motorcycle: Motorcycle): Motorcycle {
  return { ...motorcycle, images: motorcycle.images.map((image) => ({ ...image, url: normalizeMediaUrl(image.url) })) };
}

function normalizeArticle(article: Article): Article {
  return { ...article, image_url: article.image_url ? normalizeMediaUrl(article.image_url) : null };
}

export const getHomeContent = cache(async (locale: Locale): Promise<HomeContent | null> => {
  const content = (await apiGet<ApiEnvelope<HomeContent>>(`/home?locale=${locale}`))?.data;
  return content ? {
    ...content,
    settings: {
      ...content.settings,
      site_logo_url: content.settings.site_logo_url ? normalizeMediaUrl(content.settings.site_logo_url) : null,
    },
    motorcycles: content.motorcycles.map(normalizeMotorcycle),
    articles: content.articles.map(normalizeArticle),
  } : null;
});

export async function getMotorcycles(locale: Locale): Promise<Motorcycle[]> {
  return ((await apiGet<PaginatedEnvelope<Motorcycle>>(`/motorcycles?locale=${locale}&per_page=50`))?.data ?? []).map(normalizeMotorcycle);
}

export async function getMotorcycle(locale: Locale, slug: string): Promise<Motorcycle | null> {
  const motorcycle = (await apiGet<ApiEnvelope<Motorcycle>>(`/motorcycles/${encodeURIComponent(slug)}?locale=${locale}`))?.data;
  return motorcycle ? normalizeMotorcycle(motorcycle) : null;
}

export async function getArticles(locale: Locale): Promise<Article[]> {
  return ((await apiGet<PaginatedEnvelope<Article>>(`/articles?locale=${locale}&per_page=50`))?.data ?? []).map(normalizeArticle);
}

export async function getArticle(locale: Locale, slug: string): Promise<Article | null> {
  const article = (await apiGet<ApiEnvelope<Article>>(`/articles/${encodeURIComponent(slug)}?locale=${locale}`))?.data;
  return article ? normalizeArticle(article) : null;
}
