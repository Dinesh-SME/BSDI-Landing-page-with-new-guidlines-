import { useUiStore } from "@/stores/uiStore";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.about": "About",
  "nav.services": "Services",
  "nav.whoCanUse": "Who can use",
  "nav.contact": "Contact",
  "nav.admin": "Admin",
  "nav.news": "News",
  "nav.map": "Map",
  "nav.layers": "Layers",
  "nav.bsdiProvides": "BSDI Provides",
  "nav.vision": "Vision",
  "search.placeholder": "Search datasets, services, layers...",
  "search.placeholderShort": "Search...",
  "search.seeAll": "See all results for",
  "search.noResults": "No results found",
  "search.resultsFor": "Results for",
  "search.totalFound": "results found",
  "search.section.layers": "Layers",
  "search.section.services": "Services",
  "search.section.news": "News",
  "search.section.users": "Users",
  "search.section.vision": "Vision",
  "news.readMore": "Read more",
  "news.viewAll": "View all news",
  "news.allNews": "All Latest News",
  "news.allNewsDesc": "Browse every update, announcement and milestone — sorted by most recent.",
  "news.close": "Close",
  "news.empty": "No news yet.",
  "mapView.badge": "Interactive Map",
  "mapView.back": "Back to Home",
  "mapView.placeholder": "Interactive map integration will be available here. This is a preview placeholder.",
  "common.openExternal": "Open",
  "common.viewDetails": "View Details",
  "common.viewAllLayers": "View All Layers",
  "common.allLayers": "All Layers",
  "technologies.viewAll": "View All Technologies",
  "technologies.allTechnologies": "All Technologies",
  "footer.quickLinks": "Quick Links",
  "footer.externalLinks": "External Links",
  "footer.followUs": "Follow Us",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "footer.brand": "Bahrain Spatial Data Infrastructure",
  "auth.signIn": "Sign in",
  "auth.login": "Login",
  "auth.logout": "Logout",
  "auth.username": "Username",
  "auth.password": "Password",
  "auth.admin": "Admin",
  "auth.user": "User",
  "auth.welcome": "Welcome back",
  "auth.invalid": "Invalid username or password",
  "auth.loginSubtitle": "Sign in to continue to BSDI",
  "auth.adminPanel": "Admin Panel",
  "nav.login": "Login",
};

const ar: Dict = {
  "nav.about": "حول",
  "nav.services": "الخدمات",
  "nav.whoCanUse": "من يمكنه الاستخدام",
  "nav.contact": "اتصل بنا",
  "nav.admin": "المشرف",
  "nav.news": "الأخبار",
  "nav.map": "الخريطة",
  "nav.layers": "الطبقات",
  "nav.bsdiProvides": "خدمات BSDI",
  "nav.vision": "الرؤية",
  "search.placeholder": "ابحث عن البيانات والخدمات والطبقات...",
  "search.placeholderShort": "بحث...",
  "search.seeAll": "عرض جميع النتائج لـ",
  "search.noResults": "لم يتم العثور على نتائج",
  "search.resultsFor": "نتائج البحث عن",
  "search.totalFound": "نتيجة",
  "search.section.layers": "الطبقات",
  "search.section.services": "الخدمات",
  "search.section.news": "الأخبار",
  "search.section.users": "المستخدمون",
  "search.section.vision": "الرؤية",
  "news.readMore": "اقرأ المزيد",
  "news.viewAll": "عرض جميع الأخبار",
  "news.allNews": "جميع آخر الأخبار",
  "news.allNewsDesc": "تصفح جميع التحديثات والإعلانات والإنجازات — مرتبة من الأحدث.",
  "news.close": "إغلاق",
  "news.empty": "لا توجد أخبار بعد.",
  "mapView.badge": "الخريطة التفاعلية",
  "mapView.back": "العودة للرئيسية",
  "mapView.placeholder": "سيكون تكامل الخريطة التفاعلية متاحاً هنا. هذه معاينة مؤقتة.",
  "common.openExternal": "فتح",
  "common.viewDetails": "عرض التفاصيل",
  "common.viewAllLayers": "عرض كل الطبقات",
  "common.allLayers": "جميع الطبقات",
  "technologies.viewAll": "عرض كل التقنيات",
  "technologies.allTechnologies": "جميع التقنيات",
  "footer.quickLinks": "روابط سريعة",
  "footer.externalLinks": "روابط خارجية",
  "footer.followUs": "تابعنا",
  "footer.contact": "اتصل بنا",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.brand": "البنية التحتية للبيانات المكانية في البحرين",
  "auth.signIn": "تسجيل الدخول",
  "auth.login": "دخول",
  "auth.logout": "تسجيل الخروج",
  "auth.username": "اسم المستخدم",
  "auth.password": "كلمة المرور",
  "auth.admin": "مشرف",
  "auth.user": "مستخدم",
  "auth.welcome": "مرحباً بعودتك",
  "auth.invalid": "اسم المستخدم أو كلمة المرور غير صحيحة",
  "auth.loginSubtitle": "سجّل الدخول للمتابعة إلى BSDI",
  "auth.adminPanel": "لوحة التحكم",
  "nav.login": "دخول",
};

