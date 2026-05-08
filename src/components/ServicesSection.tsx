import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";

import serviceAdminConsole from "@/assets/service-admin-console.jpg";
import serviceGeocatalog from "@/assets/service-geocatalog.jpg";
import serviceSmartMap from "@/assets/service-smart-map.jpg";
import serviceGeointelligence from "@/assets/service-geointelligence.jpg";
import serviceDataAnalytics from "@/assets/service-data-analytics.jpg";
import serviceCloud from "@/assets/service-cloud.jpg";
import serviceApi from "@/assets/service-api.jpg";
import serviceDecisionSupport from "@/assets/service-decision-support.jpg";

const serviceImages = [
  serviceAdminConsole,
  serviceGeocatalog,
  serviceSmartMap,
  serviceGeointelligence,
  serviceDataAnalytics,
  serviceCloud,
  serviceApi,
  serviceDecisionSupport,
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { services } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const styles = useSectionStyles(services);

  return (
    <section id="services" className="section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-8" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>{L(services.heading, services.heading_ar)}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed" style={styles.description}>{L(services.description, services.description_ar)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.cards.map((service, i) => {
            const Wrapper = service.link ? 'a' : 'div';
            const wrapperProps = service.link ? { href: service.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={service.id}
                {...wrapperProps as any}
                className={`govbh-card govbh-card--with-image block ${service.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.5s ease-out ${i * 0.08}s forwards` : 'none',
                }}
              >
                <div className="govbh-card__head">
                  <div className="govbh-card__head-image">
                    <img src={service.image || serviceImages[i % serviceImages.length]} alt={L(service.title, service.title_ar)} className="w-full h-full object-cover" loading="lazy" width={1024} height={768} />
                  </div>
                  <div className="govbh-card__head-content">
                    <h3 className="govbh-card__title">
                      <span className="block">{L(service.title, service.title_ar)}</span>
                    </h3>
                    <div className="govbh-card__paragraph">
                      <p>{L(service.description, service.description_ar)}</p>
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
          })}
        </div>
      </div>
    </section>
  );
}
