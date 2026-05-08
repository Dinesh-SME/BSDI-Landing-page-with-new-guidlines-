import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import { useT, useLocalizeNumber } from "@/lib/i18n";
import { buildSearchIndex, searchHits } from "@/lib/searchIndex";
import { Search as SearchIcon, ArrowRight } from "lucide-react";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const store = useContentStore();
  const { language } = useUiStore();
  const t = useT();
  const num = useLocalizeNumber();

  const hits = useMemo(() => {
    const index = buildSearchIndex(store, language);
    return searchHits(index, q);
  }, [store, language, q]);

  const grouped = hits.reduce<Record<string, typeof hits>>((acc, h) => {
    (acc[h.section] = acc[h.section] || []).push(h);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2 text-primary">
            <SearchIcon size={18} />
            <span className="text-sm font-semibold">{t("search.resultsFor")}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            "{q}"
          </h1>
          <p className="text-muted-foreground mb-10 text-sm">
            {num(hits.length)} {t("search.totalFound")}
          </p>

          {hits.length === 0 ? (
            <div className="clean-card p-10 text-center">
              <p className="text-muted-foreground">{t("search.noResults")}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([section, items]) => (
                <section key={section}>
                  <h2 className="font-display text-xl font-bold text-foreground mb-5">
                    {t(section)} <span className="text-muted-foreground text-sm">({num(items.length)})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((h) => {
                      const isExternal = h.link?.startsWith("http");
                      const Wrapper: any = isExternal ? "a" : Link;
                      const wrapperProps: any = isExternal
                        ? { href: h.link, target: "_blank", rel: "noopener noreferrer" }
                        : { to: h.link };
                      return (
                        <Wrapper key={`${section}-${h.id}`} {...wrapperProps} className="block">
                          <article className="clean-card h-full flex flex-col">
                            <div className="card-image aspect-[16/10]">
                              <img src={h.image} alt={h.title} loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                              <h3 className="font-display text-base font-semibold text-foreground">{h.title}</h3>
                              <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{h.description}</p>
                              <span className="view-details-link mt-4">
                                {t("common.openExternal")} <ArrowRight size={14} />
                              </span>
                            </div>
                          </article>
                        </Wrapper>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
