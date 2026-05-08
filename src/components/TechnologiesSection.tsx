import { useMemo, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore, type TechnologyCard } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Search, Sparkles } from "lucide-react";

function TechCard({ card }: { card: TechnologyCard }) {
  const L = useLocalized();
  const t = useT();
  const { language } = useUiStore();
  const title = L(card.title, card.title_ar);
  const description = L(card.description, card.description_ar);

  const Wrapper: any = card.link ? "a" : "div";
  const wrapperProps = card.link
    ? { href: card.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`govbh-card govbh-card--with-image block ${card.link ? "cursor-pointer" : ""}`}
    >
      <div className="govbh-card__head">
        <div className="govbh-card__head-image">
          {card.icon ? (
            <img
              src={card.icon}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <Sparkles size={36} className="text-primary" />
            </div>
          )}
        </div>
        <div className="govbh-card__head-content">
          <h3 className="govbh-card__title">
            <span className="block">{title}</span>
          </h3>
          <div className="govbh-card__paragraph">
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="govbh-card__foot">
        <div className="govbh-btn govbh-btn--outline govbh-btn--small w-full">
          {t("common.viewDetails")}
        </div>
      </div>
    </Wrapper>
  );
}

export default function TechnologiesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { technologies } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const { language } = useUiStore();
  const isAr = language === "ar";
  const styles = useSectionStyles(technologies);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const previewCards = useMemo(() => {
    const bySlot = [1, 2, 3]
      .map((s) => technologies.cards.find((c) => c.previewSlot === s))
      .filter(Boolean) as TechnologyCard[];
    return bySlot.length > 0 ? bySlot : technologies.cards.slice(0, 3);
  }, [technologies.cards]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return technologies.cards;
    return technologies.cards.filter((c) => {
      const fields = [c.title, c.title_ar, c.description, c.description_ar, c.category, c.category_ar, ...(c.tags || []), ...(c.tags_ar || [])];
      return fields.filter(Boolean).some((f) => f!.toLowerCase().includes(q));
    });
  }, [query, technologies.cards]);

  return (
    <section id="technologies" className="govbh-section section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-12"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(technologies.heading, technologies.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(technologies.description, technologies.description_ar)}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {previewCards.map((card) => (
            <TechCard key={card.id} card={card} />
          ))}
        </div>

        {technologies.cards.length > previewCards.length && (
          <div className="flex justify-center mt-12">
            <Button onClick={() => setOpen(true)} size="lg" className="rounded-full px-8 shadow-md">
              {t("technologies.viewAll")} <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0 flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-3 border-b border-border shrink-0">
            <DialogTitle className="font-display text-2xl">
              {t("technologies.allTechnologies")} ({technologies.cards.length})
            </DialogTitle>
            <div className="relative mt-3">
              <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isAr ? "right-3" : "left-3"}`} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAr ? "ابحث في التقنيات..." : "Search technologies..."}
                className={isAr ? "pr-9" : "pl-9"}
                dir={isAr ? "rtl" : "ltr"}
              />
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((card) => (
                <TechCard key={card.id} card={card} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                {isAr ? "لا توجد نتائج" : "No results"}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
