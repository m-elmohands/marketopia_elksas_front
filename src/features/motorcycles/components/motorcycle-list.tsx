import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import type { Motorcycle } from "@/features/home/types/content";
import { MotorcycleCard } from "./motorcycle-card";

export function MotorcycleList({ motorcycles, locale, messages }: { motorcycles: Motorcycle[]; locale: Locale; messages: Messages }) {
  if (!motorcycles.length) return <p className="empty dark">{messages.motorcyclesPage.empty}</p>;
  return <div className="motorcycle-grid">{motorcycles.map((motorcycle) => <MotorcycleCard motorcycle={motorcycle} locale={locale} messages={messages} key={motorcycle.id} />)}</div>;
}
