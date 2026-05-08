import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ShieldCheck, User as UserIcon, AlertCircle } from "lucide-react";
import { useAuthStore, DEMO_CREDENTIALS, Role } from "@/stores/authStore";
import { useContentStore } from "@/stores/contentStore";
import { useT } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRole?: Role;
}

export default function LoginModal({ open, onOpenChange, defaultRole = "user" }: LoginModalProps) {
  const t = useT();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const loginBackground = useContentStore((s) => s.auth.loginBackground);
  const { toast } = useToast();

  const [role, setRole] = useState<Role>(defaultRole);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setRole(defaultRole);
      setUsername("");
      setPassword("");
      setError("");
    }
  }, [open, defaultRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cred = DEMO_CREDENTIALS[role];
    if (username.trim() === cred.username && password === cred.password) {
      login({ role, name: cred.name });
      toast({ title: t("auth.welcome"), description: cred.name });
      onOpenChange(false);
      if (role === "admin") navigate("/admin-crm");
    } else {
      setError(t("auth.invalid"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden border-none bg-transparent shadow-none [&>button]:text-white [&>button]:bg-black/30 [&>button]:rounded-full [&>button]:p-1"
      >
        {/* Background image + blur layer (covers the full viewport behind the card) */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <img src={loginBackground} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 backdrop-blur-md bg-foreground/40" />
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-2xl p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Lock size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">{t("auth.signIn")}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t("auth.loginSubtitle")}</p>
          </div>

          <Tabs value={role} onValueChange={(v) => setRole(v as Role)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-5">
              <TabsTrigger value="user" className="gap-2"><UserIcon size={14} />{t("auth.user")}</TabsTrigger>
              <TabsTrigger value="admin" className="gap-2"><ShieldCheck size={14} />{t("auth.admin")}</TabsTrigger>
            </TabsList>

            {(["user", "admin"] as Role[]).map((r) => (
              <TabsContent key={r} value={r} className="mt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`u-${r}`} className="text-xs">{t("auth.username")}</Label>
                    <Input
                      id={`u-${r}`}
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={DEMO_CREDENTIALS[r].username}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`p-${r}`} className="text-xs">{t("auth.password")}</Label>
                    <Input
                      id={`p-${r}`}
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
                      <AlertCircle size={14} /> {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    {t("auth.signIn")}
                  </Button>

                  <div className="text-[11px] text-muted-foreground text-center bg-muted rounded-lg px-3 py-2 leading-relaxed">
                    <span className="font-semibold">Demo:</span>{" "}
                    {DEMO_CREDENTIALS[r].username} / {DEMO_CREDENTIALS[r].password}
                  </div>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
