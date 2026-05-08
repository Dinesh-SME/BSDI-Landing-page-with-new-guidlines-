import { useState } from "react";
import { useContentStore, defaultStatistics, VisualizationType } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Trash2, Pencil, RotateCcw, BarChart3, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";
import { VIZ_STYLES } from "@/components/StatVisualization";
import VisualizationPickerModal from "../VisualizationPickerModal";

interface StatEdit {
  target: string;
  suffix: string;
  label: string;
  label_ar?: string;
  icon?: string;
  description?: string;
  description_ar?: string;
  trend?: number;
  trendDirection?: "up" | "down";
  tooltipText?: string;
  externalLink?: string;
  visualizationType?: VisualizationType;
  visualizationStyle?: string;
  vizDataStr?: string;
  vizLabelsStr?: string;
}

export default function StatisticsEditor() {
  const { statistics, updateStatistics } = useContentStore();
  const [draft, setDraft] = useState({ ...statistics, stats: [...statistics.stats] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newStat, setNewStat] = useState({ target: "", suffix: "", label: "", label_ar: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<StatEdit>({ target: "", suffix: "", label: "", label_ar: "" });
  const [resetOpen, setResetOpen] = useState(false);
  const [vizPickerOpen, setVizPickerOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updateStatistics(draft);
    toast({ title: "Statistics section updated!" });
  };

  const handleReset = () => {
    setDraft({ ...defaultStatistics, stats: [...defaultStatistics.stats] });
    updateStatistics(defaultStatistics);
    toast({ title: "Page reset to default successfully" });
  };

  const deleteStat = (id: string) => {
    setDraft({ ...draft, stats: draft.stats.filter((s) => s.id !== id) });
  };

  const openEdit = (i: number) => {
    const s = draft.stats[i];
    setEditForm({
      target: s.target,
      suffix: s.suffix || "",
      label: s.label,
      label_ar: s.label_ar || "",
      icon: s.icon || "",
      description: s.description || "",
      description_ar: s.description_ar || "",
      trend: s.trend,
      trendDirection: s.trendDirection || "up",
      tooltipText: s.tooltipText || "",
      externalLink: s.externalLink || "",
      visualizationType: s.visualizationType || "none",
      visualizationStyle: s.visualizationStyle,
      vizDataStr: s.vizData ? s.vizData.join(",") : "",
      vizLabelsStr: s.vizLabels ? s.vizLabels.join(",") : "",
    });
    setEditIndex(i);
  };

  const saveEdit = () => {
    if (editIndex === null) return;
    const updated = [...draft.stats];
    const { vizDataStr, vizLabelsStr, ...rest } = editForm;
    const vizData = vizDataStr
      ? vizDataStr.split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n))
      : undefined;
    const vizLabels = vizLabelsStr
      ? vizLabelsStr.split(",").map((s) => s.trim()).filter(Boolean)
      : undefined;
    updated[editIndex] = { ...updated[editIndex], ...rest, vizData, vizLabels };
    setDraft({ ...draft, stats: updated });
    setEditIndex(null);
  };

  return (
    <div className="max-w-5xl space-y-8">
      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Section Status</h3>
          <Switch 
            checked={draft.enabled} 
            onCheckedChange={(v) => setDraft({ ...draft, enabled: v })} 
          />
        </div>
        
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
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <BilingualField
            label="CTA Button Text"
            value={draft.ctaText || ""}
            valueAr={draft.ctaText_ar || ""}
            onChange={(v) => setDraft({ ...draft, ctaText: v })}
            onChangeAr={(v) => setDraft({ ...draft, ctaText_ar: v })}
          />
          <div>
            <Label>CTA Button Link</Label>
            <Input 
              value={draft.ctaLink || ""} 
              onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })}
              className="mt-1.5"
              placeholder="/map or https://..."
            />
          </div>
        </div>
      </div>

      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Statistics Cards ({draft.stats.length})</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Stat Card
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {draft.stats.map((stat, i) => (
            <div key={stat.id} className="relative flex items-center justify-between p-4 border border-border rounded-2xl group bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GripVertical size={16} className="text-muted-foreground cursor-grab" />
                </div>
                <div>
                  <p className="font-bold text-lg">{stat.target}{stat.suffix}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => openEdit(i)} className="h-9 w-9 rounded-full shadow-sm hover:bg-primary/10 transition-colors">
                  <Pencil size={16} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteStat(stat.id)} className="h-9 w-9 text-destructive hover:text-destructive">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Save All Changes
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset to Default
        </Button>
      </div>

      {/* Add Stat Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add Stat Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Value (e.g. 23,202)</Label>
                <Input value={newStat.target} onChange={(e) => setNewStat({ ...newStat, target: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Suffix (e.g. +)</Label>
                <Input value={newStat.suffix} onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <BilingualField
              label="Label"
              value={newStat.label}
              valueAr={newStat.label_ar}
              onChange={(v) => setNewStat({ ...newStat, label: v })}
              onChangeAr={(v) => setNewStat({ ...newStat, label_ar: v })}
            />
            <Button className="w-full" disabled={!newStat.target || !newStat.label} onClick={() => {
              setDraft({ ...draft, stats: [...draft.stats, { ...newStat, id: `s${Date.now()}` }] });
              setNewStat({ target: "", suffix: "", label: "", label_ar: "" });
              setModalOpen(false);
            }}>
              Add Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Stat Modal */}
      <Dialog open={editIndex !== null} onOpenChange={() => setEditIndex(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Statistics Card</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Value</Label>
                <Input value={editForm.target} onChange={(e) => setEditForm({ ...editForm, target: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Suffix</Label>
                <Input value={editForm.suffix} onChange={(e) => setEditForm({ ...editForm, suffix: e.target.value })} className="mt-1.5" />
              </div>
            </div>

            <BilingualField
              label="Title / Label"
              value={editForm.label}
              valueAr={editForm.label_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, label: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, label_ar: v })}
            />

            <BilingualField
              label="Short Description"
              multiline rows={2}
              value={editForm.description || ""}
              valueAr={editForm.description_ar || ""}
              onChange={(v) => setEditForm({ ...editForm, description: v })}
              onChangeAr={(v) => setEditForm({ ...editForm, description_ar: v })}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Icon (Lucide name)</Label>
                <Input 
                  value={editForm.icon || ""} 
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })} 
                  placeholder="Activity, Users, Database..." 
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>Trend %</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    type="number"
                    value={editForm.trend ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, trend: e.target.value === "" ? undefined : parseFloat(e.target.value) })}
                    placeholder="12"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setEditForm({ ...editForm, trendDirection: editForm.trendDirection === "down" ? "up" : "down" })}
                  >
                    {editForm.trendDirection === "down" ? "▼ Down" : "▲ Up"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tooltip Info Text</Label>
                <Input 
                  value={editForm.tooltipText || ""} 
                  onChange={(e) => setEditForm({ ...editForm, tooltipText: e.target.value })} 
                  placeholder="Detailed explanation..." 
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>External Link</Label>
                <Input 
                  value={editForm.externalLink || ""} 
                  onChange={(e) => setEditForm({ ...editForm, externalLink: e.target.value })} 
                  placeholder="https://..." 
                  className="mt-1.5" 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground block mb-4">
                Visualization (Mini Chart)
              </Label>
              <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/30">
                <span className="text-sm text-muted-foreground">
                  Type: {editForm.visualizationStyle ? VIZ_STYLES.find(v => v.id === editForm.visualizationStyle)?.label : "None"}
                </span>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setVizPickerOpen(true)}>
                  <BarChart3 size={14} /> Change Style
                </Button>
              </div>
              
              {editForm.visualizationType !== "none" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label className="text-xs">Data Points (comma separated)</Label>
                    <Input
                      value={editForm.vizDataStr || ""}
                      onChange={(e) => setEditForm({ ...editForm, vizDataStr: e.target.value })}
                      placeholder="10, 45, 30, 80"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 sticky bottom-0 bg-background pb-2">
              <Button onClick={saveEdit} className="flex-1">Update Card Content</Button>
              <Button variant="outline" onClick={() => setEditIndex(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <VisualizationPickerModal
        open={vizPickerOpen}
        onClose={() => setVizPickerOpen(false)}
        value={{ type: editForm.visualizationType || "none", style: editForm.visualizationStyle }}
        onApply={(v) => setEditForm({ ...editForm, visualizationType: v.type, visualizationStyle: v.style })}
      />

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
