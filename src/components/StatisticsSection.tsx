import { motion } from "framer-motion";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { useState } from "react";
import { 
  TrendingUp, TrendingDown, ArrowUpRight, 
  Activity, ShieldCheck, Database, Building2, 
  Layers, Users, Globe2, BarChart3, Clock, Sparkles
} from "lucide-react";
import StatVisualization, { VizStyle } from "./StatVisualization";
import { Button } from "./ui/button";

const iconMap: Record<string, any> = {
  Activity, ShieldCheck, Database, Building2, 
  Layers, Users, Globe2, BarChart3, TrendingUp, TrendingDown, Clock, Sparkles
};

export default function StatisticsSection() {
  const { statistics } = useContentStore();
  const L = useLocalized();
  const { language, theme } = useUiStore();
  const isAr = language === "ar";
  const isDark = theme === "dark";
  const [animatedIndices, setAnimatedIndices] = useState<Set<number>>(new Set());

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (!statistics.enabled) return null;

  const triggerAnimation = (idx: number) => {
    if (!animatedIndices.has(idx)) {
      setAnimatedIndices(prev => new Set(prev).add(idx));
    }
  };

  return (
    <section 
      id="statistics" 
      className={`relative py-20 md:py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0a1628]" : "bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] ${
          isDark ? "bg-primary/8" : "bg-primary/5"
        }`} />
        <div className={`absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px] ${
          isDark ? "bg-accent/5" : "bg-accent/3"
        }`} />
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 ${isDark ? "opacity-[0.03]" : "opacity-[0.02]"}`} 
          style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-6 border ${
              isDark 
                ? "bg-primary/10 border-primary/20 text-blue-300" 
                : "bg-primary/5 border-primary/10 text-primary"
            }`}
          >
            <Sparkles size={14} />
            {isAr ? "ذكاء البنية التحتية" : "Infrastructure Intelligence"}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1] tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {L(statistics.heading, statistics.heading_ar)}
          </motion.h2>
          
          {statistics.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {L(statistics.description, statistics.description_ar)}
            </motion.p>
          )}
        </div>

        {/* Dashboard Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {statistics.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon || "Activity"] || Activity;
            const hasAnimated = animatedIndices.has(idx);

            return (
              <motion.div
                key={stat.id}
                variants={item}
                onMouseEnter={() => triggerAnimation(idx)}
                className="group relative h-full"
              >
                {/* Card */}
                <div className={`relative h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-500 ${
                  isDark 
                    ? "bg-[#0d2137]/90 border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:border-primary/20" 
                    : "bg-white border border-gray-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] hover:border-primary/20"
                } group-hover:-translate-y-1.5`}>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isDark ? "ring-1 ring-inset ring-primary/15" : "ring-1 ring-inset ring-primary/10"
                  }`} />

                  {/* Top decorative accent */}
                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-20 translate-x-20 blur-3xl transition-colors duration-500 ${
                    isDark ? "bg-primary/5 group-hover:bg-primary/10" : "bg-primary/3 group-hover:bg-primary/8"
                  }`} />

                  {/* Card Content */}
                  <div className="p-7 pb-5 flex-1 flex flex-col relative z-10">
                    
                    {/* Zone 1: Icon + Trend Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-2xl transition-all duration-500 ${
                        isDark 
                          ? "bg-white/5 text-blue-300 border border-white/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary/50" 
                          : "bg-gray-50 text-gray-700 border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                      }`}>
                        <Icon size={22} />
                      </div>
                      
                      {stat.trend !== undefined && stat.trend > 0 && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          stat.trendDirection === "down" 
                            ? isDark ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-red-50 text-red-600 border border-red-100"
                            : isDark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}>
                          {stat.trendDirection === "down" ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                          {stat.trend}%
                        </div>
                      )}
                    </div>

                    {/* Zone 2: Title */}
                    <h4 className={`font-bold text-lg leading-snug mb-2 tracking-tight ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {L(stat.label, stat.label_ar)}
                    </h4>

                    {/* Zone 3: Description */}
                    {stat.description && (
                      <p className={`text-[13px] leading-relaxed line-clamp-2 mb-5 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}>
                        {L(stat.description, stat.description_ar)}
                      </p>
                    )}

                    {/* Zone 4: Main Metric */}
                    <div className="mb-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-5xl font-display font-bold tracking-tight ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                          {stat.target}
                        </span>
                        <span className={`text-xl font-display font-bold ${
                          isDark ? "text-blue-400" : "text-primary"
                        }`}>{stat.suffix}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className={`text-[10px] uppercase tracking-[0.15em] font-bold ${
                          isDark ? "text-gray-600" : "text-gray-400"
                        }`}>
                          {isAr ? "القيمة المحدثة" : "Live Analytics"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Zone 5: Visualization Area */}
                  {stat.visualizationType !== "none" && (
                    <div className={`px-5 pb-5 pt-3 mt-auto border-t transition-colors duration-500 ${
                      isDark ? "border-white/[0.04] bg-white/[0.02]" : "border-gray-50 bg-gray-50/30"
                    }`}>
                      <div className="h-[140px] w-full flex items-end justify-center overflow-visible">
                        <StatVisualization
                          style={stat.visualizationStyle as VizStyle || "gradient_area"}
                          data={stat.vizData}
                          labels={stat.vizLabels}
                          height={130}
                          useBrandColors={stat.useBrandColors}
                          colors={stat.colors}
                          animationEnabled={hasAnimated}
                          isDark={isDark}
                        />
                      </div>
                    </div>
                  )}

                  {/* Zone 6: Footer Status */}
                  <div className={`px-7 py-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em] border-t ${
                    isDark ? "border-white/[0.04] text-gray-600" : "border-gray-100/60 text-gray-400"
                  }`}>
                    <span>{isAr ? "آخر تحديث: مباشر" : "Last: Real-time"}</span>
                    <span className={`flex items-center gap-1 ${isDark ? "text-blue-400/60" : "text-primary/40"}`}>
                      <BarChart3 size={10} />
                      {isAr ? "BSDI" : "BSDI"}
                    </span>
                  </div>

                  {/* External Link */}
                  {stat.externalLink && (
                    <a
                      href={stat.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`absolute top-5 right-5 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 z-20 ${
                        isDark 
                          ? "bg-white/5 backdrop-blur-md text-gray-400 hover:text-white hover:bg-white/10 border border-white/10" 
                          : "bg-white/80 backdrop-blur-md text-gray-400 hover:text-primary hover:bg-white border border-gray-100 shadow-sm"
                      }`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        {statistics.ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 md:mt-20 flex justify-center"
          >
            <Button
              variant="default"
              size="lg"
              className="group h-14 px-12 rounded-full shadow-2xl shadow-primary/20 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
              onClick={() => window.open(statistics.ctaLink, "_blank")}
            >
              <span className="mr-2">{L(statistics.ctaText || "Detailed Analytics", statistics.ctaText_ar || "تحليلات مفصلة")}</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Decorative Bottom Line */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent to-transparent ${
        isDark ? "via-white/10" : "via-gray-200"
      }`} />
    </section>
  );
}
