import { useMemo, useState } from "react";
import { useContentStore, defaultLayers, type LayerCard } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, Pencil, RotateCcw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";
import { PreviewSlotSelector, applySlotChange, type PreviewSlot } from "../PreviewSlotSelector";

export default function LayersEditor() {
  const { layers, updateLayers } = useContentStore();
  const [draft, setDraft] = useState({ ...layers, cards: [...layers.cards] });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<LayerCard>({ id: "", title: "", title_ar: "", description: "", description_ar: "", image: "", link: "" });
  const [resetOpen, setResetOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const handleSave = () => {
    updateLayers(draft);
    toast({ title: "Layers section updated!" });
  };

  const handleReset = () => {
    const resetData = { ...defaultLayers, cards: [...defaultLayers.cards] };
    setDraft(resetData);
    updateLayers(defaultLayers);
    toast({ title: "Page reset to default successfully" });
  };

  const deleteCard = (id: string) => {
    setDraft({ ...draft, cards: draft.cards.filter((c) => c.id !== id) });
  };

  const openAdd = () => {
    setEditForm({ id: "", title: "", title_ar: "", description: "", description_ar: "", image: "", link: "", detailedDescription: "", detailedDescription_ar: "", category: "", category_ar: "", lastUpdated: "", source: "", tags: [], tags_ar: [], mapLayerId: "" });
    setModalMode("add");
    setEditIndex(-1);
  };

  const openEdit = (i: number) => {
    setEditForm({ ...draft.cards[i] });
    setModalMode("edit");
    setEditIndex(i);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditForm((f) => ({ ...f, image: (ev.target?.result as string) || "" }));
    };
    reader.readAsDataURL(file);
  };

  const saveCard = () => {
    if (modalMode === "add") {
      setDraft({
        ...draft,
        cards: [...draft.cards, { ...editForm, id: `l${Date.now()}` }],
      });
    } else if (editIndex !== null && editIndex >= 0) {
      const updated = [...draft.cards];
      updated[editIndex] = { ...updated[editIndex], ...editForm };
      setDraft({ ...draft, cards: updated });
    }
    setEditIndex(null);
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

      <LayersCardList
        cards={draft.cards}
        onChange={(cards) => setDraft({ ...draft, cards })}
        onEdit={openEdit}
        onAdd={openAdd}
      />

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update Layers Section
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

      {/* Add/Edit Layer Modal */}
      <Dialog open={editIndex !== null} onOpenChange={() => setEditIndex(null)}>
        <DialogContent className="max-w-2xl p-0 gap-0 max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="sticky top-0 z-10 px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
            <DialogTitle className="font-display">
              {modalMode === "add" ? "Add Layer Card" : "Edit Layer Card"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <BilingualField
              label="Title"
              value={editForm.title}
              valueAr={editForm.title_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, title: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, title_ar: v })}
              placeholder="ADDRESSES"
              placeholderAr="العناوين"
            />
            <BilingualField
              label="Description"
              multiline rows={2}
              value={editForm.description}
              valueAr={editForm.description_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, description: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, description_ar: v })}
              placeholder="Short description of this layer"
            />
            <div>
              <Label>Image URL</Label>
              <Input
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="mt-1.5"
                placeholder="https://..."
              />
              <div className="mt-2">
                <Label className="text-xs text-muted-foreground">Or upload an image</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
              </div>
              {editForm.image && (
                <img
                  src={editForm.image}
                  alt="preview"
                  className="mt-3 w-full h-32 object-cover rounded-lg border border-border"
                />
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
            <BilingualField
              label="Detailed Description"
              multiline rows={3}
              value={editForm.detailedDescription || ""}
              valueAr={editForm.detailedDescription_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, detailedDescription: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, detailedDescription_ar: v })}
              placeholder="Full multi-line description shown in the details popup"
            />
            <BilingualField
              label="Category"
              value={editForm.category || ""}
              valueAr={editForm.category_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, category: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, category_ar: v })}
              placeholder="Infrastructure"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Last Updated</Label>
                <Input
                  type="date"
                  value={editForm.lastUpdated || ""}
                  onChange={(e) => setEditForm({ ...editForm, lastUpdated: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Source</Label>
                <Input
                  value={editForm.source || ""}
                  onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                  className="mt-1.5"
                  placeholder="BSDI"
                />
              </div>
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                value={(editForm.tags || []).join(", ")}
                onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                className="mt-1.5"
                placeholder="Address, Location, GIS"
              />
            </div>
            <div>
              <Label>Tags (Arabic, comma separated)</Label>
              <Input
                value={(editForm.tags_ar || []).join("، ")}
                onChange={(e) => setEditForm({ ...editForm, tags_ar: e.target.value.split(/[,،]/).map((t) => t.trim()).filter(Boolean) })}
                className="mt-1.5"
                dir="rtl"
                placeholder="عنوان، موقع، نظم معلومات جغرافية"
              />
            </div>
            <div>
              <Label>Map Layer ID (optional)</Label>
              <Input
                value={editForm.mapLayerId || ""}
                onChange={(e) => setEditForm({ ...editForm, mapLayerId: e.target.value })}
                className="mt-1.5"
                placeholder="addresses_layer"
              />
            </div>

            {/* GIS Metadata */}
            <div className="pt-4 border-t border-border space-y-3">
              <h4 className="font-display text-sm font-semibold text-foreground">GIS Metadata</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Data Format</Label>
                  <Input value={editForm.dataFormat || ""} onChange={(e) => setEditForm({ ...editForm, dataFormat: e.target.value })} className="mt-1.5" placeholder="GeoJSON / Shapefile" />
                </div>
                <div>
                  <Label>Coordinate System</Label>
                  <Input value={editForm.coordinateSystem || ""} onChange={(e) => setEditForm({ ...editForm, coordinateSystem: e.target.value })} className="mt-1.5" placeholder="WGS 84" />
                </div>
              </div>
              <BilingualField
                label="Coverage Area"
                value={editForm.coverageArea || ""}
                valueAr={editForm.coverageArea_ar || ""}
                onChange={(v) => setEditForm({ ...editForm, coverageArea: v })}
                onChangeAr={(v) => setEditForm({ ...editForm, coverageArea_ar: v })}
                placeholder="Kingdom of Bahrain"
              />
              <BilingualField
                label="Update Frequency"
                value={editForm.updateFrequency || ""}
                valueAr={editForm.updateFrequency_ar || ""}
                onChange={(v) => setEditForm({ ...editForm, updateFrequency: v })}
                onChangeAr={(v) => setEditForm({ ...editForm, updateFrequency_ar: v })}
                placeholder="Monthly"
              />
              <BilingualField
                label="Data Type"
                value={editForm.dataType || ""}
                valueAr={editForm.dataType_ar || ""}
                onChange={(v) => setEditForm({ ...editForm, dataType: v })}
                onChangeAr={(v) => setEditForm({ ...editForm, dataType_ar: v })}
                placeholder="Point / Polygon / Line"
              />
              <BilingualField
                label="Source Authority"
                value={editForm.sourceAuthority || ""}
                valueAr={editForm.sourceAuthority_ar || ""}
                onChange={(v) => setEditForm({ ...editForm, sourceAuthority: v })}
                onChangeAr={(v) => setEditForm({ ...editForm, sourceAuthority_ar: v })}
                placeholder="BSDI"
              />
              <BilingualField
                label="Usage & Applications"
                multiline rows={3}
                value={editForm.usageApplications || ""}
                valueAr={editForm.usageApplications_ar || ""}
                onChange={(v) => setEditForm({ ...editForm, usageApplications: v })}
                onChangeAr={(v) => setEditForm({ ...editForm, usageApplications_ar: v })}
                placeholder="Navigation, utility services, planning..."
              />
              <div>
                <Label>Related Layers (comma separated titles)</Label>
                <Input
                  value={(editForm.relatedLayers || []).join(", ")}
                  onChange={(e) => setEditForm({ ...editForm, relatedLayers: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                  className="mt-1.5"
                  placeholder="BUILDINGS, ADMINBOUNDRY"
                />
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 z-10 flex gap-3 px-6 py-4 border-t border-border bg-background/80 backdrop-blur-md">
            <Button
              onClick={saveCard}
              className="flex-1"
              disabled={!editForm.title || !editForm.image}
            >
              {modalMode === "add" ? "Add Card" : "Update Card"}
            </Button>
            <Button variant="outline" onClick={() => setEditIndex(null)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ResetConfirmModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}

interface ListProps {
  cards: LayerCard[];
  onChange: (cards: LayerCard[]) => void;
  onEdit: (i: number) => void;
  onAdd: () => void;
}

function LayersCardList({ cards, onChange, onEdit, onAdd }: ListProps) {
  const assignedCount = useMemo(() => cards.filter((c) => c.previewSlot != null).length, [cards]);
  const handleSlot = (id: string, slot: PreviewSlot) => {
    onChange(applySlotChange(cards, id, slot));
  };
  const deleteCard = (id: string) => onChange(cards.filter((c) => c.id !== id));

  return (
    <div className="neu-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">
          Layer Cards ({cards.length})
        </h3>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Sparkles size={12} className="text-primary" /> Landing slots: {assignedCount}/4
          </span>
          <Button variant="outline" size="sm" className="gap-2" onClick={onAdd}>
            <Plus size={14} /> Add Layer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((card, i) => {
          const slot = (card.previewSlot ?? null) as PreviewSlot;
          const onLanding = slot != null;
          return (
            <div
              key={card.id}
              className={`p-3 rounded-xl border space-y-3 ${onLanding ? "border-primary ring-1 ring-primary/30 bg-card" : "border-border"}`}
            >
              <div className="flex items-center gap-3">
                {card.image && (
                  <div className="relative shrink-0">
                    <img src={card.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    {onLanding && (
                      <span className="absolute -top-1 -left-1 text-[9px] font-semibold px-1 py-0.5 rounded bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow">
                        P{slot}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{card.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{card.link || "No link"}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(i)}
                  className="shrink-0 h-8 w-8 rounded-full"
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteCard(card.id)}
                  className="shrink-0 text-destructive hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <PreviewSlotSelector
                items={cards.map((c) => ({ id: c.id, title: c.title, previewSlot: c.previewSlot ?? null }))}
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
  );
}
