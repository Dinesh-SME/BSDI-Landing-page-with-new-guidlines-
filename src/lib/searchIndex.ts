export interface SearchHit {
  id: string;
  type: "layer" | "service" | "news" | "user" | "vision";
  section: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

type Store = {
  layers: any;
  services: any;
  users: any;
  news: any;
  vision: any;
};

function pick(en: string | undefined, ar: string | undefined, lang: string) {
  return lang === "ar" && ar ? ar : (en || "");
}

export function buildSearchIndex(store: Store, lang: string): SearchHit[] {
  const hits: SearchHit[] = [];

  store.layers?.cards?.forEach((c: any) =>
    hits.push({
      id: c.id, type: "layer", section: "search.section.layers",
      title: pick(c.title, c.title_ar, lang),
      description: pick(c.description, c.description_ar, lang),
      image: c.image, link: c.link || "/#layers",
    })
  );
  store.services?.cards?.forEach((c: any) =>
    hits.push({
      id: c.id, type: "service", section: "search.section.services",
      title: pick(c.title, c.title_ar, lang),
      description: pick(c.description, c.description_ar, lang),
      image: c.image, link: c.link || "/#services",
    })
  );
  store.users?.cards?.forEach((c: any) =>
    hits.push({
      id: c.id, type: "user", section: "search.section.users",
      title: pick(c.title, c.title_ar, lang),
      description: pick(c.description, c.description_ar, lang),
      image: c.image, link: c.link || "/#who-can-use",
    })
  );
  store.vision?.cards?.forEach((c: any) =>
    hits.push({
      id: c.id, type: "vision", section: "search.section.vision",
      title: pick(c.title, c.title_ar, lang),
      description: pick(c.description, c.description_ar, lang),
      image: c.image, link: c.link || "/#vision",
    })
  );
  store.news?.items?.forEach((c: any) =>
    hits.push({
      id: c.id, type: "news", section: "search.section.news",
      title: pick(c.title, c.title_ar, lang),
      description: pick(c.excerpt, c.excerpt_ar, lang),
      image: c.image, link: c.link || "/#news",
    })
  );

  return hits;
}

export function searchHits(index: SearchHit[], query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((h) =>
    h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q)
  );
}
