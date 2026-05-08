import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useSectionStyles } from "@/lib/i18n";
import { Quote, ArrowRight } from "lucide-react";

export default function SuccessStoriesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { successStories } = useContentStore();
  const L = useLocalized();
  const styles = useSectionStyles(successStories);

  if (!successStories.enabled || successStories.stories.length === 0) return null;

  // For now, featured the first story
  const story = successStories.stories[0];

  return (
    <section id="success-stories" className="govbh-section section-padding py-[80px] bg-white overflow-hidden">
      <div ref={ref} className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div 
            className="space-y-8"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground" style={styles.heading}>
                {L(successStories.heading, successStories.heading_ar)}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Quote 
                    size={32} 
                    className="text-muted-foreground/40 shrink-0" 
                    fill="currentColor"
                  />
                  <div className="h-[1px] flex-1 bg-border/60" />
                </div>
                
                <div className="space-y-6">
                  <p className="font-display text-2xl md:text-3xl font-bold text-[#003366] leading-tight">
                    {L(story.quote, story.quote_ar)}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {L(story.subtext, story.subtext_ar)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <a 
                href={story.link} 
                className="inline-flex items-center gap-2 text-[#003366] font-bold text-sm tracking-widest uppercase border-b-2 border-transparent hover:border-[#003366] transition-all pb-1"
              >
                READ STORY <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <div 
            className="relative"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <img 
                src={story.image} 
                alt="Success Story" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
