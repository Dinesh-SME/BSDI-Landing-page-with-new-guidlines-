import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Eye, Globe, Info, Grid3X3, Users, Building2, FileText, Layers,
  ChevronLeft, Save, ExternalLink, Newspaper, MapPin, LogIn, LogOut, Cpu, BarChart3
} from "lucide-react";
import dashLogo from "@/assets/dashLogo.png";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import HeroEditor from "./editors/HeroEditor";
import VisionEditor from "./editors/VisionEditor";
import AboutEditor from "./editors/AboutEditor";
import ServicesEditor from "./editors/ServicesEditor";
import UsersEditor from "./editors/UsersEditor";
import DataServicesEditor from "./editors/DataServicesEditor";
import FooterEditor from "./editors/FooterEditor";
import LayersEditor from "./editors/LayersEditor";
import NewsEditor from "./editors/NewsEditor";
import MapViewEditor from "./editors/MapViewEditor";
import LoginEditor from "./editors/LoginEditor";
import TechnologiesEditor from "./editors/TechnologiesEditor";
import StatisticsEditor from "./editors/StatisticsEditor";

const tabs = [
  { id: "hero", label: "Hero Section", icon: LayoutDashboard },
  { id: "news", label: "News", icon: Newspaper },
  { id: "about", label: "About BSDI", icon: Info },
  { id: "statistics", label: "Statistics", icon: BarChart3 },
  { id: "mapview", label: "Map View", icon: MapPin },
  { id: "layers", label: "Layers", icon: Layers },
  { id: "services", label: "What BSDI Provides", icon: Grid3X3 },
  { id: "vision", label: "BSDI Vision", icon: Eye },
  { id: "users", label: "Who Can Use BSDI", icon: Users },
  { id: "technologies", label: "Technologies", icon: Cpu },
  { id: "data", label: "Data Services", icon: Building2 },
  { id: "footer", label: "Footer", icon: FileText },
];

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("hero");
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const renderEditor = () => {
    switch (activeTab) {
      case "hero": return <HeroEditor />;
      case "news": return <NewsEditor />;
      case "vision": return <VisionEditor />;
      case "about": return <AboutEditor />;
      case "statistics": return <StatisticsEditor />;
      case "mapview": return <MapViewEditor />;
      case "services": return <ServicesEditor />;
      case "users": return <UsersEditor />;
      case "technologies": return <TechnologiesEditor />;
      case "layers": return <LayersEditor />;
      case "data": return <DataServicesEditor />;
      case "login": return <LoginEditor />;
      case "footer": return <FooterEditor />;
      default: return null;
    }
  };

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div dir="ltr" className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-sidebar-border flex flex-col shrink-0" style={{ background: 'linear-gradient(180deg, hsl(215 50% 22%) 0%, hsl(215 50% 14%) 100%)' }}>
        <div className="px-5 pt-8 pb-10 border-b border-sidebar-border flex items-center justify-center">
          <img src={dashLogo} alt="BSDI Logo" className="h-28 w-auto" />
        </div>
        <nav className="flex-1 p-3 pt-6 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-sidebar-border flex items-center justify-between px-6 shrink-0" style={{ background: 'linear-gradient(90deg, hsl(215 50% 18%) 0%, hsl(215 45% 22%) 100%)' }}>
          <div className="flex items-center gap-3">
            {currentTab && <currentTab.icon size={20} className="!text-white" />}
            <h1 className="font-display text-lg font-semibold !text-white">
              {currentTab?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="default" size="sm" className="gap-2 border border-white/20 text-white hover:text-white" onClick={() => navigate("/")}>
              <ExternalLink size={14} />
              Portal Page
            </Button>
            <Button variant="default" size="sm" className="gap-2 border border-white/20 text-white hover:text-white" onClick={() => { logout(); navigate("/"); }}>
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderEditor()}
        </main>
      </div>
    </div>
  );
}
