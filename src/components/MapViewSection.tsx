import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

export default function MapViewSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { mapView } = useContentStore();
  const navigate = useNavigate();
  const L = useLocalized();
  const t = useT();
  const styles = useSectionStyles(mapView);

  const handleCta = () => {
    if (mapView.ctaHref?.startsWith("http")) {
      window.open(mapView.ctaHref, "_blank", "noopener,noreferrer");
    } else {
      navigate(mapView.ctaHref || "/map");
    }
  };

  return (
    <section id="map-view" className="section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <MapPin size={13} /> {t("mapView.badge")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(mapView.heading, mapView.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(mapView.description, mapView.description_ar)}
          </p>
        </div>

        <div
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          <div className="clean-card overflow-hidden">
            <div className="card-image aspect-[21/9] !m-0 !rounded-none">
              <img
                src={mapView.previewImage}
                alt="Bahrain map preview"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button onClick={handleCta} size="lg" className="gap-2 btn-glow">
              {L(mapView.ctaLabel, mapView.ctaLabel_ar)} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
