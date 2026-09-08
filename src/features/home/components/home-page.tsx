import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import { ArrowIcon, FacebookIcon } from "@/shared/components/icons";
import { FACEBOOK_URL } from "@/shared/components/site-header";
import type { HomeContent } from "../types/content";

export function HomePage({ locale, messages: m, content }: { locale: Locale; messages: Messages; content: HomeContent | null }) {
  const settings = content?.settings ?? {};

  return <>
    <section className="hero" id="content">
      <div className="hero-copy"><p className="eyebrow"><span />{m.hero.eyebrow}</p><h1>{settings.hero_title ?? m.hero.title}</h1><p className="lead">{settings.hero_description ?? m.hero.description}</p><div className="hero-actions"><Link className="button primary" href={`/${locale}/motorcycles`}>{m.hero.explore}<ArrowIcon /></Link><Link className="button ghost" href={`/${locale}/guides`}>{m.hero.guides}</Link></div><p className="road-note"><span>01</span>{m.hero.badge}</p></div>
      <div className="hero-art" aria-label={m.accessibility.heroArtwork}><div className="sun" /><div className="speed-lines" /><Image src={settings.site_logo_url ?? "/images/el-ksas-logo.jpg"} alt={m.accessibility.logoAlt} width={1056} height={992} priority unoptimized={process.env.NODE_ENV === "development" && Boolean(settings.site_logo_url)} /><span className="vertical-word">MOTORCYCLE CULTURE</span></div>
    </section>
    <section className="section categories"><div className="section-heading"><div><p className="eyebrow"><span />{m.categories.eyebrow}</p><h2>{m.categories.title}</h2></div><p>{m.categories.description}</p></div><div className="category-grid">{(content?.categories ?? []).map((category, index) => <article className="category-card" key={category.id}><span>0{index + 1}</span><h3>{category.name}</h3><p>{category.description}</p><ArrowIcon /></article>)}</div></section>
    <section className="section dark-section"><div className="section-heading"><div><p className="eyebrow light"><span />{m.featured.eyebrow}</p><h2>{m.featured.title}</h2></div><Link className="text-link" href={`/${locale}/motorcycles`}>{m.common.viewAll}<ArrowIcon /></Link></div><div className="motorcycle-grid">{content?.motorcycles.length ? content.motorcycles.slice(0, 3).map((bike) => <Link className="bike-card" href={`/${locale}/motorcycles/${bike.slug}`} key={bike.id}><div className="bike-image">{bike.images[0] ? <Image src={bike.images[0].url} alt={bike.name} fill sizes="(max-width: 768px) 100vw, 33vw" unoptimized={process.env.NODE_ENV === "development"} /> : <div className="bike-placeholder">EL-KSAS</div>}<span>{bike.model_year}</span></div><div className="bike-body"><p>{bike.manufacturer}</p><h3>{bike.name}</h3><div className="specs"><span>{m.featured.engine}<b>{bike.engine_cc ?? "—"} CC</b></span><span>{m.featured.power}<b>{bike.power_hp ?? "—"} HP</b></span></div><span className="text-link">{m.featured.view}<ArrowIcon /></span></div></Link>) : <p className="empty">{m.featured.empty}</p>}</div></section>
    <section className="section guides"><div className="section-heading"><div><p className="eyebrow"><span />{m.guides.eyebrow}</p><h2>{m.guides.title}</h2></div><Link className="text-link" href={`/${locale}/guides`}>{m.common.viewAll}<ArrowIcon /></Link></div><div className="guide-grid">{content?.articles.length ? content.articles.slice(0, 3).map((article, index) => <Link className="guide-card" href={`/${locale}/guides/${article.slug}`} key={article.id}><div className="guide-number">0{index + 1}</div><p className="guide-date">{new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(article.published_at))}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span className="text-link">{m.guides.read}<ArrowIcon /></span></Link>) : <p className="empty dark">{m.guides.empty}</p>}</div></section>
    <section className="cta"><div><p className="eyebrow light"><span />EL-KSAS COMMUNITY</p><h2>{m.cta.title}</h2><p>{m.cta.description}</p></div><a className="button facebook" href={settings.facebook_url ?? FACEBOOK_URL} target="_blank" rel="noreferrer"><FacebookIcon />{m.cta.button}</a></section>
  </>;
}
