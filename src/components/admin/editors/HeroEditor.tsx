import { useState } from "react";
import { useContentStore, HeroTextStyle, defaultHero } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Save, ImagePlus, RotateCcw, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";
import heroSlide4 from "@/assets/hero-slide-4.png";
import heroSlide5 from "@/assets/hero-slide-5.png";
import ResetConfirmModal from "../ResetConfirmModal";
import { BilingualField } from "../BilingualField";
import { SectionStyleControls } from "../SectionStyleControls";

const DEFAULT_SLIDES = [heroSlide1, heroSlide2, heroSlide3, heroSlide4, heroSlide5];


export default function HeroEditor() {
  const { hero, updateHero } = useContentStore();
  const [draft, setDraft] = useState({
    ...hero,
    heroImages: hero.heroImages && hero.heroImages.length > 0 ? hero.heroImages : [],
    title1Style: hero.title1Style || { fontSize: 72, fontWeight: "bold", italic: false, color: "#ffffff" },
    title2Style: hero.title2Style || { fontSize: 72, fontWeight: "bold", italic: false, color: "#FF3B30" },
    subtitleStyle: hero.subtitleStyle || { fontSize: 20, fontWeight: "normal", italic: false, color: "#ffffffcc" },
    title1StyleAr: hero.title1StyleAr || {},
    title2StyleAr: hero.title2StyleAr || {},
    subtitleStyleAr: hero.subtitleStyleAr || {},
  });
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const currentSlides = draft.heroImages.length > 0 ? draft.heroImages : DEFAULT_SLIDES;

  const handleSave = () => {
    updateHero(draft);
    toast({ title: "Hero section updated!", description: "Changes are now live on the landing page." });
  };

  const handleReset = () => {
    const resetData = {
      ...defaultHero,
      heroImages: [] as string[],
      title1Style: { fontSize: 72, fontWeight: "bold", italic: false, color: "#ffffff" },
      title2Style: { fontSize: 72, fontWeight: "bold", italic: false, color: "#FF3B30" },
      subtitleStyle: { fontSize: 20, fontWeight: "normal", italic: false, color: "#ffffffcc" },
      title1StyleAr: {} as HeroTextStyle,
      title2StyleAr: {} as HeroTextStyle,
      subtitleStyleAr: {} as HeroTextStyle,
    };
    setDraft(resetData);
    updateHero(defaultHero);
    toast({ title: "Page reset to default successfully" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = 5 - draft.heroImages.length;
    const toAdd = files.slice(0, remaining);
    
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDraft((d) => ({
          ...d,
          heroImages: [...d.heroImages, ev.target?.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setDraft((d) => {
      const images = [...d.heroImages];
      images[index] = DEFAULT_SLIDES[index];
      // If all images match defaults, clear custom array
      const allDefault = images.every((img, i) => img === DEFAULT_SLIDES[i]);
      return { ...d, heroImages: allDefault ? [] : images };
    });
  };

  return (
    <div className="max-w-4xl">
      {/* Sticky Dual Live Preview (EN + AR) */}
      <div className="sticky top-0 z-20 pb-6 backdrop-blur-xl bg-background/80 -mx-6 px-6 pt-6 rounded-b-2xl">
        <div className="neu-card p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Live Preview</h3>
            <span className="text-xs text-muted-foreground">Unsaved changes preview · Click "Update" to publish</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(["en", "ar"] as const).map((lang) => {
              const isAr = lang === "ar";
              const t1Style = isAr ? { ...draft.title1Style, ...draft.title1StyleAr } : draft.title1Style;
              const t2Style = isAr ? { ...draft.title2Style, ...draft.title2StyleAr } : draft.title2Style;
              const subStyle = isAr ? { ...draft.subtitleStyle, ...draft.subtitleStyleAr } : draft.subtitleStyle;
              const t1 = isAr ? (draft.title1_ar || draft.title1) : draft.title1;
              const t2 = isAr ? (draft.title2_ar || draft.title2) : draft.title2;
              const sub = isAr ? (draft.subtitle_ar || draft.subtitle) : draft.subtitle;
              const arFont = isAr ? "'Cairo', 'Tajawal', sans-serif" : undefined;
              return (
                <div key={lang} className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                      {isAr ? "AR · العربية (RTL)" : "EN · English (LTR)"}
                    </span>
                  </div>
                  <div
                    className="relative rounded-xl overflow-hidden border border-border"
                    style={{ height: 260 }}
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    <img src={currentSlides[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${draft.overlayOpacity / 100})` }} />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                      <h1
                        style={{
                          fontSize: `${Math.min(t1Style.fontSize || 72, 36)}px`,
                          fontWeight: t1Style.fontWeight || "bold",
                          fontStyle: t1Style.italic ? "italic" : "normal",
                          color: t1Style.color || "#ffffff",
                          fontFamily: t1Style.fontFamily || arFont,
                        }}
                        className="font-display leading-tight"
                      >
                        {t1}
                      </h1>
                      <h1
                        style={{
                          fontSize: `${Math.min(t2Style.fontSize || 72, 36)}px`,
                          fontWeight: t2Style.fontWeight || "bold",
                          fontStyle: t2Style.italic ? "italic" : "normal",
                          color: t2Style.color || "#FF3B30",
                          fontFamily: t2Style.fontFamily || arFont,
                        }}
                        className="font-display leading-tight"
                      >
                        {t2}
                      </h1>
                      <p
                        className="max-w-md mt-3 leading-relaxed"
                        style={{
                          fontSize: `${Math.min(subStyle.fontSize || 20, 14)}px`,
                          fontWeight: subStyle.fontWeight || "normal",
                          fontStyle: subStyle.italic ? "italic" : "normal",
                          color: subStyle.color || "#ffffffcc",
                          fontFamily: subStyle.fontFamily || arFont,
                        }}
                      >
                        {sub}
                      </p>
                    </div>
                    <div className={`absolute bottom-3 ${isAr ? "left-3" : "right-3"} flex gap-1.5`}>
                      {currentSlides.map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 0 ? "hsl(348, 83%, 40%)" : "rgba(255,255,255,0.4)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-2">
        {/* Carousel Images */}
        <div className="neu-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Carousel Images</h3>
            <span className="text-sm text-muted-foreground">{draft.heroImages.length}/5 custom</span>
          </div>
          <p className="text-sm text-muted-foreground">Upload up to 5 images for the hero carousel. When empty, default Bahrain images are used.</p>
          
          {/* Image grid - always show 5 slots */}
          <div className="grid grid-cols-5 gap-3">
            {currentSlides.map((img, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-border aspect-[4/3]">
                <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <label className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex flex-col items-center gap-1">
                    <div className="bg-white/90 rounded-full p-2">
                      <ImagePlus size={16} className="text-foreground" />
                    </div>
                    <span className="text-[10px] text-white font-medium">Replace</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setDraft((d) => {
                            const images = d.heroImages.length > 0 ? [...d.heroImages] : [...DEFAULT_SLIDES];
                            images[i] = ev.target?.result as string;
                            return { ...d, heroImages: images };
                          });
                        };
                        reader.readAsDataURL(file);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">{i + 1}</span>
                {draft.heroImages.length > 0 && draft.heroImages[i] && (
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-white rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <Label>Overlay Opacity: {draft.overlayOpacity}%</Label>
            <Slider value={[draft.overlayOpacity]} onValueChange={([v]) => setDraft({ ...draft, overlayOpacity: v })} min={0} max={100} step={5} className="mt-3" />
          </div>
        </div>

        {/* Hero Text */}
        <div className="neu-card p-6 space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Hero Text</h3>
          <BilingualField
            label="Title Line 1"
            value={draft.title1}
            valueAr={draft.title1_ar || ""}
            onChange={(v) => setDraft({ ...draft, title1: v })}
            onChangeAr={(v) => setDraft({ ...draft, title1_ar: v })}
          />
          <BilingualField
            label="Title Line 2"
            value={draft.title2}
            valueAr={draft.title2_ar || ""}
            onChange={(v) => setDraft({ ...draft, title2: v })}
            onChangeAr={(v) => setDraft({ ...draft, title2_ar: v })}
          />
          <BilingualField
            label="Subtitle"
            multiline rows={3}
            value={draft.subtitle}
            valueAr={draft.subtitle_ar || ""}
            onChange={(v) => setDraft({ ...draft, subtitle: v })}
            onChangeAr={(v) => setDraft({ ...draft, subtitle_ar: v })}
          />
        </div>

        {/* Text Style Controls (EN + AR side-by-side) */}
        <div className="neu-card p-6 space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Text Styling</h3>
          <SectionStyleControls
            label="Title Line 1"
            styleEn={draft.title1Style}
            styleAr={draft.title1StyleAr}
            onChangeEn={(s) => setDraft({ ...draft, title1Style: s })}
            onChangeAr={(s) => setDraft({ ...draft, title1StyleAr: s })}
            defaultColor="#ffffff"
          />
          <SectionStyleControls
            label="Title Line 2"
            styleEn={draft.title2Style}
            styleAr={draft.title2StyleAr}
            onChangeEn={(s) => setDraft({ ...draft, title2Style: s })}
            onChangeAr={(s) => setDraft({ ...draft, title2StyleAr: s })}
            defaultColor="#FF3B30"
          />
          <SectionStyleControls
            label="Subtitle"
            styleEn={draft.subtitleStyle}
            styleAr={draft.subtitleStyleAr}
            onChangeEn={(s) => setDraft({ ...draft, subtitleStyle: s })}
            onChangeAr={(s) => setDraft({ ...draft, subtitleStyleAr: s })}
            defaultColor="#ffffffcc"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} className="gap-2" size="lg">
            <Save size={18} /> Update Hero Section
          </Button>
          <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
            <RotateCcw size={18} /> Reset Changes
          </Button>
        </div>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
