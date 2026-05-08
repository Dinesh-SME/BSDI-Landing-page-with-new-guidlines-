import { useState } from "react";
import { useContentStore, defaultUsers } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2, Pencil, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CardEditorModal from "./CardEditorModal";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";

export default function UsersEditor() {
  const { users, updateUsers } = useContentStore();
  const [draft, setDraft] = useState({ ...users, cards: [...users.cards] });
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updateUsers(draft);
    toast({ title: "Users section updated!" });
  };

  const handleReset = () => {
    const resetData = { ...defaultUsers, cards: [...defaultUsers.cards] };
    setDraft(resetData);
    updateUsers(defaultUsers);
    toast({ title: "Page reset to default successfully" });
  };

  const deleteCard = (id: string) => {
    setDraft({ ...draft, cards: draft.cards.filter((c) => c.id !== id) });
  };

  const openEdit = (i: number) => { setEditIndex(i); setModalOpen(true); };
  const openAdd = () => { setEditIndex(null); setModalOpen(true); };

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
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">User Cards ({draft.cards.length})</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={openAdd}>
            <Plus size={14} /> Add New Card
          </Button>
        </div>

        <div className="space-y-3">
          {draft.cards.map((card, i) => (
            <div key={card.id} className="flex items-center gap-4 p-3 border border-border rounded-xl">
              {card.image && <img src={card.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{card.title}</p>
                <p className="text-xs text-muted-foreground truncate">{card.description}</p>
              </div>
              <Button variant="outline" size="icon" onClick={() => openEdit(i)} className="shrink-0 h-8 w-8 rounded-full shadow-sm hover:scale-110 transition-transform">
                <Pencil size={14} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteCard(card.id)} className="shrink-0 text-destructive hover:text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update Users Section
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset Changes
        </Button>
      </div>

      <CardEditorModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditIndex(null); }}
        initial={editIndex !== null ? draft.cards[editIndex] : undefined}
        title={editIndex !== null ? "Edit User Card" : "Add User Card"}
        onSave={(card) => {
          if (editIndex !== null) {
            const updated = [...draft.cards];
            updated[editIndex] = { ...updated[editIndex], ...card };
            setDraft({ ...draft, cards: updated });
          } else {
            setDraft({ ...draft, cards: [...draft.cards, { ...card, id: `u${Date.now()}` }] });
          }
        }}
      />

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
