import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import StatVisualization, { VIZ_STYLES, VizStyle } from "@/components/StatVisualization";
import type { VisualizationType } from "@/stores/contentStore";

interface Props {
  open: boolean;
  onClose: () => void;
  value: { type: VisualizationType; style?: string };
  onApply: (v: { type: VisualizationType; style?: string }) => void;
}

const STYLE_TO_TYPE: Record<string, VisualizationType> = {
  line_smooth: "graph", line_sharp: "graph", gradient_area: "graph", area: "graph",
  bar_vertical: "bar", bar_horizontal: "bar", bar_stacked: "bar", kpi: "bar",
  pie: "chart", donut: "chart",
};

export default function VisualizationPickerModal({ open, onClose, value, onApply }: Props) {
  const [selected, setSelected] = useState<{ type: VisualizationType; style?: string }>(value);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Select Visualization Style</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* None option */}
          <button
            type="button"
            onClick={() => setSelected({ type: "none" })}
            className={cn(
              "relative border-2 rounded-xl p-4 flex flex-col items-center justify-center h-32 bg-card transition-all hover:border-primary/50",
              selected.type === "none" ? "border-primary ring-2 ring-primary/20" : "border-border"
            )}
          >
            {selected.type === "none" && <Check size={16} className="absolute top-2 right-2 text-primary" />}
            <Type size={28} className="text-muted-foreground mb-2" />
            <span className="text-xs font-medium">None (Text Only)</span>
          </button>

          {VIZ_STYLES.map((s) => {
            const isSel = selected.style === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelected({ type: STYLE_TO_TYPE[s.id], style: s.id })}
                className={cn(
                  "relative border-2 rounded-xl p-3 bg-card transition-all hover:border-primary/50 text-left",
                  isSel ? "border-primary ring-2 ring-primary/20" : "border-border"
                )}
              >
                {isSel && <Check size={16} className="absolute top-2 right-2 text-primary" />}
                <div className="h-20 flex items-center justify-center">
                  <StatVisualization style={s.id as VizStyle} height={70} />
                </div>
                <p className="text-[11px] font-medium mt-2 text-center">{s.label}</p>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-border">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onApply(selected); onClose(); }}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
