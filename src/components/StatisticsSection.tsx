import { motion } from "framer-motion";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { useState } from "react";
import {
  ArrowUpRight, Activity, ShieldCheck, Database, Building2,
  Layers, Users, Globe2, BarChart3, Clock, Sparkles, TrendingUp, TrendingDown,
} from "lucide-react";
import StatVisualization, { VizStyle, GridPatternBg } from "./StatVisualization";
import { Button } from "./ui/button";

const iconMap: Record<string, any> = {
  Activity, ShieldCheck, Database, Building2,
  Layers, Users, Globe2, BarChart3, TrendingUp, TrendingDown, Clock, Sparkles,
};

export default function StatisticsSection() {
  const { statistics } = useContentStore();
  const L = useLocalized();
  const { language, theme } = useUiStore();
  const isAr = language === "ar";
  const isDark = theme === "dark";
  const [animatedIdx, setAnimatedIdx] = useState<Set<number>>(new Set());

  if (!statistics.enabled) return null;

  const triggerAnim = (idx: number) =>
    setAnimatedIdx(prev => new Set(prev).add(idx));

  const container = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.36, ease: "easeOut" } },
  };

  return (
    <section
      id="statistics"
      className={`relative py-20 md:py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#080d18]" : "bg-[#f7f8fa]"
      }`}
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className={`absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[180px] ${
          isDark ? "bg-blue-800/20" : "bg-blue-100/60"
        }`} />
        <div className={`absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full blur-[160px] ${
          isDark ? "bg-teal-800/15" : "bg-teal-100/50"
        }`} />
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-[1320px]">

        {/* ── HEADER ── */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.22em] mb-5 border ${
              isDark
                ? "bg-blue-900/30 border-blue-700/30 text-blue-300"
                : "bg-blue-50/70 border-blue-100 text-blue-700"
            }`}
          >
            <Sparkles size={11} />
            {isAr ? "ذكاء البنية التحتية" : "Infrastructure Intelligence"}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className={`text-4xl md:text-[2.75rem] font-display font-bold tracking-tight mb-4 leading-[1.1] ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {L(statistics.heading, statistics.heading_ar)}
          </motion.h2>

          {statistics.description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className={`text-base max-w-xl mx-auto leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {L(statistics.description, statistics.description_ar)}
            </motion.p>
          )}
        </div>

        {/* ── CARDS: 3 col / 2 tablet / 1 mobile ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {statistics.stats.map((stat, idx) => {
            const isEmpty =
              !stat.visualizationType ||
              stat.visualizationType === "none" ||
              !stat.visualizationStyle ||
              stat.visualizationStyle === "none";

            const hasAnimated = animatedIdx.has(idx);

            return (
              <motion.div
                key={stat.id}
                variants={item}
                onMouseEnter={() => triggerAnim(idx)}
                className="group"
              >
                <div
                  className={`
                    relative flex flex-col rounded-[20px] overflow-hidden h-full
                    border transition-all duration-300
                    group-hover:-translate-y-1
                    ${isDark
                      ? "bg-[#0e1724] border-white/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.32)] hover:border-blue-500/25 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                      : "bg-white border-gray-100/80 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)] hover:border-blue-200/70 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)]"
                    }
                  `}
                >

                  {/* ── Top text area ── */}
                  <div className="px-6 pt-6 pb-3">
                    {/* Title */}
                    <h4 className={`font-bold text-[14.5px] leading-snug tracking-tight mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {L(stat.label, stat.label_ar)}
                    </h4>
                    {/* Description */}
                    <p className={`text-[11px] leading-snug line-clamp-2 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}>
                      {L(
                        stat.description || "Curated GIS layers across infrastructure, environment & culture.",
                        stat.description_ar
                      )}
                    </p>
                  </div>

                  {/* ── Metric value ── */}
                  <div className="px-6 pb-3 flex items-baseline gap-1">
                    <span className={`text-[2.5rem] font-display font-bold tracking-tighter leading-none ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {stat.target}
                    </span>
                    <span className={`text-xl font-bold leading-none ${
                      isDark ? "text-blue-400" : "text-[#003366]"
                    }`}>
                      {stat.suffix || "+"}
                    </span>
                  </div>

                  {/* ── Live Analytics pill (for chart cards) ── */}
                  {!isEmpty && (
                    <div className="px-6 pb-3 flex items-center gap-2">
                      <span className="relative flex h-[7px] w-[7px] shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-500" />
                      </span>
                      <span className={`text-[9.5px] font-black uppercase tracking-[0.22em] ${
                        isDark ? "text-gray-600" : "text-gray-400"
                      }`}>
                        {isAr ? "تحليلات مباشرة" : "Live Analytics"}
                      </span>
                    </div>
                  )}

                  {/* ── EMPTY CARD: grid pattern area ── */}
                  {isEmpty ? (
                    <div className={`
                      relative mx-5 mb-5 mt-auto rounded-xl overflow-hidden flex flex-col items-center justify-end
                      border min-h-[120px] pt-4 pb-4
                      ${isDark
                        ? "border-white/[0.05] bg-white/[0.015]"
                        : "border-gray-100 bg-gray-50/50"
                      }
                    `}>
                      <GridPatternBg isDark={isDark} />
                      {/* Live Analytics inside empty area */}
                      <div className="relative z-10 flex items-center gap-1.5 mt-auto">
                        <span className="relative flex h-[6px] w-[6px] shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-emerald-500" />
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-[0.22em] ${
                          isDark ? "text-gray-600" : "text-gray-400"
                        }`}>
                          {isAr ? "تحليلات مباشرة" : "Live Analytics"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* ── CHART AREA ── */
                    <div className={`
                      mt-auto px-3 pb-4 pt-2 border-t
                      ${isDark ? "border-white/[0.04]" : "border-gray-50"}
                    `}>
                      <div className="w-full" style={{ height: 128 }}>
                        <StatVisualization
                          style={(stat.visualizationStyle as VizStyle) || "gradient_area"}
                          data={stat.vizData}
                          labels={stat.vizLabels}
                          height={128}
                          useBrandColors={stat.useBrandColors !== false}
                          colors={stat.colors}
                          animationEnabled={hasAnimated}
                          isDark={isDark}
                        />
                      </div>
                    </div>
                  )}

                  {/* External link badge */}
                  {stat.externalLink && (
                    <a
                      href={stat.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        absolute top-4 right-4 p-2 rounded-lg z-20
                        opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                        transition-all duration-300
                        ${isDark
                          ? "bg-white/5 text-gray-500 hover:text-white border border-white/10"
                          : "bg-gray-50 text-gray-400 hover:text-blue-700 border border-gray-100"
                        }
                      `}
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── CTA ── */}
        {statistics.ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 flex justify-center"
          >
            <Button
              variant="default"
              size="lg"
              className="h-12 px-10 rounded-full font-bold text-xs tracking-[0.16em] uppercase hover:scale-105 transition-transform duration-300"
              onClick={() => window.open(statistics.ctaLink, "_blank")}
            >
              {L(statistics.ctaText || "Detailed Analytics", statistics.ctaText_ar || "تحليلات مفصلة")}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
