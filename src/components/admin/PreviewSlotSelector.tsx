import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sparkles } from "lucide-react";

export type PreviewSlot = null | 1 | 2 | 3;

interface SlotItem {
  id: string;
  title: string;
  previewSlot?: PreviewSlot;
}

interface Props {
  items: SlotItem[];
  currentId: string;
  currentTitle: string;
  value: PreviewSlot;
  onChange: (slot: PreviewSlot, replacedFromId: string | null) => void;
}

export function PreviewSlotSelector({ items, currentId, currentTitle, value, onChange }: Props) {
  const [pendingSlot, setPendingSlot] = useState<PreviewSlot>(null);
  const [conflictCardTitle, setConflictCardTitle] = useState<string>("");
  const [conflictId, setConflictId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (raw: string) => {
    const slot = raw === "none" ? null : (Number(raw) as PreviewSlot);
    if (slot === value) return;
    if (slot !== null) {
      const conflict = items.find((i) => i.id !== currentId && i.previewSlot === slot);
      if (conflict) {
        setPendingSlot(slot);
        setConflictCardTitle(conflict.title);
        setConflictId(conflict.id);
        setOpen(true);
        return;
      }
    }
    onChange(slot, null);
  };

  const confirmReplace = () => {
    onChange(pendingSlot, conflictId);
    setOpen(false);
    setPendingSlot(null);
    setConflictId(null);
  };

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-medium text-foreground">
          <Sparkles size={12} className="text-primary" />
          Preview Slot
        </div>
        <Select value={value === null ? "none" : String(value)} onValueChange={handleSelect}>
          <SelectTrigger className="rounded-xl border-primary/20 bg-card/60 backdrop-blur-sm shadow-sm hover:border-primary/40 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="1">Preview 1</SelectItem>
            <SelectItem value="2">Preview 2</SelectItem>
            <SelectItem value="3">Preview 3</SelectItem>
          </SelectContent>
        </Select>
        {value !== null ? (
          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow-sm">
            <Sparkles size={10} /> Visible on Landing Page
          </span>
        ) : (
          <span className="inline-block mt-1 text-[10px] font-medium text-muted-foreground">
            Available in View All Popup
          </span>
        )}
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Replace Preview Slot?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to replace Preview {pendingSlot} with this card?
              <br />
              <span className="block mt-2 text-xs text-muted-foreground">
                Instead of <span className="font-semibold text-foreground">"{conflictCardTitle}"</span>, we are going to replace this preview with:
                <br />
                <span className="font-semibold text-foreground">"{currentTitle}"</span>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReplace}>Replace</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/** Apply a slot change to a list of items, clearing conflicts. */
export function applySlotChange<T extends { id: string; previewSlot?: PreviewSlot }>(
  items: T[],
  targetId: string,
  newSlot: PreviewSlot,
): T[] {
  return items.map((it) => {
    if (it.id === targetId) return { ...it, previewSlot: newSlot };
    if (newSlot !== null && it.previewSlot === newSlot) return { ...it, previewSlot: null };
    return it;
  });
}
