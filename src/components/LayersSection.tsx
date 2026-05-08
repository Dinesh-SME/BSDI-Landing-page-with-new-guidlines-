import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore, type LayerCard as LayerCardType } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Database, Tag, MapPin, ExternalLink, FileType, Globe, RefreshCw, Layers as LayersIcon, Building2, Info, Sparkles } from "lucide-react";

function LayerCardItem({ card, onClick }: { card: LayerCardType; onClick: (c: LayerCardType) => void }) {
  const L = useLocalized();
  const title = L(card.title, card.title_ar);
  const description = L(card.description, card.description_ar);
  return (
    <button
      type="button"
      onClick={() => onClick(card)}
      title="Click to view details"
      className="group text-left rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={card.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center flex-1 flex flex-col justify-start gap-1">
        <p className="font-display text-xs md:text-sm font-semibold tracking-wide text-foreground truncate">
          {title}
        </p>
        {description && (
          <p className="text-[11px] md:text-xs text-muted-foreground leading-snug line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </button>
  );
}

export default function LayersSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { layers } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const { language } = useUiStore();
  const isAr = language === "ar";
  const [open, setOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<LayerCardType | null>(null);
  const styles = useSectionStyles(layers);

  const previewCards = (() => {
    const bySlot = [1, 2, 3, 4]
      .map((s) => layers.cards.find((c) => c.previewSlot === s))
      .filter(Boolean) as typeof layers.cards;
    return bySlot.length > 0 ? bySlot : layers.cards.slice(0, 4);
  })();

  const handleCardClick = (c: LayerCardType) => setSelectedLayer(c);

  const labels = {
    shortDesc: isAr ? "وصف موجز" : "Short description",
    details: isAr ? "تفاصيل" : "Detailed Information",
    overview: isAr ? "نظرة عامة على البيانات" : "Dataset Overview",
    spatial: isAr ? "المعلومات المكانية" : "Spatial Information",
    usage: isAr ? "الاستخدامات والتطبيقات" : "Usage & Applications",
    related: isAr ? "طبقات ذات صلة" : "Related Layers",
    metadata: isAr ? "البيانات الوصفية الرئيسية" : "Key Attributes",
    category: isAr ? "الفئة" : "Category",
    lastUpdated: isAr ? "آخر تحديث" : "Last Updated",
    source: isAr ? "المصدر" : "Source",
    sourceAuthority: isAr ? "الجهة المصدرة" : "Source Authority",
    coverage: isAr ? "نطاق التغطية" : "Coverage Area",
    format: isAr ? "صيغة البيانات" : "Format",
    crs: isAr ? "نظام الإحداثيات" : "Coordinate System",
    frequency: isAr ? "تكرار التحديث" : "Update Frequency",
    dataType: isAr ? "نوع البيانات" : "Data Type",
    tags: isAr ? "الوسوم" : "Tags",
    viewInMap: isAr ? "عرض على الخريطة" : "View in Map",
    open: isAr ? "فتح الرابط" : "Open Link",
    close: isAr ? "إغلاق" : "Close",
    hint: isAr ? "اضغط لعرض التفاصيل" : "Click to view details",
  };

  return (
    <section id="layers" className="section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(layers.heading, layers.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(layers.description, layers.description_ar)}
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {previewCards.map((card) => (
            <LayerCardItem key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>

        {layers.cards.length > previewCards.length && (
          <div className="flex justify-center mt-10">
            <Button onClick={() => setOpen(true)} size="lg" className="gap-2">
              {t("common.viewAllLayers")} <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-3 border-b border-border">
            <DialogTitle className="font-display text-2xl">{t("common.allLayers")} ({layers.cards.length})</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto px-6 py-6 max-h-[calc(85vh-80px)]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {layers.cards.map((card) => (
                <LayerCardItem key={card.id} card={card} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Layer details modal — modern glassmorphism GIS dashboard */}
      <Dialog open={!!selectedLayer} onOpenChange={(o) => !o && setSelectedLayer(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[95vh] sm:rounded-3xl border border-border/50 bg-background shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)]">
          {selectedLayer && (
            <div className="flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-300">
              {/* Hero image */}
              <div className="relative w-full aspect-[16/7] bg-muted shrink-0 overflow-hidden">
                <img
                  src={selectedLayer.image}
                  alt={L(selectedLayer.title, selectedLayer.title_ar)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  {(selectedLayer.category || selectedLayer.category_ar) && (
                    <Badge className="mb-3 bg-primary/90 text-white border-0 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                      {L(selectedLayer.category || "", selectedLayer.category_ar)}
                    </Badge>
                  )}
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    {L(selectedLayer.title, selectedLayer.title_ar)}
                  </h3>
                  {selectedLayer.description && (
                    <p className="text-sm md:text-base text-white/80 line-clamp-2 max-w-xl">
                      {L(selectedLayer.description, selectedLayer.description_ar)}
                    </p>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto p-8 space-y-10 custom-scrollbar">
                {/* Dataset Overview */}
                {(selectedLayer.detailedDescription || selectedLayer.detailedDescription_ar) && (
                  <section>
                    <h4 className="flex items-center gap-2.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {labels.overview}
                    </h4>
                    <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                      {L(selectedLayer.detailedDescription || "", selectedLayer.detailedDescription_ar)}
                    </p>
                  </section>
                )}

                {/* Spatial Information Grid */}
                <section>
                  <h4 className="flex items-center gap-2.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {labels.spatial}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: FileType, label: labels.format, value: selectedLayer.dataFormat },
                      { icon: Globe, label: labels.crs, value: selectedLayer.coordinateSystem },
                      { icon: MapPin, label: labels.coverage, value: L(selectedLayer.coverageArea || "", selectedLayer.coverageArea_ar) },
                      { icon: Database, label: labels.dataType, value: L(selectedLayer.dataType || "", selectedLayer.dataType_ar) },
                      { icon: RefreshCw, label: labels.frequency, value: L(selectedLayer.updateFrequency || "", selectedLayer.updateFrequency_ar) },
                      { icon: Calendar, label: labels.lastUpdated, value: selectedLayer.lastUpdated },
                      { icon: Building2, label: labels.sourceAuthority, value: L(selectedLayer.sourceAuthority || selectedLayer.source || "", selectedLayer.sourceAuthority_ar) },
                    ].filter((m) => m.value).map((m, i) => {
                      const Icon = m.icon;
                      return (
                        <div key={i} className="group/item flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
                          <div className="p-2.5 rounded-xl bg-white border border-gray-100 text-primary shadow-sm group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                            <Icon size={16} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">{m.label}</div>
                            <div className="text-sm font-bold text-gray-900 truncate">{m.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Usage & Applications */}
                {(selectedLayer.usageApplications || selectedLayer.usageApplications_ar) && (
                  <section>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                      <Sparkles size={15} className="text-primary" /> {labels.usage}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {L(selectedLayer.usageApplications || "", selectedLayer.usageApplications_ar)}
                    </p>
                  </section>
                )}

                {/* Tags */}
                {((isAr ? selectedLayer.tags_ar : selectedLayer.tags) || []).length > 0 && (
                  <section>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                      <Tag size={13} /> {labels.tags}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? selectedLayer.tags_ar : selectedLayer.tags)!.map((tg, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{tg}</Badge>
                      ))}
                    </div>
                  </section>
                )}

                {/* Related Layers */}
                {(selectedLayer.relatedLayers || []).length > 0 && (
                  <section>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <LayersIcon size={15} className="text-primary" /> {labels.related}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selectedLayer.relatedLayers!.map((relTitle) => {
                        const rel = layers.cards.find((c) => c.title === relTitle);
                        if (!rel) return (
                          <div key={relTitle} className="px-3 py-2 rounded-lg bg-white/50 border border-white/50 text-xs font-medium text-muted-foreground">
                            {relTitle}
                          </div>
                        );
                        return (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => setSelectedLayer(rel)}
                            className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white/60 border border-white/50 hover:border-primary hover:bg-white/80 transition-all text-left"
                          >
                            <img src={rel.image} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                            <span className="text-xs font-medium text-foreground truncate">{L(rel.title, rel.title_ar)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>

              {/* Action footer */}
              <div className="border-t border-white/50 p-4 flex flex-wrap gap-2 justify-end bg-white/60 backdrop-blur-md shrink-0">
                {selectedLayer.link && selectedLayer.link !== "#" && (
                  <Button variant="outline" asChild>
                    <a href={selectedLayer.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink size={16} /> {labels.open}
                    </a>
                  </Button>
                )}
                <Button asChild className="gap-2">
                  <a
                    href={
                      selectedLayer.mapLayerId
                        ? `/map?layer=${encodeURIComponent(selectedLayer.mapLayerId)}`
                        : "/map"
                    }
                  >
                    <MapPin size={16} /> {labels.viewInMap}
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
