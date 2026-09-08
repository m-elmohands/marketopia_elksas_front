import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import { ArrowIcon } from "@/shared/components/icons";
import type { Motorcycle } from "@/features/home/types/content";

export function MotorcycleCard({ motorcycle: bike, locale, messages: m }: { motorcycle: Motorcycle; locale: Locale; messages: Messages }) {
  return <Link className="bike-card" href={`/${locale}/motorcycles/${bike.slug}`}><div className="bike-image">{bike.images[0] ? <Image src={bike.images[0].url} alt={bike.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized={process.env.NODE_ENV === "development"} /> : <div className="bike-placeholder">EL-KSAS</div>}<span>{bike.model_year}</span></div><div className="bike-body"><p>{bike.manufacturer}</p><h3>{bike.name}</h3><div className="specs"><span>{m.featured.engine}<b>{bike.engine_cc ?? "—"} CC</b></span><span>{m.featured.power}<b>{bike.power_hp ?? "—"} HP</b></span></div><span className="text-link">{m.featured.view}<ArrowIcon /></span></div></Link>;
}
