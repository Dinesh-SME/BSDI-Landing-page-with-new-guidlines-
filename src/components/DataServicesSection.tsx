import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useSectionStyles } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DataServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { dataServices } = useContentStore();
  const L = useLocalized();
  const styles = useSectionStyles(dataServices);

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0); // negative = moves left
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const entities = dataServices.entities ?? [];
  const duplicated = [...entities, ...entities];

  // Measure the width of one set (half of the duplicated track)
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [entities.length]);

  // Continuous animation loop
  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const speed = 40; // px per second

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && halfWidthRef.current > 0) {
        offsetRef.current -= speed * dt;
        // Wrap around in both directions
        if (offsetRef.current <= -halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        } else if (offsetRef.current > 0) {
          offsetRef.current -= halfWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = (dir: "left" | "right") => {
    const step = 240;
    offsetRef.current += dir === "left" ? step : -step;
    if (halfWidthRef.current > 0) {
      if (offsetRef.current <= -halfWidthRef.current) offsetRef.current += halfWidthRef.current;
      else if (offsetRef.current > 0) offsetRef.current -= halfWidthRef.current;
    }
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.5s ease-out";
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      window.setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "";
      }, 520);
    }
  };

  return (
    <section id="contact" className="govbh-section section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-8" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>{L(dataServices.heading, dataServices.heading_ar)}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed" style={styles.description}>{L(dataServices.description, dataServices.description_ar)}</p>
        </div>

        <div className="relative flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 z-10 h-10 w-10 rounded-full bg-card shadow-md border-border hover:bg-accent shrink-0"
            onClick={() => nudge("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            dir="ltr"
            className="overflow-hidden rounded-2xl mx-8 w-full"
            onMouseEnter={() => { pausedRef.current = true; setIsPaused(true); }}
            onMouseLeave={() => { pausedRef.current = false; setIsPaused(false); }}
          >
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform"
              style={{ width: "max-content" }}
            >
              {duplicated.map((entity, i) => {
                const name = L(entity.name, entity.name_ar);
                return (
                  <div
                    key={`${entity.id}-${i}`}
                    title={name}
                    className="logo-card min-w-[200px] h-[150px] flex items-center justify-center p-6 shrink-0 cursor-default"
                  >
                    <img src={entity.logo} alt={name} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 z-10 h-10 w-10 rounded-full bg-card shadow-md border-border hover:bg-accent shrink-0"
            onClick={() => nudge("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
