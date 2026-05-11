/**
 * StatVisualization — Premium GIS Analytics Chart System
 * BSDI Brand-aligned, theme-aware, enterprise-grade dashboard charts
 */
import { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, RadialBarChart, RadialBar,
} from "recharts";
import { ProgressRing } from "./ProgressRing";
import { motion } from "framer-motion";

// ─── Type System ──────────────────────────────────────────────────────────────

export type VizStyle =
  | "none"
  | "line_smooth"
  | "sparkline"
  | "bar_vertical"
  | "bar_horizontal"
  | "gradient_area"
  | "area"
  | "donut"
  | "pie"
  | "semi_donut"
  | "gauge"
  | "bell_curve"
  | "radial_bar"
  | "progress_ring";

export interface StatVisualizationProps {
  style: VizStyle;
  data?: number[];
  labels?: string[];
  height?: number;
  useBrandColors?: boolean;
  colors?: string[];
  animationEnabled?: boolean;
  isDark?: boolean;
}

export const VIZ_STYLES: { id: VizStyle; label: string; group: string }[] = [
  { id: "none",          label: "Empty Metric Card",       group: "Metric" },
  { id: "bar_vertical",  label: "Vertical Bars",           group: "Bar" },
  { id: "bar_horizontal",label: "Horizontal Bars",         group: "Bar" },
  { id: "line_smooth",   label: "Line Chart",              group: "Line" },
  { id: "sparkline",     label: "Sparkline",               group: "Line" },
  { id: "gradient_area", label: "Area Chart",              group: "Area" },
  { id: "donut",         label: "Donut Chart",             group: "Pie" },
  { id: "semi_donut",    label: "Semi-circle Donut",       group: "Pie" },
  { id: "gauge",         label: "Gauge Meter",             group: "Gauge" },
  { id: "bell_curve",    label: "Bell Curve / Distribution", group: "Special" },
  { id: "radial_bar",    label: "Radial Progress",         group: "Gauge" },
  { id: "progress_ring", label: "Circular Progress",       group: "Gauge" },
];

// ─── BSDI Brand Palette ───────────────────────────────────────────────────────

const BSDI_LIGHT = ["#003366", "#0AA2C0", "#3B9B6F", "#c0392b", "#FF8300", "#7c3aed", "#0369a1"];
const BSDI_DARK  = ["#4d9fff", "#22d3ee", "#34d399", "#f87171", "#fbbf24", "#a78bfa", "#38bdf8"];

// ─── Shared tooltip style ─────────────────────────────────────────────────────

function useTooltipStyle(isDark: boolean) {
  return {
    borderRadius: "10px",
    border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
    boxShadow: isDark ? "0 8px 28px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.07)",
    background: isDark ? "#1e293b" : "#ffffff",
    color: isDark ? "#e2e8f0" : "#111827",
    fontSize: "11px",
    fontWeight: 700,
    padding: "5px 9px",
  };
}

// ─── Grid pattern background (for empty metric cards) ────────────────────────

export function GridPatternBg({ isDark }: { isDark: boolean }) {
  const id = `gp-${isDark ? "d" : "l"}`;
  const stroke = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.065)";
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0L0 0 0 22" fill="none" stroke={stroke} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Bell curve data generator ────────────────────────────────────────────────

function bellCurvePoints(mean = 0, std = 1, n = 80): { x: number; y: number }[] {
  const pts = [];
  const lo = mean - 3.5 * std;
  const hi = mean + 3.5 * std;
  for (let i = 0; i <= n; i++) {
    const x = lo + (i / n) * (hi - lo);
    const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2);
    pts.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(5)) });
  }
  return pts;
}

// ─── Custom Gauge Needle ──────────────────────────────────────────────────────

