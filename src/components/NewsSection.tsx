import { useMemo, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useLocalizeDate, useT, useSectionStyles } from "@/lib/i18n";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { news } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const fmtDate = useLocalizeDate();
  const styles = useSectionStyles(news);
  const [open, setOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  // All news sorted newest first (for the "All News" popup)
  const allSorted = useMemo(() => {
    return [...news.items].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (isNaN(da) || isNaN(db)) return 0;
      return db - da;
    });
  }, [news.items]);

  // Preview slots: show only items with previewSlot 1..3 in order
  const sortedItems = useMemo(() => {
    const bySlot = [1, 2, 3]
      .map((s) => news.items.find((i) => i.previewSlot === s))
      .filter(Boolean) as typeof news.items;
    if (bySlot.length > 0) return bySlot;
    // Backward compat fallback
    const priority = news.items.filter((i) => i.priorityPreview);
    if (priority.length > 0) return priority.slice(0, 3);
    return allSorted.slice(0, 3);
  }, [news.items, allSorted]);

  return (
    <section id="news" className="govbh-section section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(news.heading, news.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(news.description, news.description_ar)}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {sortedItems.slice(0, 3).map((item, i) => {
            const title = L(item.title, item.title_ar);
            const hasLink = item.link && item.link !== "#";
            
            const card = (
              <div
                className="govbh-newscard"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.12}s forwards` : "none",
                }}
              >
                <div className="govbh-newscard__image">
                  <img
                    src={item.image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="govbh-newscard__content">
                  <div className="govbh-newscard__date">
                    <span>{fmtDate(item.date)}</span>
                  </div>
                  <h3 className="govbh-newscard__title">
                    {title}
                  </h3>
                  <div className="govbh-newscard__content-foot">
                     {hasLink ? (
                       <a href={item.link} target="_blank" rel="noopener noreferrer" className="govbh-btn govbh-btn--outline govbh-btn--small">
                          {t("news.readMore")}
                       </a>
                     ) : (
                       <button 
                        onClick={() => setSelectedNews(item)}
                        className="govbh-btn govbh-btn--outline govbh-btn--small"
                       >
                          {t("news.readMore")}
                       </button>
                     )}
                  </div>
                </div>
              </div>
            );

            return <div key={item.id}>{card}</div>;
          })}
        </div>

        {/* View all CTA */}
        <div
          className="mt-12 flex justify-center"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.3s forwards" : "none" }}
        >
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            className="gap-2 rounded-full px-8 shadow-md hover:shadow-lg transition-all"
          >
            <Newspaper size={18} />
            {t("news.viewAll")}
          </Button>
        </div>
      </div>

      {/* All News Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <Newspaper size={22} className="text-primary" />
              {t("news.allNews")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("news.allNewsDesc")}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh]">
            <ul className="divide-y divide-border">
              {allSorted.length === 0 && (
                <li className="px-6 py-10 text-center text-muted-foreground text-sm">
                  {t("news.empty")}
                </li>
              )}
              {allSorted.map((item) => {
                const title = L(item.title, item.title_ar);
                const excerpt = L(item.excerpt, item.excerpt_ar);
                const hasLink = item.link && item.link !== "#";
                const Inner = (
                  <div 
                    className="flex gap-4 px-6 py-4 hover:bg-muted/50 transition-colors group cursor-pointer"
                    onClick={() => {
                      if (!hasLink) setSelectedNews(item);
                    }}
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <img
                        src={item.image}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                        <Calendar size={12} />
                        <span>{fmtDate(item.date)}</span>
                      </div>
                      <h4 className="font-display text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                      </h4>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary">
                        {t("news.readMore")} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                );
                return (
                  <li key={item.id}>
                    {hasLink ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                        {Inner}
                      </a>
                    ) : (
                      Inner
                    )}
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* News Detail Popup */}
      <Dialog open={!!selectedNews} onOpenChange={(o) => !o && setSelectedNews(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-3xl border-none shadow-2xl bg-white">
          {selectedNews && (
            <div className="flex flex-col h-full max-h-[90vh]">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <img 
                  src={selectedNews.image} 
                  alt={L(selectedNews.title, selectedNews.title_ar)} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    <Calendar size={14} className="text-primary-foreground" />
                    {fmtDate(selectedNews.date)}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                    {L(selectedNews.title, selectedNews.title_ar)}
                  </h2>
                </div>
              </div>

              <ScrollArea className="flex-1 p-8">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl italic text-lg text-foreground/80 leading-relaxed font-medium">
                    {L(selectedNews.excerpt, selectedNews.excerpt_ar)}
                  </div>
                  <div className="prose prose-slate max-w-none prose-p:text-muted-foreground prose-p:leading-loose prose-p:text-lg">
                    {(L(selectedNews.description, selectedNews.description_ar) || "Detailed content coming soon.").split('\n').map((para: string, idx: number) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
