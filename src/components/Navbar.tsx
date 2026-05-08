import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Search, X, Globe, Moon, Sun, Menu, User, LogOut } from "lucide-react";
import igaHeaderLogoEn from "@/assets/iga-header-logo-en.png";
import igaHeaderLogoAr from "@/assets/iga-header-logo-ar.png";
import igaHeaderLogoEnDark from "@/assets/iga-header-logo-en-dark.png";
import igaHeaderLogoArDark from "@/assets/iga-header-logo-ar-dark.png";
import { useUiStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";
import { useT } from "@/lib/i18n";
import LoginModal from "@/components/LoginModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<"admin" | "user">("user");
  const [query, setQuery] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const t = useT();
  const { language, setLanguage, theme, setTheme, fontSize, setFontSize } = useUiStore();
  const { user, logout } = useAuthStore();
  const [textSizeOpen, setTextSizeOpen] = useState(false);
  
  const nextLang = language === "en" ? "ar" : "en";
  const langLabel = language === "en" ? "العربية" : "English";

  const navLinks = [
    { label: t("nav.news"), href: "#news" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.map"), href: "#map-view" },
    { label: t("nav.layers"), href: "#layers" },
    { label: t("nav.bsdiProvides"), href: "#services" },
    { label: t("nav.vision"), href: "#vision" },
    { label: t("nav.whoCanUse"), href: "#who-can-use" },
    { label: t("nav.contact"), href: "#footer" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.substring(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = 120; // Accounting for two-tier header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <header 
      id="govbh-header" 
      className={`govbh-header fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 will-change-transform ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{ margin: 0, padding: 0 }}
    >
      {/* Tier 1: Logo & Secondary Tools */}
      <div className="govbh-head border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="govbh-head__headrow flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <div className="govbh-head__logo">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <img 
                  src={
                    theme === "dark" 
                      ? (language === "ar" ? igaHeaderLogoArDark : igaHeaderLogoEnDark)
                      : (language === "ar" ? igaHeaderLogoAr : igaHeaderLogoEn)
                  } 
                  alt="Information & eGovernment Authority" 
                  className="h-10 md:h-12 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* Secondary Menu Tools */}
            <div className="govbh-head__secondary-menu flex items-center gap-3 md:gap-5">
              {/* Language Switcher */}
              <button 
                onClick={() => setLanguage(nextLang)}
                className="govbh-head__lang-switcher hidden sm:flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-accent transition-colors"
                aria-label={t("nav.switchLanguage")}
              >
                <span className="mt-0.5">{langLabel}</span>
                <Globe size={18} className="text-primary" />
              </button>

              {/* Login / Profile */}
              {user ? (
                <div className="flex items-center gap-3">
                   <button 
                    onClick={() => navigate(user.role === "admin" ? "/admin-crm" : "/dashboard")}
                    className="flex items-center gap-2 text-sm font-bold text-primary"
                   >
                     <User size={18} />
                     <span className="hidden md:inline">{user.name}</span>
                   </button>
                   <button onClick={logout} className="text-destructive p-1" title={t("auth.logout")}>
                     <LogOut size={18} />
                   </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setLoginRole("user"); setLoginOpen(true); }}
                  className="govbh-btn govbh-btn--outline govbh-btn--small hidden md:flex items-center gap-2"
                >
                  <User size={16} />
                  {t("nav.login")}
                </button>
              )}

              {/* Tools Divider */}
              <div className="h-6 w-[1px] bg-border mx-1 hidden md:block"></div>

              {/* Theme Toggle */}
              <div className="hidden sm:flex items-center">
                <button 
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    theme === "dark" ? "bg-[#002855]" : "bg-gray-200"
                  } border border-gray-300 flex items-center px-1`}
                  aria-label="Toggle Theme"
                >
                  <div className={`w-4 h-4 rounded-full transition-transform duration-300 flex items-center justify-center ${
                    theme === "dark" ? "translate-x-6 bg-white" : "translate-x-0 bg-white"
                  } shadow-sm`}>
                    {theme === "dark" ? (
                      <Moon size={10} className="text-primary fill-primary" />
                    ) : (
                      <Sun size={10} className="text-orange-400 fill-orange-400" />
                    )}
                  </div>
                </button>
              </div>

              {/* Text Size Tool */}
              <div className="relative govbh-head__textsize hidden md:block">
                <button 
                  onClick={() => setTextSizeOpen(!textSizeOpen)}
                  className={`p-2 transition-all duration-200 border rounded-lg ${
                    textSizeOpen ? "bg-primary/10 border-primary text-primary" : "border-transparent text-foreground hover:bg-gray-100"
                  }`} 
                  aria-label="Text Size"
                >
                  <div className="flex items-center gap-0.5 font-bold">
                    <span className="text-[10px]">A</span>
                    <span className="text-sm">A</span>
                  </div>
                </button>

                {textSizeOpen && (
                  <div className="absolute top-full mt-2 right-0 w-64 bg-background rounded-xl shadow-2xl border border-border z-[100] p-5 animate-in fade-in zoom-in-95">
                    <button 
                      onClick={() => setTextSizeOpen(false)}
                      className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <h4 className="text-lg font-bold text-foreground">
                        {language === "ar" ? "تغيير حجم الخط" : "Text Resize"}
                      </h4>
                      <button 
                        onClick={() => { setFontSize("medium"); setTextSizeOpen(false); }}
                        className="text-sm text-primary underline underline-offset-4 font-medium"
                      >
                        ( {language === "ar" ? "إعادة تعيين" : "Reset"} )
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      {[
                        { id: "small", label: "Aa", sizeClass: "text-xs" },
                        { id: "medium", label: "Aa", sizeClass: "text-sm" },
                        { id: "large", label: "Aa", sizeClass: "text-base" }
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { setFontSize(s.id as any); setTextSizeOpen(false); }}
                          className={`flex-1 aspect-square border-2 rounded-xl flex items-center justify-center transition-all ${
                            fontSize === s.id 
                              ? "border-primary bg-primary/5 text-primary" 
                              : "border-gray-200 text-gray-600 hover:border-primary/50"
                          }`}
                        >
                          <span className={`${s.sizeClass} font-bold`}>{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Toggle */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 transition-all duration-200 border rounded-lg ${
                  searchOpen ? "bg-primary/10 border-primary text-primary" : "border-transparent text-foreground hover:bg-gray-100"
                }`}
                aria-label="Search"
              >
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Burger Menu for Mobile */}
              <button 
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-foreground"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Navigation Menu */}
      <div className="govbh-menu hidden lg:block bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="govbh-menu__navmenu">
            <ul className="flex items-center gap-x-8 h-12">
              {navLinks.map((link) => (
                <li key={link.label} className="h-full">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center h-full text-[13px] font-bold uppercase tracking-wide text-foreground hover:text-accent border-b-2 border-transparent hover:border-accent transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="govbh-search !flex absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl p-6 animate-in fade-in slide-in-from-top-4 z-[100]">
          <div className="container mx-auto">
            <div className="relative max-w-6xl mx-auto">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === "ar" ? "أدخل كلمة البحث..." : "Enter keyword..."}
                className="w-full h-14 pl-6 pr-14 text-xl border-2 border-primary/40 bg-background text-foreground rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
                autoFocus
              />
              <button className="absolute right-5 top-1/2 -translate-y-1/2 text-accent">
                <Search size={28} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background z-50 lg:hidden transition-transform duration-500 ease-in-out ${
        mobileOpen ? "translate-x-0" : language === "ar" ? "-translate-x-full" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full pt-20 px-6">
          <button 
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 p-2"
          >
            <X size={28} />
          </button>

          <div className="flex-1 overflow-y-auto py-8">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xl font-bold text-foreground hover:text-accent block border-b border-border/50 pb-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 space-y-4">
              <button 
                onClick={() => { setLanguage(nextLang); setMobileOpen(false); }}
                className="flex items-center gap-3 text-lg font-bold w-full p-3 bg-secondary/30 rounded-xl"
              >
                <Globe size={20} />
                {langLabel}
              </button>

              {!user && (
                <button 
                  onClick={() => { setLoginRole("user"); setLoginOpen(true); setMobileOpen(false); }}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg"
                >
                  {t("nav.login")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} defaultRole={loginRole} />
    </header>
  );
}
