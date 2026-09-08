import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { FacebookIcon } from "@/shared/components/icons";
import { PageHero } from "@/shared/components/page-hero";
import { FACEBOOK_URL } from "@/shared/components/site-header";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);

  return <><PageHero eyebrow={m.aboutPage.eyebrow} title={m.aboutPage.title} description={m.aboutPage.description} /><section className="section about-grid"><article><span>01</span><h2>{m.aboutPage.missionTitle}</h2><p>{m.aboutPage.missionBody}</p></article><article><span>02</span><h2>{m.aboutPage.communityTitle}</h2><p>{m.aboutPage.communityBody}</p><a className="button facebook" href={FACEBOOK_URL} target="_blank" rel="noreferrer"><FacebookIcon />{m.nav.facebook}</a></article></section></>;
}
