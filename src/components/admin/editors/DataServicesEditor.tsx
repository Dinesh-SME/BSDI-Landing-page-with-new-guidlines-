import { useState } from "react";
import { useContentStore, defaultDataServices } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, ImagePlus, Pencil, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResetConfirmModal from "../ResetConfirmModal";
import ImageCropper from "../ImageCropper";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";

export default function DataServicesEditor() {
  const { dataServices, updateDataServices } = useContentStore();
  const [draft, setDraft] = useState({ ...dataServices, entities: [...dataServices.entities] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newEntity, setNewEntity] = useState({ name: "", logo: "", link: "" });
  const [editModal, setEditModal] = useState(false);
  const [editEntity, setEditEntity] = useState<{ id: string; name: string; logo: string; link: string } | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<"new" | "edit" | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    updateDataServices(draft);
    toast({ title: "Data Services section updated!" });
  };

  const handleReset = () => {
    const resetData = { ...defaultDataServices, entities: [...defaultDataServices.entities] };
    setDraft(resetData);
    updateDataServices(defaultDataServices);
    toast({ title: "Page reset to default successfully" });
  };

  const deleteEntity = (id: string) => {
    setDraft({ ...draft, entities: draft.entities.filter((e) => e.id !== id) });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "new" | "edit") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setCropSrc(result);
      setCropTarget(target);
    };
    reader.readAsDataURL(file);
    // reset so re-uploading same file fires onChange again
    e.target.value = "";
  };

  const handleCropConfirm = (cropped: string) => {
    if (cropTarget === "new") setNewEntity((prev) => ({ ...prev, logo: cropped }));
    else if (cropTarget === "edit" && editEntity) setEditEntity((prev) => prev ? { ...prev, logo: cropped } : prev);
    setCropSrc(null);
    setCropTarget(null);
  };

  const openEdit = (entity: typeof editEntity) => {
    setEditEntity(entity ? { ...entity } : null);
    setEditModal(true);
  };

  const handleEditUpdate = () => {
    if (!editEntity) return;
    setDraft({ ...draft, entities: draft.entities.map((e) => e.id === editEntity.id ? { ...editEntity } : e) });
    setEditModal(false);
    setEditEntity(null);
  };

  return (
    <div className="max-w-5xl space-y-8">
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
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Entity Logos ({draft.entities.length})</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Logo
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {draft.entities.map((entity) => (
            <div key={entity.id} className="relative group neu-card aspect-square flex items-center justify-center p-4">
              <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain" />
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => openEdit(entity)} className="text-primary hover:text-primary h-7 w-7">
                  <Pencil size={14} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteEntity(entity.id)} className="text-destructive hover:text-destructive h-7 w-7">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update Data Services
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset Changes
        </Button>
      </div>

      {/* Add Logo Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Add Logo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Entity Name</Label>
              <Input value={newEntity.name} onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Logo</Label>
              <div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center">
                {newEntity.logo ? (
                  <img src={newEntity.logo} alt="" className="w-20 h-20 mx-auto object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus size={24} />
                    <span className="text-sm">Upload logo</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(e, "new")} className="mt-2 text-sm" />
              </div>
            </div>
            <div>
              <Label>Link URL</Label>
              <Input value={newEntity.link} onChange={(e) => setNewEntity({ ...newEntity, link: e.target.value })} className="mt-1.5" placeholder="https://..." />
            </div>
            <Button className="w-full" disabled={!newEntity.name || !newEntity.logo} onClick={() => {
              setDraft({ ...draft, entities: [...draft.entities, { ...newEntity, id: `d${Date.now()}` }] });
              setNewEntity({ name: "", logo: "", link: "" });
              setModalOpen(false);
            }}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Logo Modal */}
      <Dialog open={editModal} onOpenChange={setEditModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Logo</DialogTitle>
          </DialogHeader>
          {editEntity && (
            <div className="space-y-4">
              <div>
                <Label>Entity Name</Label>
                <Input value={editEntity.name} onChange={(e) => setEditEntity({ ...editEntity, name: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Logo</Label>
                <div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center">
                  <img src={editEntity.logo} alt="" className="w-20 h-20 mx-auto object-contain" />
                  <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(e, "edit")} className="mt-2 text-sm" />
                </div>
              </div>
              <div>
                <Label>Link URL</Label>
                <Input value={editEntity.link} onChange={(e) => setEditEntity({ ...editEntity, link: e.target.value })} className="mt-1.5" placeholder="https://..." />
              </div>
              <Button className="w-full" onClick={handleEditUpdate}>
                Update
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />

      <ImageCropper
        open={!!cropSrc}
        imageSrc={cropSrc || ""}
        aspect={1}
        onClose={() => { setCropSrc(null); setCropTarget(null); }}
        onConfirm={handleCropConfirm}
      />
    </div>
  );
}
