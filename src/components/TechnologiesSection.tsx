import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useContentStore, type TechnologyCard } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Sparkles } from "lucide-react";

function TechCard({ card, compact = false }: { card: TechnologyCard; compact?: boolean }) {
  const L = useLocalized();
  const t = useT();
  const title = L(card.title, card.title_ar);
  const description = L(card.description, card.description_ar);

  const Wrapper: any = card.link ? "a" : "div";
  const wrapperProps = card.link
    ? { href: card.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-border shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col ${
        compact ? "h-[300px]" : "h-[380px]"
      } ${card.link ? "cursor-pointer" : ""}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {card.icon ? (
          <img
            src={card.icon}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <Sparkles size={48} className="text-primary/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      </div>

      {/* Content Overlay */}
      <div className={`relative z-10 mt-auto ${compact ? "p-5" : "p-6 md:p-8"} space-y-2`}>
        <div className="flex items-center gap-2 mb-1">
          <Badge className="bg-primary/90 text-white border-0 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-md">
            {L(card.category || "Technology", card.category_ar)}
          </Badge>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </div>
        
        <h3 className={`font-display font-bold text-white tracking-tight leading-tight ${
          compact ? "text-xl" : "text-2xl md:text-3xl"
        }`}>
          {title}
        </h3>
        
        <p className={`text-white/75 line-clamp-2 font-medium leading-relaxed ${
          compact ? "text-xs" : "text-sm md:text-base"
        }`}>
          {description}
        </p>

        <div className={`flex items-center gap-2 text-white font-bold uppercase tracking-widest group-hover:gap-3 transition-all duration-300 ${
          compact ? "pt-2 text-[10px]" : "pt-3 text-xs"
        }`}>
          <span>{t("common.viewDetails")}</span>
          <ArrowRight size={compact ? 14 : 16} className="text-accent" />
        </div>
      </div>

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-[1]" />
    </Wrapper>
  );
}

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const gridItem = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }
};

export default function TechnologiesSection() {
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
    <section id="technologies" className="govbh-section section-padding py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(technologies.heading, technologies.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed" style={styles.description}>
            {L(technologies.description, technologies.description_ar)}
          </p>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {previewCards.map((card) => (
            <motion.div key={card.id} variants={gridItem}>
              <TechCard card={card} />
            </motion.div>
          ))}
        </motion.div>

        {technologies.cards.length > previewCards.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button onClick={() => setOpen(true)} size="lg" className="rounded-full px-8 shadow-md font-bold tracking-wide">
              {t("technologies.viewAll")} <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
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
                <TechCard key={card.id} card={card} compact />
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
