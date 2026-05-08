import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUiStore } from "@/stores/uiStore";

export default function UiProvider({ children }: { children: React.ReactNode }) {
  const { language, theme, fontSize } = useUiStore();
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin = pathname.startsWith("/admin-crm");
    if (isAdmin) {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }

    // Apply Theme
    if (theme === "dark") {
      document.documentElement.classList.add("govbh-darkmode");
    } else {
      document.documentElement.classList.remove("govbh-darkmode");
    }

    // Apply Font Size
    document.documentElement.classList.remove("govbh-head__textsize-small", "govbh-head__textsize-large");
    if (fontSize === "small") {
      document.documentElement.classList.add("govbh-head__textsize-small");
    } else if (fontSize === "large") {
      document.documentElement.classList.add("govbh-head__textsize-large");
    }
  }, [language, pathname, theme, fontSize]);

  return <>{children}</>;
}
