import { HeroTextStyle } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bold, Italic } from "lucide-react";

export const FONT_OPTIONS = [
  { label: "Default (Theme)", value: "" },
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Outfit", value: "'Outfit', sans-serif" },
  { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "DM Sans", value: "'DM Sans', sans-serif" },
  { label: "Manrope", value: "'Manrope', sans-serif" },
  { label: "Work Sans", value: "'Work Sans', sans-serif" },
  { label: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif" },
  { label: "Raleway", value: "'Raleway', sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Merriweather", value: "'Merriweather', serif" },
  { label: "Lora", value: "'Lora', serif" },
  { label: "Source Serif 4", value: "'Source Serif 4', serif" },
  { label: "Cairo (Arabic)", value: "'Cairo', sans-serif" },
  { label: "Tajawal (Arabic)", value: "'Tajawal', sans-serif" },
];

interface ControlsProps {
  style: HeroTextStyle;
  onChange: (s: HeroTextStyle) => void;
  defaultColor?: string;
  rtl?: boolean;
}

function StyleControls({ style, onChange, defaultColor = "#1C1C1E", rtl }: ControlsProps) {
  const weightCycle = () => {
    const map: Record<string, string> = { "300": "normal", normal: "bold", bold: "300" };
    onChange({ ...style, fontWeight: map[style.fontWeight || "normal"] || "normal" });
  };
  const weightLabel = style.fontWeight === "300" ? "Light" : style.fontWeight === "bold" ? "Bold" : "Regular";

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-xs">Font Family</Label>
        <Select
          value={style.fontFamily || "__default__"}
          onValueChange={(v) => onChange({ ...style, fontFamily: v === "__default__" ? undefined : v })}
        >
          <SelectTrigger className="mt-1 h-9">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent className="max-h-[260px]">
            {FONT_OPTIONS.map((f) => (
              <SelectItem key={f.label} value={f.value || "__default__"} style={{ fontFamily: f.value || undefined }}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs">Font Size ({style.fontSize || "auto"}px)</Label>
        <Slider
          value={[style.fontSize || 32]}
          min={12} max={96} step={1}
          onValueChange={([v]) => onChange({ ...style, fontSize: v })}
          className="mt-1.5"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button type="button" variant={style.fontWeight === "bold" ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={weightCycle} title={weightLabel}>
          <Bold size={14} />
        </Button>
        <span className="text-xs text-muted-foreground">{weightLabel}</span>
        <Button type="button" variant={style.italic ? "default" : "outline"} size="icon" className="h-8 w-8 ml-1" onClick={() => onChange({ ...style, italic: !style.italic })}>
          <Italic size={14} />
        </Button>
        <span className="text-xs text-muted-foreground">{style.italic ? "Italic" : "Normal"}</span>
      </div>
      <div>
        <Label className="text-xs">Text Color</Label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="color"
            value={style.color || defaultColor}
            onChange={(e) => onChange({ ...style, color: e.target.value })}
            className="h-8 w-8 rounded cursor-pointer border-0"
          />
          <span className="text-xs text-muted-foreground">{style.color || "Default"}</span>
          {style.color && (
            <Button type="button" variant="ghost" size="sm" className="text-xs h-6 ml-auto" onClick={() => onChange({ ...style, color: undefined })}>
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SectionStyleControlsProps {
  label: string;
  styleEn: HeroTextStyle;
  styleAr: HeroTextStyle;
  onChangeEn: (s: HeroTextStyle) => void;
  onChangeAr: (s: HeroTextStyle) => void;
  defaultColor?: string;
}

/**
 * Side-by-side EN / AR text styling controls (font family, size, weight, italic, color).
 * Mirrors the Hero editor's styling block, used across all section editors.
 */
export function SectionStyleControls({
  label, styleEn, styleAr, onChangeEn, onChangeAr, defaultColor,
}: SectionStyleControlsProps) {
  return (
    <div className="p-4 border border-border rounded-xl space-y-4 bg-muted/20">
      <p className="text-sm font-semibold text-foreground">{label} — Styling</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/70">EN</span>
          <StyleControls style={styleEn} onChange={onChangeEn} defaultColor={defaultColor} />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/70">AR · العربية</span>
          <StyleControls style={styleAr} onChange={onChangeAr} defaultColor={defaultColor} rtl />
        </div>
      </div>
    </div>
  );
}

/**
 * Helper: build inline style object from a HeroTextStyle, applied conditionally so
 * default Tailwind styling is preserved when fields are absent.
 */
export function styleToCss(s?: HeroTextStyle): React.CSSProperties {
  if (!s) return {};
  return {
    fontSize: s.fontSize ? `${s.fontSize}px` : undefined,
    fontWeight: s.fontWeight || undefined,
    fontStyle: s.italic ? "italic" : undefined,
    color: s.color || undefined,
    fontFamily: s.fontFamily || undefined,
  };
}
