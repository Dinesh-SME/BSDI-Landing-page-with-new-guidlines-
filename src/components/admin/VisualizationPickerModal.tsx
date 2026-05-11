import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import StatVisualization, { VIZ_STYLES, VizStyle, GridPatternBg } from "@/components/StatVisualization";
import type { VisualizationType } from "@/stores/contentStore";

interface Props {
  open: boolean;
  onClose: () => void;
  value: { type: VisualizationType; style?: string };
  onApply: (v: { type: VisualizationType; style?: string }) => void;
}

const STYLE_TO_TYPE: Record<string, VisualizationType> = {
  none:          "none",
  line_smooth:   "graph",
  sparkline:     "graph",
  gradient_area: "graph",
  area:          "graph",
  bell_curve:    "graph",
  bar_vertical:  "bar",
  bar_horizontal:"bar",
  pie:           "chart",
  donut:         "chart",
  semi_donut:    "chart",
  gauge:         "chart",
  progress_ring: "progress",
  radial_bar:    "progress",
  multi_metric:  "multi_metric",
};

// Group labels for the picker UI
const GROUP_ORDER = ["Metric", "Bar", "Line", "Area", "Pie", "Gauge", "Special"];

export default function VisualizationPickerModal({ open, onClose, value, onApply }: Props) {
  const [selected, setSelected] = useState<{ type: VisualizationType; style?: string }>(value);

  const grouped = GROUP_ORDER.map(g => ({
    group: g,
    items: VIZ_STYLES.filter(s => s.group === g),
  })).filter(g => g.items.length > 0);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">Select Visualization Type</DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Choose a chart style for this analytics card. "Empty Metric Card" shows a clean grid-pattern placeholder.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground mb-2 px-1">
                {group}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {items.map((s) => {
                  const isNone = s.id === "none";
                  const isSel = isNone
                    ? selected.type === "none" || selected.style === "none"
                    : selected.style === s.id;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() =>
                        setSelected({ type: STYLE_TO_TYPE[s.id] ?? "none", style: s.id })
                      }
                      className={cn(
                        "relative border-2 rounded-xl p-2.5 bg-card transition-all hover:border-primary/50 text-left group/btn",
                        isSel ? "border-primary ring-2 ring-primary/15 bg-primary/5" : "border-border"
                      )}
                    >
                      {isSel && (
                        <Check size={14} className="absolute top-2 right-2 text-primary z-10" />
                      )}

                      {/* Preview area */}
                      <div className={cn(
                        "h-[72px] rounded-lg overflow-hidden flex items-center justify-center mb-2",
                        isDark(false) ? "bg-muted/40" : "bg-muted/30"
                      )}>
                        {isNone ? (
                          <div className="relative w-full h-full">
                            <GridPatternBg isDark={false} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Grid3X3 size={22} className="text-muted-foreground/50" />
                            </div>
                          </div>
                        ) : (
                          <StatVisualization
                            style={s.id as VizStyle}
                            data={SAMPLE_DATA[s.id] ?? [30, 50, 40, 70, 55, 80, 65]}
                            labels={["A","B","C","D","E","F","G"]}
                            height={68}
                            useBrandColors
                            animationEnabled={false}
                            isDark={false}
                          />
                        )}
                      </div>

                      <p className="text-[11px] font-semibold text-center text-foreground/80 leading-tight">
                        {s.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onApply(selected); onClose(); }}>
            Apply Chart Style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Dummy helper — isDark check (always false in the modal preview)
function isDark(_v: boolean) { return false; }

// Sample preview data per chart type
const SAMPLE_DATA: Record<string, number[]> = {
  bar_vertical:   [30, 55, 40, 70, 60, 85],
  bar_horizontal: [40, 60, 80, 55, 70],
  line_smooth:    [20, 35, 30, 55, 45, 65, 60, 80],
  sparkline:      [10, 20, 15, 30, 22, 40, 35, 50],
  gradient_area:  [25, 40, 35, 58, 50, 72, 65],
  area:           [25, 40, 35, 58, 50, 72, 65],
  donut:          [30, 25, 20, 15, 10],
  pie:            [35, 25, 20, 20],
  semi_donut:     [35, 25, 20, 20],
  gauge:          [72],
  bell_curve:     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  radial_bar:     [60, 80, 45],
  progress_ring:  [72],
};