function GaugeNeedle({ cx, cy, angle, color }: { cx: number; cy: number; angle: number; color: string }) {
  const rad = (angle * Math.PI) / 180;
  const len = 52;
  const tx = cx + len * Math.cos(rad);
  const ty = cy + len * Math.sin(rad);
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill={color} />
      <circle cx={cx} cy={cy} r={3.5} fill="#fff" />
      <line x1={cx} y1={cy} x2={tx} y2={ty} stroke={color} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StatVisualization({
  style,
  data = [],
  labels = [],
  height = 130,
  useBrandColors = true,
  colors,
  animationEnabled = true,
  isDark = false,
}: StatVisualizationProps) {
  const palette = useMemo(
    () => (colors && colors.length > 0 ? colors : useBrandColors ? (isDark ? BSDI_DARK : BSDI_LIGHT) : BSDI_LIGHT),
    [colors, useBrandColors, isDark]
  );

  const tt = useTooltipStyle(isDark);
  const labelFill = isDark ? "#64748b" : "#9ca3af";
  const cursorFill = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.018)";
  const gradId = `ag-${style}-${isDark ? "d" : "l"}`;

  const chartData = useMemo(
    () => data.map((v, i) => ({ name: labels[i] ?? `${i + 1}`, value: v, fill: palette[i % palette.length] })),
    [data, labels, palette]
  );

  // ─── EMPTY / NONE ───────────────────────────────────────────────────────────
  if (style === "none") {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <GridPatternBg isDark={isDark} />
      </div>
    );
  }

  // ─── SPARKLINE ──────────────────────────────────────────────────────────────
  if (style === "sparkline") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 6, right: 6, left: -30, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette[0]} stopOpacity={isDark ? 0.2 : 0.15} />
              <stop offset="100%" stopColor={palette[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip contentStyle={tt} cursor={{ stroke: palette[0], strokeWidth: 1, strokeDasharray: "3 3" }} />
          <Line type="monotone" dataKey="value" stroke={palette[0]} strokeWidth={2}
            dot={false} activeDot={{ r: 4, fill: palette[0], strokeWidth: 0 }}
            isAnimationActive={animationEnabled} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // ─── SMOOTH LINE ────────────────────────────────────────────────────────────
  if (style === "line_smooth") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 14, right: 10, left: -22, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: labelFill }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip contentStyle={tt} cursor={{ stroke: palette[0], strokeWidth: 1, strokeDasharray: "3 3" }} />
          <Line type="monotone" dataKey="value" stroke={palette[0]} strokeWidth={2.5}
            dot={{ r: 3, fill: isDark ? "#1e293b" : "#fff", strokeWidth: 2, stroke: palette[0] }}
            activeDot={{ r: 5, fill: palette[0], strokeWidth: 0 }}
            isAnimationActive={animationEnabled} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // ─── VERTICAL BARS ──────────────────────────────────────────────────────────
  if (style === "bar_vertical") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 14, right: 8, left: -8, bottom: 4 }} barCategoryGap="28%">
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: labelFill }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip cursor={{ fill: cursorFill }} contentStyle={tt} />
          <Bar dataKey="value" radius={[5, 5, 0, 0]} isAnimationActive={animationEnabled} maxBarSize={32}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={palette[0]}
                fillOpacity={chartData.length > 1 ? 0.4 + (i / (chartData.length - 1)) * 0.6 : 1} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // ─── HORIZONTAL BARS ────────────────────────────────────────────────────────
  if (style === "bar_horizontal") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart layout="vertical" data={chartData} margin={{ top: 4, right: 30, left: 4, bottom: 4 }} barCategoryGap="18%">
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: labelFill }} axisLine={false} tickLine={false} width={24} />
          <Tooltip cursor={{ fill: cursorFill }} contentStyle={tt} />
          <Bar dataKey="value" radius={[0, 5, 5, 0]} isAnimationActive={animationEnabled} barSize={13}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={palette[0]}
                fillOpacity={chartData.length > 1 ? 1 - (i / chartData.length) * 0.45 : 0.9} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // ─── GRADIENT AREA / AREA ───────────────────────────────────────────────────
  if (style === "gradient_area" || style === "area") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={{ top: 12, right: 8, left: -24, bottom: 4 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette[0]} stopOpacity={isDark ? 0.4 : 0.35} />
              <stop offset="100%" stopColor={palette[1] ?? palette[0]} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: labelFill }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip contentStyle={tt} />
          <Area type="monotone" dataKey="value" stroke={palette[0]} strokeWidth={2.5}
            fillOpacity={1} fill={`url(#${gradId})`}
            dot={{ r: 2.5, fill: palette[0], strokeWidth: 0 }}
            activeDot={{ r: 5, fill: palette[0], strokeWidth: 0 }}
            isAnimationActive={animationEnabled} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // ─── DONUT ──────────────────────────────────────────────────────────────────
  if (style === "donut" || style === "pie") {
    const cx = "50%";
    const cy = "50%";
    const inner = style === "donut" ? Math.round(height * 0.2) : 0;
    const outer = Math.round(height * 0.36);
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <defs>
            {palette.map((c, i) => (
              <radialGradient key={i} id={`dg${i}-${gradId}`} cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
                <stop offset="0%" stopColor={c} stopOpacity={0.95} />
                <stop offset="100%" stopColor={c} stopOpacity={0.7} />
              </radialGradient>
            ))}
          </defs>
          <Pie data={chartData} cx={cx} cy={cy} innerRadius={inner} outerRadius={outer}
            paddingAngle={style === "donut" ? 3 : 1} dataKey="value"
            isAnimationActive={animationEnabled} stroke="none">
            {chartData.map((_, i) => (
              <Cell key={i} fill={`url(#dg${i % palette.length}-${gradId})`} />
            ))}
          </Pie>
          <Tooltip contentStyle={tt} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // ─── SEMI-CIRCLE DONUT ──────────────────────────────────────────────────────
  if (style === "semi_donut") {
    const inner = Math.round(height * 0.22);
    const outer = Math.round(height * 0.42);
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="80%"
            startAngle={180} endAngle={0}
            innerRadius={inner} outerRadius={outer}
            paddingAngle={2} dataKey="value"
            isAnimationActive={animationEnabled} stroke="none">
            {chartData.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tt} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // ─── GAUGE WITH NEEDLE ──────────────────────────────────────────────────────
  if (style === "gauge") {
    const val   = Math.min(Math.max(data[0] ?? 0, 0), 100);
    const max   = 100;
    const inner = Math.round(height * 0.28);
    const outer = Math.round(height * 0.44);
    // Needle angle: -180° (0%) → 0° (100%)  mapped to SVG coords
    // centre is at (cx=50%, cy=78%)
    const needleAngle = -180 + (val / max) * 180;

    const gaugeData = [
      { name: "Red",    value: 33, fill: isDark ? "#ef4444" : "#dc2626" },
      { name: "Yellow", value: 33, fill: isDark ? "#fbbf24" : "#d97706" },
      { name: "Green",  value: 34, fill: isDark ? "#34d399" : "#059669" },
      { name: "Rest",   value: 100 - Math.min(val, 99.9), fill: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" },
    ];
    const activeGauge = [
      { name: "Progress", value: val, fill: palette[0] },
      { name: "Remaining", value: max - val, fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" },
    ];

    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          {/* Background arc bands */}
          <Pie data={[
            { name: "lo",  value: 33, fill: "#dc2626" },
            { name: "mid", value: 33, fill: "#d97706" },
            { name: "hi",  value: 34, fill: "#059669" },
          ]} cx="50%" cy="78%" startAngle={180} endAngle={0}
            innerRadius={inner - 2} outerRadius={outer + 2}
            paddingAngle={1} dataKey="value" stroke="none" isAnimationActive={false}>
            {[0,1,2].map(i => <Cell key={i} fill={["#dc2626","#d97706","#059669"][i]} fillOpacity={isDark ? 0.25 : 0.2} />)}
          </Pie>
          {/* Active filled arc */}
          <Pie data={activeGauge} cx="50%" cy="78%" startAngle={180} endAngle={0}
            innerRadius={inner} outerRadius={outer}
            paddingAngle={0} dataKey="value" stroke="none"
            isAnimationActive={animationEnabled}>
            {activeGauge.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Pie>
          <Tooltip contentStyle={tt} />
          {/* Needle rendered as a custom label using customized approach */}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // ─── BELL CURVE / DISTRIBUTION ──────────────────────────────────────────────
  if (style === "bell_curve") {
    const mean = data.length > 0 ? data.reduce((a, b) => a + b, 0) / data.length : 0;
    const variance = data.length > 1
      ? data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length
      : 1;
    const std = Math.sqrt(variance) || 1;
    const pts = bellCurvePoints(mean, std, 60).map(p => ({ x: p.x, y: p.y }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={pts} margin={{ top: 12, right: 8, left: -28, bottom: 4 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette[1] ?? palette[0]} stopOpacity={isDark ? 0.55 : 0.45} />
              <stop offset="100%" stopColor={palette[0]} stopOpacity={isDark ? 0.12 : 0.08} />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" hide />
          <YAxis hide />
          <Tooltip contentStyle={tt} formatter={(v: any) => [v?.toFixed(4), "Density"]} />
          <Area type="monotone" dataKey="y"
            stroke={palette[1] ?? palette[0]} strokeWidth={2.5}
            fill={`url(#${gradId})`} fillOpacity={1}
            dot={false} activeDot={{ r: 4, fill: palette[0], strokeWidth: 0 }}
            isAnimationActive={animationEnabled} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // ─── RADIAL BAR ─────────────────────────────────────────────────────────────
  if (style === "radial_bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="22%" outerRadius="88%"
          barSize={9} data={chartData} startAngle={180} endAngle={-180}>
          <RadialBar
            background={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
            dataKey="value" isAnimationActive={animationEnabled} cornerRadius={4}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </RadialBar>
          <Tooltip contentStyle={tt} />
        </RadialBarChart>
      </ResponsiveContainer>
    );
  }

  // ─── PROGRESS RING ──────────────────────────────────────────────────────────
  if (style === "progress_ring") {
    return (
      <div className="flex items-center justify-center w-full" style={{ height }}>
        <ProgressRing value={data[0] ?? 0} size={height - 14} strokeWidth={9}
          color={palette[0]} animationEnabled={animationEnabled} />
      </div>
    );
  }

  return null;
}
