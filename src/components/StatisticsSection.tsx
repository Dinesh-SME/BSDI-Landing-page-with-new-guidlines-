import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import { toArabicDigits, useSectionStyles } from "@/lib/i18n";
import { useEffect, useState, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, ArrowDownRight, Sparkles, Info, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div ref={ref} className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
      {isSecure ? secureLabel : (language === "ar" ? toArabicDigits(display) : display)}
      <span className="text-primary-foreground/80">{suffix}</span>
    </div>
  );
}

export default function StatisticsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { statistics } = useContentStore();
  const { language } = useUiStore();
  const L = (en: string, ar?: string) => (language === "ar" && ar ? ar : en);
  const styles = useSectionStyles(statistics);

  if (!statistics.enabled) return null;

  return (
    <section 
      id="statistics" 
      className="relative overflow-hidden py-20 md:py-28 bg-[#001533]"
      style={{
        background: `linear-gradient(135deg, #001533 0%, #00091a 100%)`,
      }}
    >
      {/* Background Curved Lines Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          {[...Array(15)].map((_, i) => (
            <path
              key={i}
              d={`M-200,${100 + i * 30} C400,${400 + i * 10} 1000,${-100 + i * 20} 1640,${300 + i * 40}`}
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s`, animationDuration: '4s' }}
            />
          ))}
        </svg>
      </div>

      {/* Subtle Bottom-Right Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div ref={ref} className="container relative mx-auto z-10 px-6">
        {/* Header Row */}
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white" style={styles.heading}>
              {L(statistics.heading, statistics.heading_ar)}
            </h2>
            {statistics.description && (
              <p className="text-white/60 text-lg mt-2" style={styles.description}>
                {L(statistics.description, statistics.description_ar)}
              </p>
            )}
          </div>
          
          <a 
            href="https://www.data.gov.bh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm tracking-widest uppercase border-b border-transparent hover:border-white/20 pb-1 transition-all"
          >
            {L("Bahrain Open Data Portal", "بوابة البيانات المفتوحة")}
            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
          {statistics.stats.slice(0, 3).map((stat, idx) => {
            const IconCmp = stat.icon ? (LucideIcons as any)[stat.icon] : null;
            const Icon = IconCmp || Sparkles;

            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center group"
                style={{ 
                  opacity: isVisible ? 1 : 0, 
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${0.2 + idx * 0.1}s forwards` : 'none' 
                }}
              >
                {/* Icon */}
                <div className="text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={72} strokeWidth={1} />
                </div>

                {/* Value */}
                <div className="mb-4">
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="flex items-center justify-center gap-2 text-white/70">
                  <span className="text-sm md:text-base font-medium leading-tight max-w-[200px]">
                    {L(stat.label, stat.label_ar)}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-white/30 hover:text-white/60 transition-colors">
                          <Info size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#001533] border-white/10 text-white">
                        <p className="max-w-xs">{L(stat.description || "Source: BSDI", stat.description_ar)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div 
          className="mt-20 text-center"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? `fadeBlurUp 0.6s ease-out 0.6s forwards` : 'none' }}
        >
          <a 
            href={statistics.ctaLink || "#"}
            className="inline-flex items-center gap-3 px-10 py-3.5 rounded-md border border-white/30 text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-[#001533] transition-all group active:scale-95 shadow-lg"
          >
            {L("View More Statistics", "عرض المزيد من الإحصائيات")}
            <LucideIcons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
