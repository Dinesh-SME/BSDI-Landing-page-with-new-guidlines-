import { useState } from "react";
import { useContentStore, defaultStatistics, VisualizationType } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Trash2, Pencil, RotateCcw, BarChart3, GripVertical, Settings2, Sparkles, Layout, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import StatVisualization, { VIZ_STYLES, VizStyle, GridPatternBg } from "@/components/StatVisualization";
import VisualizationPickerModal from "../VisualizationPickerModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Smartphone, Tablet, Monitor, Moon, Sun } from "lucide-react";
import StatisticsSection from "@/components/StatisticsSection";

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
  useBrandColors?: boolean;
}

export default function StatisticsEditor() {
  const { statistics, updateStatistics } = useContentStore();
  const [draft, setDraft] = useState({ ...statistics, stats: [...statistics.stats] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newStat, setNewStat] = useState({ target: "", suffix: "", label: "", label_ar: "", description: "", description_ar: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<StatEdit>({ target: "", suffix: "", label: "", label_ar: "" });
  const [resetOpen, setResetOpen] = useState(false);
  const [vizPickerOpen, setVizPickerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
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
      useBrandColors: s.useBrandColors ?? true,
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
    <div className="space-y-6 pb-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6 bg-muted/30 p-2 rounded-2xl border border-border/50">
          <TabsList className="bg-background/50 border border-border/50 rounded-xl p-1">
            <TabsTrigger value="editor" className="rounded-lg gap-2 px-6">
              <Settings2 size={16} /> Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="rounded-lg gap-2 px-6">
              <Eye size={16} /> Live Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="editor" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="neu-card p-6 space-y-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings2 className="text-primary" size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight">General Configuration</h3>
              </div>
              <div className="flex items-center gap-3 bg-muted/20 px-4 py-2 rounded-full border border-border/30">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Section Visible</span>
                <Switch 
                  checked={draft.enabled} 
                  onCheckedChange={(v) => setDraft({ ...draft, enabled: v })} 
                />
              </div>
            </div>
            
            <BilingualField
              label="Dashboard Heading"
              value={draft.heading}
              valueAr={draft.heading_ar || ""}
              onChange={(v) => setDraft({ ...draft, heading: v })}
              onChangeAr={(v) => setDraft({ ...draft, heading_ar: v })}
            />
            <BilingualField
              label="Contextual Description"
              multiline rows={2}
              value={draft.description || ""}
              valueAr={draft.description_ar || ""}
              onChange={(v) => setDraft({ ...draft, description: v })}
              onChangeAr={(v) => setDraft({ ...draft, description_ar: v })}
            />
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/30">
              <BilingualField
                label="Call to Action Text"
                value={draft.ctaText || ""}
                valueAr={draft.ctaText_ar || ""}
                onChange={(v) => setDraft({ ...draft, ctaText: v })}
                onChangeAr={(v) => setDraft({ ...draft, ctaText_ar: v })}
              />
              <div>
                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">CTA Destination Link</Label>
                <Input 
                  value={draft.ctaLink || ""} 
                  onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })}
                  className="h-11 bg-background/50 border-border/50"
                  placeholder="/map-view or external URL"
                />
              </div>
            </div>
          </div>

          <div className="neu-card p-6 space-y-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
            <div className="flex items-center justify-between border-b border-border/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="text-primary" size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight">Active Metrics ({draft.stats.length})</h3>
              </div>
              <Button variant="default" size="sm" className="gap-2 shadow-lg shadow-primary/20" onClick={() => setModalOpen(true)}>
                <Plus size={14} /> Add New Widget
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {draft.stats.map((stat, i) => (
                <div key={stat.id} className="relative flex items-center justify-between p-4 border border-border/50 rounded-2xl group bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <GripVertical size={16} className="text-muted-foreground/30 cursor-grab" />
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-bold text-xl text-white">{stat.target}</span>
                        <span className="text-xs font-bold text-primary uppercase">{stat.suffix}</span>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="icon" onClick={() => openEdit(i)} className="h-9 w-9 rounded-xl border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                      <Pencil size={15} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteStat(stat.id)} className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="animate-in fade-in zoom-in-95 duration-500 bg-card border border-border/50 rounded-3xl p-8 shadow-xl mt-6 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/30 pb-6">
              <div>
                <h3 className="text-2xl font-display font-bold tracking-tight">Live Preview</h3>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Unsaved changes preview · Click "Update" to publish</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Active Preview</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-muted/10 p-4 rounded-2xl border border-border/30">
              <div className="flex items-center gap-2">
                <Button 
                  variant={previewMode === "desktop" ? "default" : "outline"} 
                  size="icon" 
                  onClick={() => setPreviewMode("desktop")}
                  className="rounded-xl"
                >
                  <Monitor size={18} />
                </Button>
                <Button 
                  variant={previewMode === "tablet" ? "default" : "outline"} 
                  size="icon" 
                  onClick={() => setPreviewMode("tablet")}
                  className="rounded-xl"
                >
                  <Tablet size={18} />
                </Button>
                <Button 
                  variant={previewMode === "mobile" ? "default" : "outline"} 
                  size="icon" 
                  onClick={() => setPreviewMode("mobile")}
                  className="rounded-xl"
                >
                  <Smartphone size={18} />
                </Button>
              </div>

              <div className="flex items-center gap-3 bg-background/50 p-1 rounded-xl border border-border/30">
                <Button 
                  variant={previewTheme === "light" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setPreviewTheme("light")}
                  className="rounded-lg gap-2"
                >
                  <Sun size={14} /> Light
                </Button>
                <Button 
                  variant={previewTheme === "dark" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setPreviewTheme("dark")}
                  className="rounded-lg gap-2"
                >
                  <Moon size={14} /> Dark
                </Button>
              </div>
            </div>

            <div className={`mx-auto overflow-hidden rounded-3xl border border-border/50 shadow-2xl transition-all duration-500 ${
              previewMode === "desktop" ? "w-full" : 
              previewMode === "tablet" ? "w-[768px]" : "w-[375px]"
            } ${previewTheme === "dark" ? "dark bg-[#001f3f]" : "bg-white"}`}>
              <div className={previewTheme === "dark" ? "govbh-darkmode" : ""}>
                <StatisticsSection />
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-muted-foreground p-6 bg-muted/10 rounded-2xl border border-dashed border-border/50">
              <Info size={16} />
              <p className="text-xs font-medium italic">Previewing active deployed content. Save edits to see updates reflected here.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Stat Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl tracking-tight">Initialize New Metric Widget</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pt-4">
            {/* Live Preview Card */}
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/30 flex flex-col gap-1.5 shadow-inner">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground/60 mb-2">Live Initialization Preview</span>
              <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-sm">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-display font-bold text-primary">{newStat.target || "0"}</span>
                  <span className="text-lg font-bold text-primary/60">{newStat.suffix || "+"}</span>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{newStat.label || "New Metric Label"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Value</Label>
                <Input value={newStat.target} onChange={(e) => setNewStat({ ...newStat, target: e.target.value })} className="h-11 font-display font-bold text-lg" placeholder="e.g. 50" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Suffix</Label>
                <Input value={newStat.suffix} onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })} className="h-11 font-display font-bold text-lg text-primary" placeholder="e.g. %" />
              </div>
            </div>
            <BilingualField
              label="Widget Display Label"
              value={newStat.label}
              valueAr={newStat.label_ar}
              onChange={(v) => setNewStat({ ...newStat, label: v })}
              onChangeAr={(v) => setNewStat({ ...newStat, label_ar: v })}
            />
            <BilingualField
              label="Brief Description"
              value={newStat.description}
              valueAr={newStat.description_ar}
              onChange={(v) => setNewStat({ ...newStat, description: v })}
              onChangeAr={(v) => setNewStat({ ...newStat, description_ar: v })}
            />
            <Button className="w-full h-12 mt-2 font-bold uppercase tracking-widest text-xs" disabled={!newStat.target || !newStat.label} onClick={() => {
              setDraft({ ...draft, stats: [...draft.stats, { ...newStat, id: `s${Date.now()}`, visualizationType: "none" }] });
              setNewStat({ target: "", suffix: "", label: "", label_ar: "", description: "", description_ar: "" });
              setModalOpen(false);
            }}>
              Proceed to Full Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Stat Modal */}
      <Dialog open={editIndex !== null} onOpenChange={() => setEditIndex(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 rounded-3xl">
          <div className="p-8 space-y-8">
            <DialogHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-6 mb-2">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                  <Layout className="text-white" size={24} />
                </div>
                <div>
                  <DialogTitle className="font-display text-2xl font-bold tracking-tight">Widget Configuration</DialogTitle>
                  <p className="text-xs text-muted-foreground font-medium mt-1">Refine metrics, visuals, and descriptions for {editForm.label}</p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Data & Labels */}
              <div className="space-y-6">
                <div className="bg-muted/10 p-6 rounded-2xl border border-border/30 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Primary Metric Value</Label>
                      <Input value={editForm.target} onChange={(e) => setEditForm({ ...editForm, target: e.target.value })} className="h-12 text-xl font-display font-bold bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Suffix / Unit</Label>
                      <Input value={editForm.suffix} onChange={(e) => setEditForm({ ...editForm, suffix: e.target.value })} className="h-12 text-xl font-display font-bold text-primary bg-background/50" />
                    </div>
                  </div>

                  <BilingualField
                    label="Display Label"
                    value={editForm.label}
                    valueAr={editForm.label_ar || ""}
                    onChange={(v) => setEditForm({ ...editForm, label: v })}
                    onChangeAr={(v) => setEditForm({ ...editForm, label_ar: v })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lucide Icon Reference</Label>
                    <div className="relative">
                      <Input 
                        value={editForm.icon || ""} 
                        onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })} 
                        placeholder="Activity, Users..." 
                        className="h-11 pl-10 bg-background/50" 
                      />
                      <Sparkles className="absolute left-3 top-3.5 text-primary/40" size={16} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Growth Trend %</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={editForm.trend ?? ""}
                        onChange={(e) => setEditForm({ ...editForm, trend: e.target.value === "" ? undefined : parseFloat(e.target.value) })}
                        placeholder="12"
                        className="h-11 bg-background/50 font-bold"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-11 w-11 rounded-xl transition-all ${editForm.trendDirection === "down" ? "bg-red-50 text-red-500 border-red-200" : "bg-emerald-50 text-emerald-500 border-emerald-200"}`}
                        onClick={() => setEditForm({ ...editForm, trendDirection: editForm.trendDirection === "down" ? "up" : "down" })}
                      >
                        {editForm.trendDirection === "down" ? "▼" : "▲"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Descriptions & Links */}
              <div className="space-y-6">
                <BilingualField
                  label="Expanded Hover Context (Optional)"
                  multiline rows={3}
                  value={editForm.description || ""}
                  valueAr={editForm.description_ar || ""}
                  onChange={(v) => setEditForm({ ...editForm, description: v })}
                  onChangeAr={(v) => setEditForm({ ...editForm, description_ar: v })}
                />

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">External Data Source (URL)</Label>
                  <Input 
                    value={editForm.externalLink || ""} 
                    onChange={(e) => setEditForm({ ...editForm, externalLink: e.target.value })} 
                    placeholder="https://bsdi.gov.bh/portal/analytics" 
                    className="h-11 bg-background/50 border-border/50" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="text-primary" size={18} />
                  </div>
                  <Label className="text-sm font-bold uppercase tracking-widest text-foreground">Visualization Engine</Label>
                </div>
                <div className="flex items-center gap-3 bg-muted/20 px-4 py-1.5 rounded-full border border-border/30">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Brand Palette</span>
                  <Switch 
                    checked={editForm.useBrandColors} 
                    onCheckedChange={(v) => setEditForm({ ...editForm, useBrandColors: v })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/5 p-6 rounded-2xl border border-border/30">
                <div className="flex flex-col gap-3">
                  <div className="relative p-4 border border-dashed border-primary/30 rounded-2xl bg-white/5 flex flex-col items-start justify-start text-left gap-1.5 h-40 overflow-hidden">
                    <div className="relative z-10 w-full border-b border-primary/10 pb-2 mb-2">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Active Template</span>
                      <p className="text-xs font-bold text-primary truncate max-w-full">
                        {editForm.visualizationStyle ? VIZ_STYLES.find(v => v.id === editForm.visualizationStyle)?.label : "NO VISUALIZATION"}
                      </p>
                    </div>

                    {editForm.visualizationStyle && editForm.visualizationStyle !== "none" ? (
                      <div className="w-full flex-1 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
                        <StatVisualization 
                          style={editForm.visualizationStyle as VizStyle}
                          data={editForm.vizDataStr ? editForm.vizDataStr.split(",").map(v => parseFloat(v.trim())).filter(n => !isNaN(n)) : [30, 50, 40, 70, 55, 80]}
                          labels={editForm.vizLabelsStr ? editForm.vizLabelsStr.split(",").map(v => v.trim()).filter(Boolean) : ["A","B","C","D","E","F"]}
                          height={80}
                          useBrandColors={editForm.useBrandColors}
                          animationEnabled={false}
                        />
                      </div>
                    ) : editForm.visualizationStyle === "none" ? (
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <GridPatternBg isDark={false} />
                      </div>
                    ) : null}
                  </div>
                  <Button variant="secondary" size="sm" className="w-full h-10 font-bold text-[10px] uppercase tracking-widest border border-border/50 shadow-sm" onClick={() => setVizPickerOpen(true)}>
                    Change Chart Style
                  </Button>
                </div>

                <div className="md:col-span-2 space-y-5">
                  {editForm.visualizationType !== "none" ? (
                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                          <span>Data Stream (CSV Values)</span>
                          <span className="text-[9px] font-medium opacity-50 lowercase tracking-normal italic">Numbers only, separated by commas</span>
                        </Label>
                        <Input
                          value={editForm.vizDataStr || ""}
                          onChange={(e) => setEditForm({ ...editForm, vizDataStr: e.target.value })}
                          placeholder="22, 28, 31, 35, 40, 45, 50"
                          className="h-11 font-mono text-sm bg-background/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                          <span>Timeline Labels (Optional)</span>
                          <span className="text-[9px] font-medium opacity-50 lowercase tracking-normal italic">Matches count of data points</span>
                        </Label>
                        <Input
                          value={editForm.vizLabelsStr || ""}
                          onChange={(e) => setEditForm({ ...editForm, vizLabelsStr: e.target.value })}
                          placeholder="Jan, Feb, Mar, Apr, May, Jun"
                          className="h-11 font-mono text-sm bg-background/50 border-border/50"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center border border-dashed border-border/50 rounded-2xl bg-muted/5">
                      <p className="text-xs text-muted-foreground italic">Select a visualization style to enable data entry</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border/30">
              <Button onClick={saveEdit} className="flex-1 h-12 shadow-xl shadow-primary/20 font-bold uppercase tracking-widest text-[11px]">Save Widget Configuration</Button>
              <Button variant="ghost" onClick={() => setEditIndex(null)} className="h-12 px-8 font-bold uppercase tracking-widest text-[11px] text-muted-foreground hover:bg-muted/20">Cancel Edits</Button>
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

      <div className="flex items-center gap-4 pt-6 mt-8 border-t border-border/30">
        <Button onClick={handleSave} size="lg" className="gap-2 px-8 font-bold uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20">
          <Save size={18} /> Update Statistics Section
        </Button>
        <Button variant="outline" size="lg" className="gap-2 px-8 font-bold uppercase tracking-widest text-[11px] text-muted-foreground hover:text-destructive hover:border-destructive" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset Defaults
        </Button>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
