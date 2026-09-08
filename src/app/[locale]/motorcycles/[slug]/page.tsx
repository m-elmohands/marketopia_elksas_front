import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMotorcycle } from "@/features/home/services/content-api";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { ArrowIcon } from "@/shared/components/icons";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const motorcycle = await getMotorcycle(locale, slug);
  return motorcycle ? { title: `${motorcycle.name} | El-Ksas`, description: motorcycle.summary } : {};
}

export default async function MotorcycleDetailsPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const motorcycle = await getMotorcycle(locale, slug);
  if (!motorcycle) notFound();
  const m = getMessages(locale);

  return <article id="content"><section className="detail-hero"><div><Link className="text-link back-link" href={`/${locale}/motorcycles`}><ArrowIcon />{m.common.back}</Link><p className="eyebrow light"><span />{motorcycle.manufacturer}</p><h1>{motorcycle.name}</h1><p className="lead">{motorcycle.summary}</p></div>{motorcycle.images[0] ? <div className="detail-cover"><Image src={motorcycle.images[0].url} alt={motorcycle.name} fill priority sizes="(max-width: 1000px) 100vw, 50vw" unoptimized={process.env.NODE_ENV === "development"} /></div> : null}</section><section className="section detail-content"><div className="detail-specs"><div><span>{m.motorcyclesPage.year}</span><b>{motorcycle.model_year}</b></div><div><span>{m.featured.engine}</span><b>{motorcycle.engine_cc ? `${motorcycle.engine_cc} CC` : m.common.notAvailable}</b></div><div><span>{m.featured.power}</span><b>{motorcycle.power_hp ? `${motorcycle.power_hp} HP` : m.common.notAvailable}</b></div><div><span>{m.motorcyclesPage.price}</span><b>{motorcycle.price ? `${motorcycle.price} ${motorcycle.currency}` : m.common.notAvailable}</b></div></div><div className="prose"><h2>{m.motorcyclesPage.details}</h2><p>{motorcycle.details ?? motorcycle.summary}</p></div>{motorcycle.images.length > 1 ? <div className="gallery"><h2>{m.motorcyclesPage.gallery}</h2><div>{motorcycle.images.slice(1).map((image) => <Image src={image.url} alt={image.name} width={900} height={675} key={image.url} unoptimized={process.env.NODE_ENV === "development"} />)}</div></div> : null}</section></article>;
}
