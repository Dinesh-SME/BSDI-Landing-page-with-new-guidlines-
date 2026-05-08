import { useState, useEffect, useCallback, useRef } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";
import heroSlide4 from "@/assets/hero-slide-4.png";
import heroSlide5 from "@/assets/hero-slide-5.png";

const DEFAULT_SLIDES = [heroSlide1, heroSlide2, heroSlide3, heroSlide4, heroSlide5];
const SLIDE_DURATION = 5000;
const TRANSITION_DURATION = 1000;

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { hero } = useContentStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slides = hero.heroImages && hero.heroImages.length > 0 ? hero.heroImages : DEFAULT_SLIDES;

  const { language } = useUiStore();
  const title1 = language === "ar" && hero.title1_ar ? hero.title1_ar : hero.title1;
  const title2 = language === "ar" && hero.title2_ar ? hero.title2_ar : hero.title2;
  const subtitle = language === "ar" && hero.subtitle_ar ? hero.subtitle_ar : hero.subtitle;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  return (
    <section 
      ref={ref}
      className="govbh-fullwidthslider bg--brand h-screen w-full relative overflow-hidden"
      role="banner"
    >
      {/* Wrapper for Slider */}
      <div className="govbh-fullwidthslider__wrapper h-full w-full">
        
        {/* Images */}
        {slides.map((src, i) => (
          <div
            key={i}
            className="govbh-fullwidthslider__img absolute inset-0 transition-opacity ease-in-out"
            style={{
              opacity: currentIndex === i ? 1 : 0,
              transitionDuration: `${TRANSITION_DURATION}ms`,
              zIndex: currentIndex === i ? 1 : 0,
            }}
          >
            <img
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 z-[2] bg-black/30" />

        {/* Content Section */}
        <div className={`govbh-fullwidthslider__content theme--dark relative z-10 h-full flex items-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="container mx-auto px-4 md:px-8">
            <div className="row">
              <div className="col-lg-7 xl:col-lg-6">
                <div className="govbh-fullwidthslider__title mb-4">
                  <span className="block">{title1}</span>
                  <span className="block text-white mt-1">{title2}</span>
                </div>
                <div className="max-w-xl">
                  <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Pagination Dots */}
      <div className="govbh-fullwidthslider__swiper-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === i ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}