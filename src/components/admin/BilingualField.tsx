import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Side-by-side English (left) + Arabic (right) input pair.
 * Single state owners pass `value`/`valueAr` and `onChange`/`onChangeAr`.
 */
interface BilingualFieldProps {
  label: string;
  value: string;
  valueAr: string;
  onChange: (v: string) => void;
  onChangeAr: (v: string) => void;
  placeholder?: string;
  placeholderAr?: string;
  multiline?: boolean;
  rows?: number;
}

export function BilingualField({
  label, value, valueAr, onChange, onChangeAr,
  placeholder, placeholderAr, multiline, rows = 3,
}: BilingualFieldProps) {
  const Field: any = multiline ? Textarea : Input;
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/70">EN</span>
          <Field
            value={value}
            onChange={(e: any) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={multiline ? rows : undefined}
            className="mt-1"
          />
        </div>
        <div>
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/70">AR · العربية</span>
          <Field
            value={valueAr}
            onChange={(e: any) => onChangeAr(e.target.value)}
            placeholder={placeholderAr || placeholder}
            rows={multiline ? rows : undefined}
            dir="rtl"
            className="mt-1 font-arabic"
            style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}
          />
        </div>
      </div>
    </div>
  );
}

interface BilingualSectionProps {
  title?: string;
  children: ReactNode;
}

export function BilingualBlock({ title, children }: BilingualSectionProps) {
  return (
    <div className="space-y-4">
      {title && <h4 className="text-sm font-semibold text-foreground">{title}</h4>}
      {children}
    </div>
  );
}
