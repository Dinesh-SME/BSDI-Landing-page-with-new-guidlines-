import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend,
} from "recharts";

export type VizStyle =
  | "line_smooth" | "line_sharp"
  | "bar_vertical" | "bar_horizontal" | "bar_stacked"
  | "pie" | "donut"
  | "area" | "gradient_area"
  | "kpi";

export const VIZ_STYLES: { id: VizStyle; label: string }[] = [
  { id: "line_smooth", label: "Line Graph (Smooth)" },
  { id: "line_sharp", label: "Line Graph (Sharp)" },
  { id: "bar_vertical", label: "Bar Chart (Vertical)" },
  { id: "bar_horizontal", label: "Bar Chart (Horizontal)" },
  { id: "bar_stacked", label: "Stacked Bar" },
  { id: "pie", label: "Pie Chart" },
  { id: "donut", label: "Donut Chart" },
  { id: "area", label: "Area Chart" },
  { id: "gradient_area", label: "Gradient Graph" },
  { id: "kpi", label: "Minimal KPI Chart" },
];

// BSDI brand palette
export const BRAND_PALETTE = [
  "#FF3B30", // primary brand red
  "#0B2545", // deep navy
  "#13B5EA", // cyan blue
  "#2EC4B6", // soft teal
  "#F2B441", // gold accent
  "#8AA0B4", // light gray-blue
];

interface Props {
  style: VizStyle;
  data?: number[];
  labels?: string[];
  height?: number;
  colors?: string[];
  useBrandColors?: boolean;
  legendEnabled?: boolean;
  tooltipEnabled?: boolean;
  animationEnabled?: boolean;
}

export default function StatVisualization({
  style,
  data,
  labels,
  height = 80,
  colors,
  useBrandColors = true,
  legendEnabled = false,
  tooltipEnabled = true,
  animationEnabled = true,
}: Props) {
  const values = data && data.length ? data : [12, 18, 15, 22, 28, 26, 34];
  const lbls = labels && labels.length === values.length ? labels : values.map((_, i) => `${i + 1}`);
  const chartData = values.map((v, i) => ({ name: lbls[i], value: v, value2: Math.round(v * 0.65) }));

  const palette =
    colors && colors.length
      ? colors
      : useBrandColors
        ? BRAND_PALETTE
        : ["hsl(var(--primary))", "hsl(var(--primary)/0.7)", "hsl(var(--primary)/0.45)", "hsl(var(--primary)/0.25)"];

  const primary = palette[0];
  const secondary = palette[1] || palette[0];
  const gradId = `vizGrad-${style}-${Math.round(values.reduce((a, b) => a + b, 0))}`;

  if (style === "kpi") {
    const max = Math.max(...values);
    return (
      <div className="flex items-end gap-1 h-full" style={{ height }}>
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all"
            style={{
              height: `${(v / max) * 100}%`,
              minHeight: 4,
              backgroundColor: palette[i % palette.length],
              opacity: 0.85,
            }}
            title={`${lbls[i]}: ${v}`}
          />
        ))}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {(() => {
        switch (style) {
          case "line_smooth":
            return (
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                {tooltipEnabled && <Tooltip cursor={{ stroke: primary, strokeOpacity: 0.2 }} />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Line type="monotone" dataKey="value" stroke={primary} strokeWidth={2.5} dot={false} isAnimationActive={animationEnabled} />
                <Line type="monotone" dataKey="value2" stroke={secondary} strokeWidth={2} strokeDasharray="4 4" dot={false} isAnimationActive={animationEnabled} />
              </LineChart>
            );
          case "line_sharp":
            return (
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                {tooltipEnabled && <Tooltip />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Line type="linear" dataKey="value" stroke={primary} strokeWidth={2.5} dot={{ r: 2, fill: primary }} isAnimationActive={animationEnabled} />
              </LineChart>
            );
          case "bar_vertical":
            return (
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                {tooltipEnabled && <Tooltip cursor={{ fill: primary + "10" }} />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={animationEnabled}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={palette[i % palette.length]} />
                  ))}
                </Bar>
              </BarChart>
            );
          case "bar_horizontal":
            return (
              <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                {tooltipEnabled && <Tooltip cursor={{ fill: primary + "10" }} />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={animationEnabled}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={palette[i % palette.length]} />
                  ))}
                </Bar>
              </BarChart>
            );
          case "bar_stacked":
            return (
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                {tooltipEnabled && <Tooltip />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Bar dataKey="value" stackId="a" fill={primary} isAnimationActive={animationEnabled} />
                <Bar dataKey="value2" stackId="a" fill={secondary} radius={[4, 4, 0, 0]} isAnimationActive={animationEnabled} />
              </BarChart>
            );
          case "pie":
            return (
              <PieChart>
                {tooltipEnabled && <Tooltip />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius="90%" isAnimationActive={animationEnabled}>
                  {chartData.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
                </Pie>
              </PieChart>
            );
          case "donut":
            return (
              <PieChart>
                {tooltipEnabled && <Tooltip />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="90%" paddingAngle={2} isAnimationActive={animationEnabled}>
                  {chartData.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
                </Pie>
              </PieChart>
            );
          case "area":
            return (
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                {tooltipEnabled && <Tooltip />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Area type="monotone" dataKey="value" stroke={primary} fill={primary} fillOpacity={0.25} isAnimationActive={animationEnabled} />
              </AreaChart>
            );
          case "gradient_area":
            return (
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={primary} stopOpacity={0.7} />
                    <stop offset="100%" stopColor={secondary} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                {tooltipEnabled && <Tooltip />}
                {legendEnabled && <Legend wrapperStyle={{ fontSize: 11 }} />}
                <Area type="monotone" dataKey="value" stroke={primary} strokeWidth={2} fill={`url(#${gradId})`} isAnimationActive={animationEnabled} />
              </AreaChart>
            );
          default:
            return <div />;
        }
      })()}
    </ResponsiveContainer>
  );
}
