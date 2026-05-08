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
      className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background Layer — Natural colors, cinematic zoom */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-[-15%] z-0"
      >
        <img 
          src={aboutBg} 
          alt="Bahrain Cityscape" 
          className="w-full h-full object-cover"
        />
        
        {/* Reduced overlays — buildings clearly visible, brand atmosphere maintained */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/60 via-[#0a192f]/40 to-[#0a192f]/65" />
        <div className="absolute inset-0 bg-[#001f3f]/20 mix-blend-multiply" />
      </motion.div>

      {/* Subtle animated grid pattern for depth */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Foreground Content Container */}
      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-6 z-10 relative"
      >
        <div className="max-w-5xl mx-auto">
          
          {/* Glass Container for content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-8 md:p-14 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            {/* Decorative accent line */}
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8 mx-auto md:mx-0" />

            <div className="text-center md:text-left space-y-8">
              {/* Heading */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
                style={styles.heading}
              >
                {L(about.heading, about.heading_ar)}
              </motion.h2>

              {/* Description Paragraphs */}
              <div className="space-y-6 max-w-4xl">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="text-white/90 text-lg md:text-2xl leading-relaxed font-medium"
                  style={styles.description}
                >
                  {L(about.description1, about.description1_ar)}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-white/60 text-base md:text-xl leading-relaxed"
                  style={styles.description}
                >
                  {L(about.description2, about.description2_ar)}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decorative Top/Bottom Borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-10" />
    </section>
  );
}
