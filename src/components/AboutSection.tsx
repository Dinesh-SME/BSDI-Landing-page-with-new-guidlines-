import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import { toArabicDigits, useSectionStyles } from "@/lib/i18n";
import { useEffect, useState, useRef } from "react";
import StatVisualization, { VizStyle } from "./StatVisualization";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

function AnimatedNumber({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const { language } = useUiStore();
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, "")) || 0;
  const isFloat = /\./.test(target);
  const isSecure = target === "Secure";
  const secureLabel = language === "ar" ? "آمن" : "Secure";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const steps = 50;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) { setValue(numericTarget); clearInterval(timer); }
      else { setValue(current); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, numericTarget]);

  const display = isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString();

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-none">
      {isSecure ? secureLabel : (language === "ar" ? toArabicDigits(display) : display)}
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { about } = useContentStore();
  const { language } = useUiStore();
  const L = (en: string, ar?: string) => (language === "ar" && ar ? ar : en);
  const styles = useSectionStyles(about);

  return (
    <section id="about" className="govbh-section section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="max-w-3xl mx-auto text-center"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(about.heading, about.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(about.description1, about.description1_ar)}
          </p>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed" style={styles.description}>
            {L(about.description2, about.description2_ar)}
          </p>
        </div>

      </div>
    </section>
  );
}
