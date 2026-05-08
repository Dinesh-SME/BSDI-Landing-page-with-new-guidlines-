import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useSectionStyles } from "@/lib/i18n";

import visionDigitalTransformation from "@/assets/vision-digital-transformation.jpg";
import visionGeospatial from "@/assets/vision-geospatial.jpg";
import visionSmartCities from "@/assets/vision-smart-cities.jpg";
import visionDataGovernance from "@/assets/vision-data-governance.jpg";

const visionImages = [
  visionDigitalTransformation,
  visionGeospatial,
  visionSmartCities,
  visionDataGovernance,
];

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { vision } = useContentStore();
  const L = useLocalized();
  const styles = useSectionStyles(vision);

  return (
    <section id="vision" className="govbh-section section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(vision.heading, vision.heading_ar)}
          </h2>
          <p className="max-w-3xl mx-auto mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(vision.description, vision.description_ar)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {vision.cards.slice(0, 3).map((card, i) => (
            <div
              key={card.id}
              className="govbh-card govbh-card--with-image block"
              style={{
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.12}s forwards` : 'none',
              }}
            >
              <div className="govbh-card__head">
                <div className="govbh-card__head-image">
                  <img
                    src={visionImages[i % visionImages.length]}
                    alt={L(card.title, card.title_ar)}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="govbh-card__head-content">
                  <h3 className="govbh-card__title">
                    <span className="block">{L(card.title, card.title_ar)}</span>
                  </h3>
                  <div className="govbh-card__paragraph">
                    <p>{L(card.description, card.description_ar)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
