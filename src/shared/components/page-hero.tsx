export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-hero" id="content"><p className="eyebrow light"><span />{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></section>;
}
