import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList,
} from "recharts";
import { ProgressRing } from "./ProgressRing";

export type VizStyle = 
  | "line_smooth" 
  | "line_stepped" 
  | "bar_vertical" 
  | "bar_horizontal" 
  | "area" 
  | "gradient_area" 
  | "pie" 
  | "donut" 
  | "progress_ring" 
  | "multi_metric";

interface StatVisualizationProps {
  style: VizStyle;
  data?: number[];
  labels?: string[];
  height?: number;
  useBrandColors?: boolean;
  colors?: string[];
  animationEnabled?: boolean;
  isDark?: boolean;
}

export const VIZ_STYLES: { id: VizStyle; label: string }[] = [
  { id: "line_smooth", label: "Smooth Line Graph" },
  { id: "bar_vertical", label: "Vertical Bar Chart" },
  { id: "bar_horizontal", label: "Horizontal Bar Chart" },
  { id: "gradient_area", label: "Gradient Area Chart" },
  { id: "donut", label: "Donut Chart" },
  { id: "progress_ring", label: "Circular Progress" },
];

const BRAND_COLORS = ["#003366", "#E31B23", "#0AA2C0", "#3B9B6F", "#FF8300"];
const BRAND_COLORS_DARK = ["#4d9fff", "#ff6b72", "#22d3ee", "#34d399", "#fbbf24"];
const LIGHT_COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#6366f1"];

export default function StatVisualization({ 
  style, data = [], labels = [], height = 130, 
  useBrandColors = true, colors, animationEnabled = true, isDark = false
}: StatVisualizationProps) {
  
  const chartData = data.map((val, i) => ({
    name: labels[i] || "",
    value: val,
  }));

  const chartColors = colors && colors.length > 0 
    ? colors 
    : (useBrandColors ? (isDark ? BRAND_COLORS_DARK : BRAND_COLORS) : LIGHT_COLORS);

  const labelFill = isDark ? "#94a3b8" : "#374151";
  const tooltipBg = isDark ? "#1e293b" : "#ffffff";
  const tooltipBorder = isDark ? "#334155" : "#e5e7eb";
  const tooltipText = isDark ? "#e2e8f0" : "#111827";
  const cursorFill = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const gridId = `grad-${style}-${isDark ? "d" : "l"}`;

  const tooltipStyle = {
    borderRadius: '14px',
    border: `1px solid ${tooltipBorder}`,
    boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.08)',
    background: tooltipBg,
    color: tooltipText,
    fontSize: '12px',
    fontWeight: 600,
  };

  const renderChart = () => {
    switch (style) {
      case "line_smooth":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: labelFill }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={chartColors[0]} 
                strokeWidth={2.5} 
                dot={{ r: 3.5, strokeWidth: 2, fill: isDark ? '#1e293b' : '#fff' }}
                activeDot={{ r: 5, strokeWidth: 0, fill: chartColors[0] }}
                isAnimationActive={animationEnabled}
              >
                <LabelList dataKey="value" position="top" offset={8} style={{ fontSize: '9px', fontWeight: 700, fill: labelFill }} />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar_vertical":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData} margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: labelFill }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: cursorFill }} contentStyle={tooltipStyle} />
              <Bar 
                dataKey="value" 
                fill={chartColors[0]} 
                radius={[6, 6, 0, 0]} 
                isAnimationActive={animationEnabled}
                maxBarSize={28}
              >
                <LabelList dataKey="value" position="top" offset={6} style={{ fontSize: '10px', fontWeight: 700, fill: labelFill }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "bar_horizontal":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart layout="vertical" data={chartData} margin={{ top: 0, right: 40, left: 5, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: labelFill }} axisLine={false} tickLine={false} width={30} />
              <Tooltip cursor={{ fill: cursorFill }} contentStyle={tooltipStyle} />
              <Bar 
                dataKey="value" 
                fill={chartColors[0]} 
                radius={[0, 6, 6, 0]} 
                isAnimationActive={animationEnabled}
                barSize={14}
              >
                <LabelList dataKey="value" position="right" offset={8} style={{ fontSize: '10px', fontWeight: 700, fill: labelFill }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "gradient_area":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={chartData} margin={{ top: 15, right: 5, left: -15, bottom: 5 }}>
              <defs>
                <linearGradient id={gridId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors[0]} stopOpacity={isDark ? 0.25 : 0.3}/>
                  <stop offset="95%" stopColor={chartColors[0]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: labelFill }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={chartColors[0]} 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill={`url(#${gridId})`} 
                isAnimationActive={animationEnabled}
              >
                <LabelList dataKey="value" position="top" offset={8} style={{ fontSize: '9px', fontWeight: 700, fill: labelFill }} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        );

      case "donut":
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={style === "donut" ? 32 : 0}
                outerRadius={48}
                paddingAngle={4}
                dataKey="value"
                isAnimationActive={animationEnabled}
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
                <LabelList 
                  dataKey="value" 
                  position="outside" 
                  offset={12}
                  style={{ fontSize: '10px', fontWeight: 700, fill: labelFill }}
                  formatter={(val: any) => `${val}%`}
                />
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        );

      case "progress_ring":
        return (
          <div className="flex items-center justify-center h-full w-full">
            <ProgressRing 
              value={data[0] || 0} 
              size={height} 
              strokeWidth={12}
              color={chartColors[0]}
              animationEnabled={animationEnabled}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full flex items-center justify-center overflow-visible">
      {renderChart()}
    </div>
  );
}
