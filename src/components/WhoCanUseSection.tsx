import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useSectionStyles } from "@/lib/i18n";

import usersGovernment from "@/assets/users-government.jpg";
import usersUrbanPlanning from "@/assets/users-urban-planning.jpg";
import usersInfrastructure from "@/assets/users-infrastructure.jpg";
import usersEnvironment from "@/assets/users-environment.jpg";
import usersTransportation from "@/assets/users-transportation.jpg";
import usersSecurity from "@/assets/users-security.jpg";
import usersDevelopers from "@/assets/users-developers.jpg";
import usersResearch from "@/assets/users-research.jpg";
import visionGeospatial from "@/assets/vision-geospatial.jpg";

const userImages = [
  usersGovernment,
  usersUrbanPlanning,
  usersInfrastructure,
  usersEnvironment,
  usersTransportation,
  usersSecurity,
  usersDevelopers,
  usersResearch,
  visionGeospatial,
];

export default function WhoCanUseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { users } = useContentStore();
  const L = useLocalized();
  const styles = useSectionStyles(users);

  return (
    <section id="who-can-use" className="govbh-section section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(users.heading, users.heading_ar)}
          </h2>
          <p className="max-w-3xl mx-auto mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(users.description, users.description_ar)}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {users.cards.map((user, i) => (
            <div
              key={user.id}
              className="govbh-card govbh-card--with-image block"
              style={{
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.08}s forwards` : 'none',
              }}
            >
              <div className="govbh-card__head">
                <div className="govbh-card__head-image">
                  <img
                    src={userImages[i % userImages.length]}
                    alt={L(user.title, user.title_ar)}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="govbh-card__head-content">
                  <h3 className="govbh-card__title">
                    <span className="block">{L(user.title, user.title_ar)}</span>
                  </h3>
                  <div className="govbh-card__paragraph">
                    <p>{L(user.description, user.description_ar)}</p>
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
