import { useState } from "react";
import { useContentStore, defaultFooter } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResetConfirmModal from "../ResetConfirmModal";

export default function FooterEditor() {
  const { footer, updateFooter } = useContentStore();
  const [draft, setDraft] = useState({
    authorityTitle: footer.authorityTitle || "",
    authorityTitle_ar: footer.authorityTitle_ar || "",
    address: footer.address || "",
    address_ar: footer.address_ar || "",
    phone: footer.phone || "",
    phoneCaption: footer.phoneCaption || "",
    phoneCaption_ar: footer.phoneCaption_ar || "",
    copyrightText: footer.copyrightText || "",
    copyrightText_ar: footer.copyrightText_ar || "",
    legalLinks: [...(footer.legalLinks || [])],
    quickLinks: [...footer.quickLinks],
    externalLinks: [...footer.externalLinks],
    socialLinks: [...footer.socialLinks],
  });
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updateFooter(draft);
    toast({ title: "Footer updated!" });
  };

  const handleReset = () => {
    setDraft({
      authorityTitle: defaultFooter.authorityTitle || "",
      authorityTitle_ar: defaultFooter.authorityTitle_ar || "",
      address: defaultFooter.address || "",
      address_ar: defaultFooter.address_ar || "",
      phone: defaultFooter.phone || "",
      phoneCaption: defaultFooter.phoneCaption || "",
      phoneCaption_ar: defaultFooter.phoneCaption_ar || "",
      copyrightText: defaultFooter.copyrightText || "",
      copyrightText_ar: defaultFooter.copyrightText_ar || "",
      legalLinks: [...(defaultFooter.legalLinks || [])],
      quickLinks: [...defaultFooter.quickLinks],
      externalLinks: [...defaultFooter.externalLinks],
      socialLinks: [...defaultFooter.socialLinks],
    });
    updateFooter(defaultFooter);
    toast({ title: "Page reset to default successfully" });
  };

  const updateField = (field: string, value: string) => setDraft({ ...draft, [field]: value });

  const addQuickLink = () => setDraft({ ...draft, quickLinks: [...draft.quickLinks, { id: `ql${Date.now()}`, label: "", label_ar: "", href: "" }] });
  const addExternalLink = () => setDraft({ ...draft, externalLinks: [...draft.externalLinks, { id: `el${Date.now()}`, label: "", label_ar: "", href: "" }] });
  const addLegalLink = () => setDraft({ ...draft, legalLinks: [...draft.legalLinks, { id: `lg${Date.now()}`, label: "", label_ar: "", href: "" }] });

  const updateLink = (key: "quickLinks" | "externalLinks" | "legalLinks", id: string, field: string, value: string) =>
    setDraft({ ...draft, [key]: draft[key].map((l) => l.id === id ? { ...l, [field]: value } : l) });

  const removeLink = (key: "quickLinks" | "externalLinks" | "legalLinks", id: string) =>
    setDraft({ ...draft, [key]: draft[key].filter((l) => l.id !== id) });

  const updateSocial = (platform: string, href: string) => {
    setDraft({ ...draft, socialLinks: draft.socialLinks.map((s) => s.platform === platform ? { ...s, href } : s) });
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Authority Info */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Authority Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="mb-1 block text-xs">Authority Title (EN)</Label>
            <Input value={draft.authorityTitle} onChange={(e) => updateField("authorityTitle", e.target.value)} />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Authority Title (AR)</Label>
            <Input dir="rtl" value={draft.authorityTitle_ar} onChange={(e) => updateField("authorityTitle_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Address (EN)</Label>
            <Textarea rows={2} value={draft.address} onChange={(e) => updateField("address", e.target.value)} />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Address (AR)</Label>
            <Textarea dir="rtl" rows={2} value={draft.address_ar} onChange={(e) => updateField("address_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Phone Number</Label>
            <Input value={draft.phone} onChange={(e) => updateField("phone", e.target.value)} />
          </div>
          <div />
          <div>
            <Label className="mb-1 block text-xs">Phone Caption (EN)</Label>
            <Input value={draft.phoneCaption} onChange={(e) => updateField("phoneCaption", e.target.value)} />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Phone Caption (AR)</Label>
            <Input dir="rtl" value={draft.phoneCaption_ar} onChange={(e) => updateField("phoneCaption_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Quick Links</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={addQuickLink}>
            <Plus size={14} /> Add Link
          </Button>
        </div>
        {draft.quickLinks.map((link) => (
          <div key={link.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_auto] items-center gap-3">
            <Input placeholder="Label (EN)" value={link.label} onChange={(e) => updateLink("quickLinks", link.id, "label", e.target.value)} />
            <Input dir="rtl" placeholder="التسمية (AR)" value={link.label_ar || ""} onChange={(e) => updateLink("quickLinks", link.id, "label_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
            <Input placeholder="URL" value={link.href} onChange={(e) => updateLink("quickLinks", link.id, "href", e.target.value)} />
            <Button variant="ghost" size="icon" onClick={() => removeLink("quickLinks", link.id)} className="text-destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      {/* External Links */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">External Links</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={addExternalLink}>
            <Plus size={14} /> Add Link
          </Button>
        </div>
        {draft.externalLinks.map((link) => (
          <div key={link.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_auto] items-center gap-3">
            <Input placeholder="Label (EN)" value={link.label} onChange={(e) => updateLink("externalLinks", link.id, "label", e.target.value)} />
            <Input dir="rtl" placeholder="التسمية (AR)" value={link.label_ar || ""} onChange={(e) => updateLink("externalLinks", link.id, "label_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
            <Input placeholder="URL" value={link.href} onChange={(e) => updateLink("externalLinks", link.id, "href", e.target.value)} />
            <Button variant="ghost" size="icon" onClick={() => removeLink("externalLinks", link.id)} className="text-destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      {/* Legal / Bottom Bar */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Bottom Bar (Copyright & Legal)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="mb-1 block text-xs">Copyright (EN)</Label>
            <Input value={draft.copyrightText} onChange={(e) => updateField("copyrightText", e.target.value)} />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Copyright (AR)</Label>
            <Input dir="rtl" value={draft.copyrightText_ar} onChange={(e) => updateField("copyrightText_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Label className="text-sm font-medium">Legal Links</Label>
          <Button variant="outline" size="sm" className="gap-2" onClick={addLegalLink}>
            <Plus size={14} /> Add Link
          </Button>
        </div>
        {draft.legalLinks.map((link) => (
          <div key={link.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_auto] items-center gap-3">
            <Input placeholder="Label (EN)" value={link.label} onChange={(e) => updateLink("legalLinks", link.id, "label", e.target.value)} />
            <Input dir="rtl" placeholder="التسمية (AR)" value={link.label_ar || ""} onChange={(e) => updateLink("legalLinks", link.id, "label_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
            <Input placeholder="URL" value={link.href} onChange={(e) => updateLink("legalLinks", link.id, "href", e.target.value)} />
            <Button variant="ghost" size="icon" onClick={() => removeLink("legalLinks", link.id)} className="text-destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Social Media</h3>
        {draft.socialLinks.map((social) => (
          <div key={social.platform} className="flex items-center gap-3">
            <Label className="w-24 shrink-0">{social.platform}</Label>
            <Input placeholder="URL" value={social.href} onChange={(e) => updateSocial(social.platform, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update Footer
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset Changes
        </Button>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
