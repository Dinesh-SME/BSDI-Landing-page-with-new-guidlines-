import { useState, useEffect } from "react";
import { useContentStore, defaultSuccessStories, SuccessStory } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { 
  Save, Plus, Trash2, Pencil, RotateCcw, 
  Sparkles, ImagePlus, ExternalLink, Quote 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

export default function SuccessStoriesEditor() {
  const { successStories, updateSuccessStories } = useContentStore();
  const [draft, setDraft] = useState({ ...successStories, stories: [...successStories.stories] });
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updateSuccessStories(draft);
    toast({ 
      title: "Success Stories updated", 
      description: "Changes have been successfully saved to the portal." 
    });
  };

  const handleReset = () => {
    setDraft({ ...defaultSuccessStories, stories: [...defaultSuccessStories.stories] });
    updateSuccessStories(defaultSuccessStories);
    toast({ title: "Section reset to default" });
  };

  const deleteStory = (id: string) => {
    setDraft({ ...draft, stories: draft.stories.filter((s) => s.id !== id) });
  };

  const openEdit = (i: number) => { setEditIndex(i); setModalOpen(true); };
  const openAdd = () => { setEditIndex(null); setModalOpen(true); };

  const updateStory = (story: SuccessStory) => {
    if (editIndex !== null) {
      const updated = [...draft.stories];
      updated[editIndex] = story;
      setDraft({ ...draft, stories: updated });
    } else {
      setDraft({ ...draft, stories: [...draft.stories, { ...story, id: `ss${Date.now()}` }] });
    }
    setModalOpen(false);
  };

  return (
    <div className="max-w-5xl space-y-8 pb-12">
      {/* Header Controls */}
      <div className="neu-card p-6 space-y-6 bg-card rounded-2xl border border-border">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={20} />
            <h3 className="font-display text-lg font-semibold text-foreground">General Configuration</h3>
          </div>
          <div className="flex items-center gap-3 px-3 py-1.5 bg-muted/50 rounded-full border border-border">
            <Label htmlFor="ss-enabled" className="text-xs font-semibold uppercase tracking-wider cursor-pointer">
              Section Visibility
            </Label>
            <Switch 
              id="ss-enabled" 
              checked={draft.enabled} 
              onCheckedChange={(v) => setDraft({ ...draft, enabled: v })} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <BilingualField
            label="Main Heading"
            value={draft.heading}
            valueAr={draft.heading_ar || ""}
            onChange={(v) => setDraft({ ...draft, heading: v })}
            onChangeAr={(v) => setDraft({ ...draft, heading_ar: v })}
          />
          
          <SectionStyleControls
            label="Heading Styling"
            styleEn={draft.headingStyle || {}}
            styleAr={draft.headingStyleAr || {}}
            onChangeEn={(s) => setDraft({ ...draft, headingStyle: s })}
            onChangeAr={(s) => setDraft({ ...draft, headingStyleAr: s })}
          />
        </div>
      </div>

      {/* Stories List */}
      <div className="neu-card p-6 space-y-6 bg-card rounded-2xl border border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Quote size={18} className="text-primary" />
              Manage Stories ({draft.stories.length})
            </h3>
            <p className="text-sm text-muted-foreground">The first story in the list will be featured on the portal.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 rounded-full px-4" onClick={openAdd}>
            <Plus size={14} /> Add New Story
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {draft.stories.length === 0 && (
            <div className="py-12 text-center border-2 border-dashed border-border rounded-2xl bg-muted/10">
              <Quote size={40} className="mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No success stories found. Add your first story to get started.</p>
            </div>
          )}
          {draft.stories.map((story, i) => (
            <div 
              key={story.id} 
              className={`flex items-center gap-5 p-4 bg-card rounded-2xl border transition-all group ${
                i === 0 ? "border-primary ring-1 ring-primary/20 shadow-md" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border shrink-0 shadow-inner">
                <img src={story.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                {i === 0 && (
                  <div className="absolute inset-x-0 bottom-0 bg-primary/90 text-[10px] text-white font-bold py-0.5 text-center uppercase tracking-tighter">
                    Featured
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-semibold text-foreground truncate">{story.quote}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{story.subtext}</p>
                <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-primary uppercase tracking-widest">
                  <ExternalLink size={10} />
                  {story.link === "#" ? "No external link" : "Has external link"}
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => openEdit(i)} 
                  className="h-9 w-9 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Pencil size={14} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => deleteStory(story.id)} 
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-4 pt-4">
        <Button onClick={handleSave} className="gap-2 h-12 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" size="lg">
          <Save size={18} /> Update Section
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="gap-2 h-12 px-8 rounded-full text-muted-foreground hover:text-destructive hover:border-destructive transition-all" 
          onClick={() => setResetOpen(true)}
        >
          <RotateCcw size={18} /> Reset to Default
        </Button>
      </div>

      <StoryModal 
        key={editIndex !== null ? `edit-${editIndex}` : "new"}
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initial={editIndex !== null ? draft.stories[editIndex] : undefined}
        onSave={updateStory}
      />

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}

function StoryModal({ open, onClose, initial, onSave }: any) {
  const [data, setData] = useState<SuccessStory>(initial || { 
    id: "", 
    quote: "", 
    quote_ar: "", 
    subtext: "", 
    subtext_ar: "", 
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80", 
    link: "#" 
  });

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setData({ ...data, image: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-8 pb-4 bg-gradient-to-r from-primary/5 to-primary/10">
          <DialogTitle className="text-2xl font-display font-bold">
            {initial ? "Edit Success Story" : "Compose New Story"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Feature significant milestones and achievements of employees and partners.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="flex gap-8">
            {/* Image Preview / Upload */}
            <div className="space-y-3 shrink-0">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Story Visual</Label>
              <div className="relative group w-48 h-64 rounded-2xl overflow-hidden border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center transition-all hover:border-primary/50">
                {data.image ? (
                  <>
                    <img src={data.image} alt="" className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/0 group-hover:bg-black/60 flex flex-col items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100">
                      <ImagePlus size={24} className="text-white mb-2" />
                      <span className="text-white text-xs font-bold">Change Image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} 
                      />
                    </label>
                  </>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer p-4 text-center">
                    <ImagePlus size={32} className="text-muted-foreground mb-3" />
                    <span className="text-xs font-medium text-muted-foreground">Upload story visual (JPG/PNG)</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} 
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-6">
              <BilingualField
                label="Featured Quote"
                multiline
                rows={4}
                value={data.quote}
                valueAr={data.quote_ar}
                onChange={(v) => setData({ ...data, quote: v })}
                onChangeAr={(v) => setData({ ...data, quote_ar: v })}
                placeholder="The large bold blue text..."
              />
              <BilingualField
                label="Summary / Details"
                value={data.subtext}
                valueAr={data.subtext_ar}
                onChange={(v) => setData({ ...data, subtext: v })}
                onChangeAr={(v) => setData({ ...data, subtext_ar: v })}
                placeholder="The smaller black text..."
              />
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">External URL</Label>
                <div className="relative">
                  <Input 
                    value={data.link} 
                    onChange={(e) => setData({ ...data, link: e.target.value })} 
                    className="pl-9 rounded-xl"
                    placeholder="https://..."
                  />
                  <ExternalLink size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-[10px] text-muted-foreground italic">Use # if no external story page exists.</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-6 bg-muted/30 border-t border-border gap-3">
          <Button variant="ghost" onClick={onClose} className="rounded-full px-6">Discard</Button>
          <Button onClick={() => onSave(data)} className="rounded-full px-8 shadow-md">
            {initial ? "Apply Changes" : "Create Story"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
