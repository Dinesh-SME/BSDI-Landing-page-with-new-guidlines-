import { useState, useMemo } from "react";
import { useContentStore, NewsItem, defaultNews } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, ImagePlus, RotateCcw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";
import { PreviewSlotSelector, applySlotChange, type PreviewSlot } from "../PreviewSlotSelector";

export default function NewsEditor() {
  const { news, updateNews } = useContentStore();
  const [draft, setDraft] = useState(news);
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const assignedCount = useMemo(
    () => draft.items.filter((i) => i.previewSlot != null).length,
    [draft.items],
  );

  const updateItem = (id: string, patch: Partial<NewsItem>) => {
    setDraft({ ...draft, items: draft.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) });
  };

  const handleSlotChange = (id: string, slot: PreviewSlot) => {
    setDraft({ ...draft, items: applySlotChange(draft.items, id, slot) });
  };

  const addItem = () => {
    setDraft({
      ...draft,
      items: [
        ...draft.items,
        {
          id: `n${Date.now()}`,
          title: "New article",
          title_ar: "مقال جديد",
          excerpt: "Short summary...",
          excerpt_ar: "ملخص قصير...",
          date: new Date().toLocaleDateString(),
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
          link: "#",
          previewSlot: null,
        },
      ],
    });
  };

  const removeItem = (id: string) => setDraft({ ...draft, items: draft.items.filter((i) => i.id !== id) });

  const handleImage = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => updateItem(id, { image: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateNews(draft);
    toast({ title: "News updated", description: "Changes are now live on the landing page." });
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="neu-card p-6 space-y-4 bg-card rounded-2xl border border-border">
        <h3 className="font-display text-lg font-semibold text-foreground">Section Header</h3>
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

      <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles size={16} className="text-primary" />
          <span className="font-semibold text-foreground">Landing Page Preview Slots</span>
          <span className="text-muted-foreground">— assign cards to Preview 1-3</span>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          Assigned: {assignedCount} / 3
        </span>
      </div>

      <div className="space-y-4">
        {draft.items.map((item) => {
          const slot = (item.previewSlot ?? null) as PreviewSlot;
          const isOnLanding = slot != null;
          return (
            <div
              key={item.id}
              className={`p-5 bg-card rounded-2xl border space-y-3 transition-all ${
                isOnLanding ? "border-primary ring-1 ring-primary/30" : "border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-border shrink-0 group">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center cursor-pointer transition-colors">
                    <ImagePlus size={18} className="text-white opacity-0 group-hover:opacity-100" />
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(item.id, e.target.files[0])} />
                  </label>
                  {isOnLanding && (
                    <span className="absolute top-1 left-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow">
                      Preview {slot}
                    </span>
                  )}
                </div>
                <div className="flex-1 space-y-3 min-w-0">
                  <BilingualField
                    label="Title"
                    value={item.title}
                    valueAr={item.title_ar || ""}
                    onChange={(v) => updateItem(item.id, { title: v })}
                    onChangeAr={(v) => updateItem(item.id, { title_ar: v })}
                    placeholder="Title"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Date (e.g. Apr 22, 2026)</Label>
                      <Input value={item.date} onChange={(e) => updateItem(item.id, { date: e.target.value })} placeholder="Apr 22, 2026" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Link</Label>
                      <Input value={item.link || ""} onChange={(e) => updateItem(item.id, { link: e.target.value })} placeholder="https://..." className="mt-1" />
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <PreviewSlotSelector
                      items={draft.items.map((i) => ({ id: i.id, title: i.title, previewSlot: i.previewSlot ?? null }))}
                      currentId={item.id}
                      currentTitle={item.title}
                      value={slot}
                      onChange={(s) => handleSlotChange(item.id, s)}
                    />
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          );
        })}
        <Button variant="outline" onClick={addItem} className="gap-2">
          <Plus size={16} /> Add News Item
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save size={18} /> Update News Section
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset
        </Button>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={() => { setDraft(defaultNews); updateNews(defaultNews); toast({ title: "News reset to default" }); }} />
    </div>
  );
}
