import { useMemo, useState } from "react";
import { useContentStore, defaultTechnologies, type TechnologyCard } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, Pencil, RotateCcw, Sparkles, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";
import { PreviewSlotSelector, applySlotChange, type PreviewSlot } from "../PreviewSlotSelector";
import ImageCropper from "../ImageCropper";

const emptyCard: TechnologyCard = {
  id: "",
  title: "",
  title_ar: "",
  description: "",
  description_ar: "",
  icon: "",
  category: "",
  category_ar: "",
  tags: [],
  tags_ar: [],
  link: "",
  previewSlot: null,
};

export default function TechnologiesEditor() {
  const { technologies, updateTechnologies } = useContentStore();
  const [draft, setDraft] = useState({ ...technologies, cards: [...technologies.cards] });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<TechnologyCard>(emptyCard);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [resetOpen, setResetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    updateTechnologies(draft);
    toast({ title: "Technologies section updated!" });
  };

  const handleReset = () => {
    const resetData = { ...defaultTechnologies, cards: [...defaultTechnologies.cards] };
    setDraft(resetData);
    updateTechnologies(defaultTechnologies);
    toast({ title: "Technologies reset to default" });
  };

  const openAdd = () => {
    setEditForm({ ...emptyCard });
    setModalMode("add");
    setEditIndex(-1);
  };

  const openEdit = (i: number) => {
    setEditForm({ ...draft.cards[i] });
    setModalMode("edit");
    setEditIndex(i);
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCropSrc((ev.target?.result as string) || null);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const saveCard = () => {
    if (modalMode === "add") {
      setDraft({
        ...draft,
        cards: [...draft.cards, { ...editForm, id: `t${Date.now()}` }],
      });
    } else if (editIndex !== null && editIndex >= 0) {
      const updated = [...draft.cards];
      updated[editIndex] = { ...updated[editIndex], ...editForm };
      setDraft({ ...draft, cards: updated });
    }
    setEditIndex(null);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return draft.cards;
    return draft.cards.filter((c) =>
      [c.title, c.title_ar, c.category, c.category_ar, c.description].filter(Boolean).some((f) => f!.toLowerCase().includes(q)),
    );
  }, [search, draft.cards]);

  const assignedCount = useMemo(() => draft.cards.filter((c) => c.previewSlot != null).length, [draft.cards]);

  const handleSlot = (id: string, slot: PreviewSlot) => {
    setDraft({ ...draft, cards: applySlotChange(draft.cards, id, slot) });
  };

  const deleteCard = (id: string) => {
    setDraft({ ...draft, cards: draft.cards.filter((c) => c.id !== id) });
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Section Header</h3>
        <BilingualField
          label="Heading"
          value={draft.heading}
          valueAr={draft.heading_ar || ""}
          onChange={(v) => setDraft({ ...draft, heading: v })}
          onChangeAr={(v) => setDraft({ ...draft, heading_ar: v })}
        />
        <BilingualField
          label="Description"
          multiline rows={2}
          value={draft.description}
          valueAr={draft.description_ar || ""}
          onChange={(v) => setDraft({ ...draft, description: v })}
          onChangeAr={(v) => setDraft({ ...draft, description_ar: v })}
        />
        <SectionStyleControls
          label="Heading"
          styleEn={draft.headingStyle || {}}
          styleAr={draft.headingStyleAr || {}}
          onChangeEn={(s) => setDraft({ ...draft, headingStyle: s })}
          onChangeAr={(s) => setDraft({ ...draft, headingStyleAr: s })}
        />
        <SectionStyleControls
          label="Description"
          styleEn={draft.descriptionStyle || {}}
          styleAr={draft.descriptionStyleAr || {}}
          onChangeEn={(s) => setDraft({ ...draft, descriptionStyle: s })}
          onChangeAr={(s) => setDraft({ ...draft, descriptionStyleAr: s })}
        />
      </div>

      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-display text-lg font-semibold">Technology Cards ({draft.cards.length})</h3>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Sparkles size={12} className="text-primary" /> Landing slots: {assignedCount}/4
            </span>
            <Button variant="outline" size="sm" className="gap-2" onClick={openAdd}>
              <Plus size={14} /> Add Technology
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search technologies..." className="pl-9" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((card) => {
            const i = draft.cards.findIndex((c) => c.id === card.id);
            const slot = (card.previewSlot ?? null) as PreviewSlot;
            const onLanding = slot != null;
            return (
              <div
                key={card.id}
                className={`p-3 rounded-xl border space-y-3 ${onLanding ? "border-primary ring-1 ring-primary/30 bg-card" : "border-border"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border">
                      {card.icon ? <img src={card.icon} alt="" className="w-full h-full object-cover" /> : <Sparkles size={18} className="text-primary" />}
                    </div>
                    {onLanding && (
                      <span className="absolute -top-1 -left-1 text-[9px] font-semibold px-1 py-0.5 rounded bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow">
                        P{slot}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{card.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{card.category || "—"}</p>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => openEdit(i)} className="shrink-0 h-8 w-8 rounded-full">
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteCard(card.id)} className="shrink-0 text-destructive hover:text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
                <PreviewSlotSelector
                  items={draft.cards.map((c) => ({ id: c.id, title: c.title, previewSlot: c.previewSlot ?? null }))}
                  currentId={card.id}
                  currentTitle={card.title}
                  value={slot}
                  onChange={(s) => handleSlot(card.id, s)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update Technologies Section
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
          onClick={() => setResetOpen(true)}
        >
          <RotateCcw size={18} /> Reset Changes
        </Button>
      </div>

      <Dialog open={editIndex !== null} onOpenChange={() => setEditIndex(null)}>
        <DialogContent className="max-w-2xl p-0 gap-0 max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="sticky top-0 z-10 px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
            <DialogTitle className="font-display">
              {modalMode === "add" ? "Add Technology" : "Edit Technology"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <BilingualField
              label="Title"
              value={editForm.title}
              valueAr={editForm.title_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, title: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, title_ar: v })}
              placeholder="ArcGIS Enterprise"
            />
            <BilingualField
              label="Description"
              multiline rows={2}
              value={editForm.description}
              valueAr={editForm.description_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, description: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, description_ar: v })}
              placeholder="Short description"
            />
            <BilingualField
              label="Category"
              value={editForm.category}
              valueAr={editForm.category_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, category: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, category_ar: v })}
              placeholder="GIS"
            />
            <div>
              <Label>Image URL</Label>
              <Input
                value={editForm.icon}
                onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                className="mt-1.5"
                placeholder="https://..."
              />
              <div className="mt-2">
                <Label className="text-xs text-muted-foreground">Or upload an image (you'll be able to crop it)</Label>
                <Input type="file" accept="image/*" onChange={handleIconUpload} className="mt-1" />
              </div>
              {editForm.icon && (
                <div className="mt-3 w-40 aspect-[4/3] rounded-lg bg-muted border border-border overflow-hidden">
                  <img src={editForm.icon} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <Label>Link (optional)</Label>
              <Input
                value={editForm.link || ""}
                onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                className="mt-1.5"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                value={(editForm.tags || []).join(", ")}
                onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                className="mt-1.5"
                placeholder="Enterprise, GIS"
              />
            </div>
            <div>
              <Label>Tags (Arabic, comma separated)</Label>
              <Input
                value={(editForm.tags_ar || []).join("، ")}
                onChange={(e) => setEditForm({ ...editForm, tags_ar: e.target.value.split(/[,،]/).map((t) => t.trim()).filter(Boolean) })}
                className="mt-1.5"
                dir="rtl"
                placeholder="مؤسسي، نظم معلومات جغرافية"
              />
            </div>
          </div>
          <div className="sticky bottom-0 z-10 flex gap-3 px-6 py-4 border-t border-border bg-background/80 backdrop-blur-md">
            <Button onClick={saveCard} className="flex-1" disabled={!editForm.title}>
              {modalMode === "add" ? "Add Technology" : "Update Technology"}
            </Button>
            <Button variant="outline" onClick={() => setEditIndex(null)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />

      <ImageCropper
        open={!!cropSrc}
        imageSrc={cropSrc || ""}
        aspect={4 / 3}
        onClose={() => setCropSrc(null)}
        onConfirm={(dataUrl) => {
          setEditForm((f) => ({ ...f, icon: dataUrl }));
          setCropSrc(null);
        }}
      />
    </div>
  );
}
