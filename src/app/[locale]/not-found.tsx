import Link from "next/link";

export default function NotFound() {
  return <section className="not-found" id="content"><p className="eyebrow"><span />404</p><h1>Content not found</h1><p>The requested content is unavailable.</p><Link className="button primary" href="/">El-Ksas</Link></section>;
}
