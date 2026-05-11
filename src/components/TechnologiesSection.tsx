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
      className={`group relative overflow-hidden rounded-2xl flex flex-col
        bg-white dark:bg-slate-900/80 dark:backdrop-blur-xl
        border border-gray-100 dark:border-white/10
        shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)]
        hover:shadow-[0_8px_40px_rgba(0,40,85,0.12),0_2px_8px_rgba(0,0,0,0.06)]
        dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]
        dark:hover:shadow-[0_8px_40px_rgba(59,130,246,0.15),0_2px_8px_rgba(0,0,0,0.3)]
        hover:-translate-y-2 transition-all duration-500 ease-out
        ${compact ? "h-[320px]" : "h-[380px]"} w-full
        ${card.link ? "cursor-pointer" : ""}`}
    >
      {/* Card Content */}
      <div className={`flex flex-col h-full ${compact ? "p-5" : "p-7 md:p-8"}`}>
        
        {/* Top Row: Logo left, Badge+Status right */}
        <div className="flex items-start justify-between mb-6 shrink-0">
          {/* Logo Container - Fixed Size & Centered */}
          <div className={`flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
            compact ? "w-12 h-12 p-2" : "w-16 h-16 md:w-20 md:h-20 p-3"
          }`}>
            {card.icon ? (
              <img
                src={card.icon}
                alt={title}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            ) : (
              <Sparkles size={compact ? 20 : 28} className="text-primary/50" />
            )}
          </div>

          {/* Badge + Status */}
          <div className="flex items-center gap-2">
            <Badge className="bg-slate-800 dark:bg-slate-700 text-white border-0 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-sm">
              {L(card.category || "Technology", card.category_ar)}
            </Badge>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* Title - Handle multiline consistently */}
        <h3 className={`font-display font-bold text-foreground tracking-tight leading-[1.2] mb-2 line-clamp-2 ${
          compact ? "text-lg" : "text-xl md:text-2xl"
        }`}>
          {title}
        </h3>

        {/* Description - Strict 2 line limit */}
        <p className={`text-muted-foreground leading-relaxed line-clamp-2 ${
          compact ? "text-xs" : "text-sm md:text-base"
        }`}>
          {description}
        </p>

        {/* CTA - Locked to bottom */}
        <div className={`mt-auto flex items-center gap-2 text-foreground font-bold uppercase tracking-widest transition-all duration-300 ${
          compact ? "pt-4 text-[10px]" : "pt-6 text-xs"
        }`}>
          <span className="group-hover:text-primary transition-colors duration-300">
            {t("common.viewDetails")}
          </span>
          <ArrowRight 
            size={compact ? 14 : 16} 
            className="text-red-500 transition-transform duration-300 group-hover:translate-x-1.5" 
          />
        </div>
      </div>
    </Wrapper>
  );
}

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const gridItem = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
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
    const bySlot = [1, 2, 3, 4]
      .map((s) => technologies.cards.find((c) => c.previewSlot === s))
      .filter(Boolean) as TechnologyCard[];
    return bySlot.length > 0 ? bySlot : technologies.cards.slice(0, 4);
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto"
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
