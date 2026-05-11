import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import { useSectionStyles } from "@/lib/i18n";
import aboutBg from "@/assets/about-parallax-bg.png";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { about } = useContentStore();
  const { language } = useUiStore();
  const L = (en: string, ar?: string) => (language === "ar" && ar ? ar : en);
  const styles = useSectionStyles(about);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: background moves slower, slight zoom for cinematic depth
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-[#0a192f]"
    >
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-[-10%] z-0"
      >
        <img 
          src={aboutBg} 
          alt="Bahrain Cityscape" 
          className="w-full h-full object-cover grayscale-[30%] contrast-[1.1]"
        />
        
        {/* Dark Dramatic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/90" />
      </motion.div>

      {/* Foreground Content Container */}
      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-6 z-10 relative text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
            style={styles.heading}
          >
            {L(about.heading, about.heading_ar)}
          </motion.h2>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <p 
              className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-medium"
              style={styles.description}
            >
              {L(about.description1, about.description1_ar)}
            </p>
            {about.description2 && (
              <p 
                className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
                style={styles.description}
              >
                {L(about.description2, about.description2_ar)}
              </p>
            )}
          </motion.div>

          {/* Action Link (Reference Style) */}
          {(about.linkText || about.linkUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8"
            >
              <a 
                href={about.linkUrl || "#"}
                className="group inline-flex items-center gap-3 text-white font-black text-xs md:text-sm uppercase tracking-[0.3em] border-b-2 border-white/30 pb-2 hover:border-white transition-all duration-300"
              >
                {L(about.linkText || "LEARN MORE", about.linkText_ar)}
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Decorative Top/Bottom Borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-10" />
    </section>
  );
}
