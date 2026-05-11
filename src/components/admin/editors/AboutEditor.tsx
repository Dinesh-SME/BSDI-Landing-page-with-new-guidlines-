import { useState } from "react";
import { useContentStore, defaultAbout } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";

export default function AboutEditor() {
  const { about, updateAbout } = useContentStore();
  const [draft, setDraft] = useState({ ...about });
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updateAbout(draft);
    toast({ title: "About section updated!" });
  };

  const handleReset = () => {
    setDraft({ ...defaultAbout });
    updateAbout(defaultAbout);
    toast({ title: "Page reset to default successfully" });
  };

  return (
    <div className="max-w-5xl space-y-8">
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Section Content</h3>
        <BilingualField
          label="Heading"
          value={draft.heading}
          valueAr={draft.heading_ar || ""}
          onChange={(v) => setDraft({ ...draft, heading: v })}
          onChangeAr={(v) => setDraft({ ...draft, heading_ar: v })}
        />
        <BilingualField
          label="Description (Paragraph 1)"
          multiline rows={3}
          value={draft.description1}
          valueAr={draft.description1_ar || ""}
          onChange={(v) => setDraft({ ...draft, description1: v })}
          onChangeAr={(v) => setDraft({ ...draft, description1_ar: v })}
        />
        <BilingualField
          label="Description (Paragraph 2)"
          multiline rows={3}
          value={draft.description2}
          valueAr={draft.description2_ar || ""}
          onChange={(v) => setDraft({ ...draft, description2: v })}
          onChangeAr={(v) => setDraft({ ...draft, description2_ar: v })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BilingualField
            label="Link Text"
            value={draft.linkText || ""}
            valueAr={draft.linkText_ar || ""}
            onChange={(v) => setDraft({ ...draft, linkText: v })}
            onChangeAr={(v) => setDraft({ ...draft, linkText_ar: v })}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Link URL</label>
            <input 
              type="text" 
              value={draft.linkUrl || ""} 
              onChange={(e) => setDraft({ ...draft, linkUrl: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="#portal"
            />
          </div>
        </div>
        <SectionStyleControls
          label="Heading"
          styleEn={draft.headingStyle || {}}
          styleAr={draft.headingStyleAr || {}}
          onChangeEn={(s) => setDraft({ ...draft, headingStyle: s })}
          onChangeAr={(s) => setDraft({ ...draft, headingStyleAr: s })}
        />
        <SectionStyleControls
          label="Descriptions"
          styleEn={draft.descriptionStyle || {}}
          styleAr={draft.descriptionStyleAr || {}}
          onChangeEn={(s) => setDraft({ ...draft, descriptionStyle: s })}
          onChangeAr={(s) => setDraft({ ...draft, descriptionStyleAr: s })}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update About Section
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset Changes
        </Button>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
