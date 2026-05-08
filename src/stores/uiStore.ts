import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "ar";
export type Theme = "light" | "dark";
export type FontSize = "small" | "medium" | "large";

interface UiStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
      theme: "light",
      setTheme: (theme) => set({ theme }),
      fontSize: "medium",
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    { name: "bsdi-ui" }
  )
);
