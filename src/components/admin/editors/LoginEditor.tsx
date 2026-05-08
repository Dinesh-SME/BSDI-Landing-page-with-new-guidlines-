import { useState } from "react";
import { useContentStore, defaultAuth } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ImagePlus, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResetConfirmModal from "../ResetConfirmModal";

export default function LoginEditor() {
  const { auth, updateAuth } = useContentStore();
  const [draft, setDraft] = useState(auth);
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => setDraft({ ...draft, loginBackground: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateAuth(draft);
    toast({ title: "Login page updated", description: "Background image is now live on the login modal." });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="p-6 bg-card rounded-2xl border border-border space-y-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">Login Page Background</h3>
          <p className="text-sm text-muted-foreground mt-1">
            This image appears blurred behind the login modal.
          </p>
        </div>

        {/* Preview */}
        <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden border border-border bg-muted">
          <img src={draft.loginBackground} alt="Login background preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 backdrop-blur-md bg-foreground/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-card px-6 py-4 rounded-xl shadow-lg border border-border">
              <p className="text-sm font-semibold text-foreground">Login modal preview</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
          <div>
            <Label className="text-xs">Image URL</Label>
            <Input
              value={draft.loginBackground}
              onChange={(e) => setDraft({ ...draft, loginBackground: e.target.value })}
              placeholder="https://..."
              className="mt-1"
            />
          </div>
          <label className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer text-sm font-medium">
            <ImagePlus size={16} /> Upload
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save size={18} /> Update Login Page
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset
        </Button>
      </div>

      <ResetConfirmModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={() => { setDraft(defaultAuth); updateAuth(defaultAuth); toast({ title: "Login page reset to default" }); }}
      />
    </div>
  );
}
