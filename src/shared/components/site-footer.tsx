import Image from "next/image";
import type { Messages } from "@/i18n/get-messages";

export function SiteFooter({ messages: m, logoUrl }: { messages: Messages; logoUrl: string | null }) {
  return <footer><div className="brand footer-brand"><Image src={logoUrl ?? "/images/el-ksas-logo.jpg"} alt="" width={1056} height={992} unoptimized={process.env.NODE_ENV === "development" && Boolean(logoUrl)} /><span>EL-KSAS<small>القصاص</small></span></div><p>{m.footer.tagline}</p><p>© {new Date().getFullYear()} Marketopia. {m.footer.rights}</p></footer>;
}