const dictionaries: Record<string, Dict> = { en, ar };

export function useT() {
  const { language } = useUiStore();
  const dict = dictionaries[language] || en;
  return (key: string, fallback?: string) => dict[key] ?? fallback ?? key;
}

/** Pick localized field: returns ar variant when lang is ar and value exists, else en value */
export function pickLocalized<T extends string | undefined>(en: T, ar: T | undefined, lang: string): T {
  if (lang === "ar" && ar) return ar;
  return en;
}

export function useLocalized() {
  const { language } = useUiStore();
  return <T extends string | undefined>(en: T, ar?: T) => pickLocalized(en, ar, language);
}

// ============= Date / Number localization =============

const AR_MONTHS_SHORT: Record<string, string> = {
  jan: "يناير", feb: "فبراير", mar: "مارس", apr: "أبريل",
  may: "مايو", jun: "يونيو", jul: "يوليو", aug: "أغسطس",
  sep: "سبتمبر", oct: "أكتوبر", nov: "نوفمبر", dec: "ديسمبر",
};

const EASTERN_ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => EASTERN_ARABIC_DIGITS[+d]);
}

/** Best-effort localization of a date string to Arabic. Falls back to original if unparseable. */
export function localizeDate(value: string, lang: string): string {
  if (lang !== "ar" || !value) return value;
  // Try native parsing first
  const d = new Date(value);
  if (!isNaN(d.getTime())) {
    try {
      return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long", year: "numeric" }).format(d);
    } catch {}
  }
  // Fallback: replace English month tokens + digits
  let out = value;
  Object.entries(AR_MONTHS_SHORT).forEach(([en, arName]) => {
    out = out.replace(new RegExp(`\\b${en}[a-z]*\\b`, "gi"), arName);
  });
  return toArabicDigits(out);
}

export function useLocalizeDate() {
  const { language } = useUiStore();
  return (value: string) => localizeDate(value, language);
}

export function useLocalizeNumber() {
  const { language } = useUiStore();
  return (value: string | number) => (language === "ar" ? toArabicDigits(value) : String(value));
}

// ============= Section style helpers =============

import type { CSSProperties } from "react";
import type { HeroTextStyle, SectionStyles } from "@/stores/contentStore";

export function styleToCss(s?: HeroTextStyle): CSSProperties {
  if (!s) return {};
  return {
    fontSize: s.fontSize ? `${s.fontSize}px` : undefined,
    fontWeight: s.fontWeight || undefined,
    fontStyle: s.italic ? "italic" : undefined,
    color: s.color || undefined,
    fontFamily: s.fontFamily || undefined,
  };
}

/** Returns inline-style objects for a section's heading + description, language-aware. */
export function useSectionStyles(content: SectionStyles) {
  const { language } = useUiStore();
  const isAr = language === "ar";
  return {
    heading: styleToCss(isAr ? content.headingStyleAr : content.headingStyle),
    description: styleToCss(isAr ? content.descriptionStyleAr : content.descriptionStyle),
  };
}
