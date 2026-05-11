import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Maximize2, RotateCw, RefreshCcw, Crop as CropIcon, Image as ImageIcon } from "lucide-react";

interface Props {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onConfirm: (croppedDataUrl: string) => void;
}

async function getCroppedImg(imageSrc: string, crop: Area, rotation: number = 0): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return imageSrc;

  const rotRad = (rotation * Math.PI) / 180;
  const { width: bWidth, height: bHeight } = {
    width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
    height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
  };

  canvas.width = bWidth;
  canvas.height = bHeight;

  ctx.translate(bWidth / 2, bHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(crop.x, crop.y, crop.width, crop.height);
  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL("image/png");
}

export default function ImageCropper({ open, imageSrc, onClose, onConfirm }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onConfirm(cropped);
      onClose(); // Automatically close after confirm
    } catch (e) {
      console.error(e);
    }
  };

  const reset = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <CropIcon size={18} className="text-primary" />
            Crop & Adjust Logo
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-slate-950/50">
          {/* Main Cropper Area */}
          <div className="flex-1 relative min-h-[300px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              classes={{
                containerClassName: "bg-slate-200 dark:bg-slate-900",
                mediaClassName: "max-w-full max-h-full",
              }}
            />
          </div>

          {/* Controls Sidebar */}
          <div className="w-full md:w-72 border-l bg-background p-6 space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Maximize2 size={14} /> Aspect Ratio
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "1:1", value: 1 },
                  { label: "4:3", value: 4/3 },
                  { label: "Free", value: undefined }
                ].map((r) => (
                  <Button
                    key={r.label}
                    variant={aspect === r.value ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setAspect(r.value)}
                  >
                    {r.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Zoom</Label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[zoom]} 
                  min={1} max={3} step={0.01} 
                  onValueChange={(v) => setZoom(v[0])} 
                />
                <span className="text-[10px] font-mono w-8">{zoom.toFixed(1)}x</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                Rotation
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setRotation((r) => (r + 90) % 360)}>
                  <RotateCw size={12} />
                </Button>
              </Label>
              <Slider 
                value={[rotation]} 
                min={0} max={360} step={1} 
                onValueChange={(v) => setRotation(v[0])} 
              />
            </div>

            <div className="pt-4 border-t space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <ImageIcon size={14} /> Preview Context
              </Label>
              <div className="aspect-square rounded-xl border-2 border-dashed border-border bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="w-24 h-24 relative flex items-center justify-center">
                  <img src={imageSrc} className="max-w-full max-h-full object-contain opacity-20 grayscale" />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground/40 text-center px-2">
                    Output will be transparent PNG
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-slate-50/50 dark:bg-slate-900/50 flex flex-row items-center justify-between gap-3 sm:justify-between">
          <Button variant="ghost" size="sm" onClick={reset} className="gap-2 text-muted-foreground">
            <RefreshCcw size={14} /> Reset
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
            <Button size="sm" onClick={handleConfirm}>Save Crop</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
