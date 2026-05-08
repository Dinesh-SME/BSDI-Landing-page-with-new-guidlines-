import { create } from "zustand";
import { persist } from "zustand/middleware";
import bahrainMapView from "@/assets/bahrain-map-view.png";

// ============= Types =============

export interface VisionCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  link?: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  tags: string[];
  tags_ar?: string[];
  link?: string;
}

export interface UserCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  link?: string;
}

export type VisualizationType = "none" | "graph" | "chart" | "bar";

export interface StatCard {
  id: string;
  target: string;
  suffix: string;
  label: string;
  label_ar?: string;
  // Optional richer card content
  icon?: string; // lucide icon name
  description?: string;
  description_ar?: string;
  trend?: number; // e.g. 18 means +18%
  trendDirection?: "up" | "down";
  // Visualization
  visualizationType?: VisualizationType;
  visualizationStyle?: string; // e.g. "line_smooth", "bar_vertical"
  vizData?: number[];
  vizLabels?: string[];
  tooltipText?: string;
  externalLink?: string;
  sortOrder?: number;
  // Chart styling
  useBrandColors?: boolean;
  colors?: string[];
  legendEnabled?: boolean;
  tooltipEnabled?: boolean;
  animationEnabled?: boolean;
}

export interface DataEntity {
  id: string;
  name: string;
  name_ar?: string;
  logo: string;
  link: string;
}

export interface QuickLink {
  id: string;
  label: string;
  label_ar?: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface HeroTextStyle {
  fontSize?: number;
  fontWeight?: string;
  italic?: boolean;
  color?: string;
  fontFamily?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  title_ar?: string;
  excerpt: string;
  excerpt_ar?: string;
  date: string;
  image: string;
  link?: string;
  priorityPreview?: boolean;
  previewSlot?: null | 1 | 2 | 3 | 4;
}

export interface NewsContent {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  items: NewsItem[];
  headingStyle?: HeroTextStyle;
  descriptionStyle?: HeroTextStyle;
  headingStyleAr?: HeroTextStyle;
  descriptionStyleAr?: HeroTextStyle;
}

export interface MapViewContent {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  ctaLabel: string;
  ctaLabel_ar?: string;
  ctaHref: string;
  previewImage: string;
  headingStyle?: HeroTextStyle;
  descriptionStyle?: HeroTextStyle;
  headingStyleAr?: HeroTextStyle;
  descriptionStyleAr?: HeroTextStyle;
}

export interface HeroContent {
  title1: string;
  title1_ar?: string;
  title2: string;
  title2_ar?: string;
  subtitle: string;
  subtitle_ar?: string;
  overlayOpacity: number;
  backgroundImage?: string;
  heroImages?: string[];
  title1Style?: HeroTextStyle;
  title2Style?: HeroTextStyle;
  subtitleStyle?: HeroTextStyle;
  title1StyleAr?: HeroTextStyle;
  title2StyleAr?: HeroTextStyle;
  subtitleStyleAr?: HeroTextStyle;
}

export interface SectionStyles {
  headingStyle?: HeroTextStyle;
  descriptionStyle?: HeroTextStyle;
  headingStyleAr?: HeroTextStyle;
  descriptionStyleAr?: HeroTextStyle;
}

export interface VisionContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: VisionCard[];
}

export interface AboutContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description1: string;
  description1_ar?: string;
  description2: string;
  description2_ar?: string;
  stats: StatCard[];
}

export interface ServicesContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: ServiceCard[];
}

export interface UsersContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: UserCard[];
}

export interface DataServicesContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  entities: DataEntity[];
}

export interface FooterContent {
  quickLinks: QuickLink[];
  externalLinks: QuickLink[];
  socialLinks: SocialLink[];
  authorityTitle?: string;
  authorityTitle_ar?: string;
  address?: string;
  address_ar?: string;
  phone?: string;
  phoneCaption?: string;
  phoneCaption_ar?: string;
  copyrightText?: string;
  copyrightText_ar?: string;
  legalLinks?: QuickLink[];
}

export interface LayerCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image: string;
  link?: string;
  detailedDescription?: string;
  detailedDescription_ar?: string;
  category?: string;
  category_ar?: string;
  lastUpdated?: string;
  source?: string;
  tags?: string[];
  tags_ar?: string[];
  mapLayerId?: string;
  previewSlot?: null | 1 | 2 | 3 | 4;
  // Extended GIS metadata
  dataFormat?: string;
  coordinateSystem?: string;
  coverageArea?: string;
  coverageArea_ar?: string;
  updateFrequency?: string;
  updateFrequency_ar?: string;
  dataType?: string;
  dataType_ar?: string;
  sourceAuthority?: string;
  sourceAuthority_ar?: string;
  usageApplications?: string;
  usageApplications_ar?: string;
  relatedLayers?: string[];
}

export interface LayersContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: LayerCard[];
}

export interface TechnologyCard {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  icon: string;
  category: string;
  category_ar?: string;
  tags?: string[];
  tags_ar?: string[];
  link?: string;
  previewSlot?: null | 1 | 2 | 3 | 4;
}

export interface TechnologiesContent extends SectionStyles {
  heading: string;
  heading_ar?: string;
  description: string;
  description_ar?: string;
  cards: TechnologyCard[];
}

export interface AuthContent {
  loginBackground: string;
}

interface ContentStore {
  hero: HeroContent;
  vision: VisionContent;
  about: AboutContent;
  statistics: StatisticsContent;
  services: ServicesContent;
  users: UsersContent;
  dataServices: DataServicesContent;
  footer: FooterContent;
  layers: LayersContent;
  news: NewsContent;
  mapView: MapViewContent;
  technologies: TechnologiesContent;
  auth: AuthContent;
  updateHero: (data: Partial<HeroContent>) => void;
  updateVision: (data: Partial<VisionContent>) => void;
  updateAbout: (data: Partial<AboutContent>) => void;
  updateStatistics: (data: Partial<StatisticsContent>) => void;
  updateServices: (data: Partial<ServicesContent>) => void;
  updateUsers: (data: Partial<UsersContent>) => void;
  updateDataServices: (data: Partial<DataServicesContent>) => void;
  updateFooter: (data: Partial<FooterContent>) => void;
  updateLayers: (data: Partial<LayersContent>) => void;
  updateNews: (data: Partial<NewsContent>) => void;
  updateMapView: (data: Partial<MapViewContent>) => void;
  updateTechnologies: (data: Partial<TechnologiesContent>) => void;
  updateAuth: (data: Partial<AuthContent>) => void;
}

// ============= Light, infrastructure-themed imagery (curated to match descriptions) =============
const IMG = {
  // Energy / utilities
  solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  windTurbines: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  powerLines: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
  pipeline: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
  oilGas: "https://images.unsplash.com/photo-1518306727298-4c17e1bf6e67?w=800&q=80",
  waterTreatment: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  districtCooling: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",

  // Roads / transport
  highway: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
  aerialRoad: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
  bridge: "https://images.unsplash.com/photo-1473073898421-f0fa0fffd5b8?w=800&q=80",
  bus: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
  airport: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  pavement: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=800&q=80",
  underground: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&q=80",

  // Buildings / urban
  industrialPlant: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  factory: "https://images.unsplash.com/photo-1581091012184-5c8c8d04bf2e?w=800&q=80",
  smartCity: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  blueprint: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  cityPlan: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  buildings: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  urbanPlan: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  zones: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800&q=80",
  addresses: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80",
  cadastral: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
  adminBoundary: bahrainMapView,
  heritage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
  university: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",

  // Tech / data
  telecomTower: "https://images.unsplash.com/photo-1532093268420-c391bccc8d6d?w=800&q=80",
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  serverNetwork: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=80",
  apiCode: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
  analyticsDashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  geoDashboard: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  decisionSupport: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  governance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  consoleAdmin: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  geoCatalog: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80",
  smartMap: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?w=800&q=80",
  geoIntelligence: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  partnership: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
  unifiedPortal: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",

  // Geo / nature
  satellite: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
  satelliteImagery: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800&q=80",
  terrain: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80",
  topographic: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  vegetation: "https://images.unsplash.com/photo-1597177884890-ed40ee93f0c6?w=800&q=80",
  greenspace: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",

  // People / institutions
  govtBuilding: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  hospital: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
  research: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
  developers: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  emergency: "https://images.unsplash.com/photo-1599301715049-72366c8a9e3a?w=800&q=80",
  population: "https://images.unsplash.com/photo-1519074069390-98277fc02a5c?w=800&q=80",
  construction: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",

  bahrainMap: bahrainMapView,
  loginBg: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
};

const OLD_BAHRAIN_MAP_URLS = [
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Bahrain_location_map.svg/1024px-Bahrain_location_map.svg.png",
];

export const defaultHero: HeroContent = {
  title1: "National Spatial",
  title1_ar: "البنية التحتية",
  title2: "Data Infrastructure",
  title2_ar: "للبيانات المكانية الوطنية",
  subtitle: "Unified geospatial platform for secure data and sharing,\nadvanced analytics, & intelligent decision-making",
  subtitle_ar: "منصة جغرافية موحّدة لمشاركة البيانات بشكل آمن،\nوتحليلات متقدمة وصنع قرارات ذكية",
  overlayOpacity: 30,
};

export const defaultVision: VisionContent = {
  heading: "BSDI Vision",
  heading_ar: "رؤية BSDI",
  description: "Empowering Bahrain through a unified geospatial ecosystem. Creating a secure, scalable, and collaborative national geospatial infrastructure.",
  description_ar: "تمكين البحرين من خلال منظومة جغرافية موحّدة، وبناء بنية تحتية وطنية آمنة وقابلة للتوسع وتعاونية.",
  cards: [
    { id: "v1", title: "Digital Transformation", title_ar: "التحول الرقمي", description: "Leveraging cutting-edge technologies to modernize Bahrain's infrastructure and drive innovation across all government sectors.", description_ar: "الاستفادة من أحدث التقنيات لتحديث البنية التحتية للبحرين ودفع الابتكار في جميع القطاعات الحكومية.", image: IMG.smartCity },
    { id: "v2", title: "Geospatial Intelligence", title_ar: "الذكاء الجغرافي", description: "Advanced GIS and GeoAI capabilities enable data-driven insights for strategic planning and resource management.", description_ar: "قدرات متقدمة في نظم المعلومات الجغرافية والذكاء الاصطناعي الجغرافي لتمكين رؤى مبنية على البيانات.", image: IMG.dataCenter },
    { id: "v3", title: "Smart Cities", title_ar: "المدن الذكية", description: "Building sustainable, connected urban environments through intelligent spatial planning and 3D visualization.", description_ar: "بناء بيئات حضرية مستدامة ومتصلة من خلال التخطيط المكاني الذكي والتصور ثلاثي الأبعاد.", image: IMG.cityPlan },
  ],
};

export const defaultAbout: AboutContent = {
  heading: "About BSDI",
  heading_ar: "حول BSDI",
  description1: "BSDI (Bahrain Spatial Data Infrastructure) is a unified geospatial platform designed to enable secure data sharing, advanced analytics, and intelligent decision-making across government and enterprise sectors.",
  description1_ar: "BSDI (البنية التحتية للبيانات المكانية في البحرين) هي منصة جغرافية موحّدة مصمّمة لتمكين مشاركة البيانات بشكل آمن، والتحليلات المتقدمة، وصنع القرارات الذكية في القطاعات الحكومية والمؤسسية.",
  description2: "It brings together GIS, GeoAI, BIM, and governance standards into a single digital ecosystem — ensuring data accuracy, security, and national-level interoperability.",
  description2_ar: "تجمع بين نظم المعلومات الجغرافية والذكاء الاصطناعي الجغرافي ونمذجة معلومات البناء ومعايير الحوكمة في منظومة رقمية واحدة، تضمن دقة البيانات والأمان والتشغيل البيني على المستوى الوطني.",
};

export const defaultStatistics: StatisticsContent = {
  enabled: true,
  heading: "BSDI by the Numbers",
  heading_ar: "BSDI بالأرقام",
  description: "Impact and growth of Bahrain's national geospatial infrastructure",
  description_ar: "تأثير ونمو البنية التحتية الوطنية للبيانات المكانية في البحرين",
  stats: [
    { id: "s1", target: "50", suffix: "+", label: "Government Agencies", label_ar: "جهة حكومية",
      icon: "Building2", description: "Connected national and local entities sharing spatial data.", description_ar: "جهات وطنية ومحلية متصلة لمشاركة البيانات المكانية.",
      trend: 12, trendDirection: "up",
      visualizationType: "graph", visualizationStyle: "gradient_area", useBrandColors: true,
      vizData: [22, 28, 31, 35, 40, 45, 50], vizLabels: ["19","20","21","22","23","24","25"], animationEnabled: true },
    { id: "s2", target: "1250", suffix: "+", label: "Spatial Layers", label_ar: "طبقة مكانية",
      icon: "Layers", description: "Curated GIS layers across infrastructure, environment & culture.", description_ar: "طبقات GIS منسّقة عبر البنية التحتية والبيئة والثقافة.",
      trend: 24, trendDirection: "up",
      visualizationType: "bar", visualizationStyle: "bar_vertical", useBrandColors: true,
      vizData: [400, 620, 780, 950, 1100, 1250], vizLabels: ["20","21","22","23","24","25"], animationEnabled: true },
    { id: "s3", target: "24", suffix: "/7", label: "Secure Infrastructure", label_ar: "بنية تحتية آمنة",
      icon: "ShieldCheck", description: "Always-on monitoring and managed cloud operations.", description_ar: "مراقبة دائمة وعمليات سحابية مُدارة.",
      trend: 0,
      visualizationType: "graph", visualizationStyle: "line_smooth", useBrandColors: true,
      vizData: [98, 99, 99.5, 99.7, 99.9, 99.9, 99.9], vizLabels: ["M","T","W","T","F","S","S"], animationEnabled: true },
    { id: "s4", target: "99.9", suffix: "%", label: "Data Availability", label_ar: "إتاحة البيانات",
      icon: "Activity", description: "Enterprise-grade SLA across all spatial services.", description_ar: "اتفاقيات مستوى خدمة على مستوى المؤسسات.",
      trend: 2, trendDirection: "up",
      visualizationType: "graph", visualizationStyle: "area", useBrandColors: true,
      vizData: [99.2, 99.4, 99.5, 99.7, 99.8, 99.9], animationEnabled: true },
    { id: "s5", target: "18", suffix: "%", label: "Annual Growth Rate", label_ar: "معدل النمو السنوي",
      icon: "TrendingUp", description: "Year-over-year expansion of datasets and integrations.", description_ar: "توسّع سنوي في مجموعات البيانات والتكاملات.",
      trend: 18, trendDirection: "up",
      visualizationType: "chart", visualizationStyle: "donut", useBrandColors: true,
      vizData: [40, 25, 20, 15], vizLabels: ["GIS","BIM","GeoAI","Other"], legendEnabled: true, animationEnabled: true },
    { id: "s6", target: "250", suffix: "TB", label: "Spatial Data Managed", label_ar: "بيانات مكانية مُدارة",
      icon: "Database", description: "Petabyte-ready storage tier for national geospatial assets.", description_ar: "تخزين جاهز للبيتابايت للأصول الجغرافية الوطنية.",
      trend: 30, trendDirection: "up",
      visualizationType: "bar", visualizationStyle: "bar_horizontal", useBrandColors: true,
      vizData: [60, 110, 170, 210, 250], vizLabels: ["21","22","23","24","25"], animationEnabled: true },
  ],
};

export const defaultServices: ServicesContent = {
  heading: "What BSDI Provides",
  heading_ar: "ما توفّره BSDI",
  description: "Comprehensive spatial intelligence solutions for modern government operations",
  description_ar: "حلول شاملة للذكاء المكاني للعمليات الحكومية الحديثة",
  cards: [
    { id: "sv1", link: "https://bsdi.gov.bh/admin-console", title: "BSDI Admin Console", title_ar: "وحدة تحكم BSDI", description: "To ensure secure, transparent, and efficient management of geospatial services across all government entities.", description_ar: "لضمان إدارة آمنة وشفافة وفعّالة للخدمات الجغرافية عبر جميع الجهات الحكومية.", image: IMG.consoleAdmin, tags: ["2D & 3D Maps", "Secure Access"], tags_ar: ["خرائط ثنائية وثلاثية", "وصول آمن"] },
    { id: "sv2", link: "https://bsdi.gov.bh/geocatalog", title: "National GeoCatalog Bahrain", title_ar: "الكتالوج الجغرافي الوطني", description: "To provide standardized metadata management aligned with SDI best practices and international standards.", description_ar: "لتوفير إدارة بيانات وصفية موحّدة وفق أفضل الممارسات والمعايير الدولية.", image: IMG.geoCatalog, tags: ["AI-Powered", "Spatial Analysis"], tags_ar: ["مدعوم بالذكاء الاصطناعي", "تحليل مكاني"] },
    { id: "sv3", link: "https://bsdi.gov.bh/smart-map", title: "BSDI Smart Map", title_ar: "خريطة BSDI الذكية", description: "To provide a user-friendly interface for viewing and analyzing government geospatial datasets.", description_ar: "لتوفير واجهة سهلة الاستخدام لعرض وتحليل مجموعات البيانات الجغرافية الحكومية.", image: IMG.smartMap, tags: ["3D Visualization", "Infrastructure"], tags_ar: ["تصور ثلاثي الأبعاد", "البنية التحتية"] },
    { id: "sv4", link: "https://bsdi.gov.bh/geointelligence", title: "GeoIntelligence Bahrain", title_ar: "الذكاء الجغرافي للبحرين", description: "To transform geospatial data into actionable intelligence through spatial modelling.", description_ar: "لتحويل البيانات الجغرافية إلى ذكاء قابل للتنفيذ عبر النمذجة المكانية.", image: IMG.geoIntelligence, tags: ["Role-Based Access", "Audit Logging"], tags_ar: ["وصول حسب الدور", "سجل التدقيق"] },
    { id: "sv5", link: "https://bsdi.gov.bh/data-analytics", title: "Data Analytics", title_ar: "تحليل البيانات", description: "Advanced insights through visual dashboards and data-driven decision making.", description_ar: "رؤى متقدمة عبر لوحات تحكم مرئية واتخاذ قرارات مبنية على البيانات.", image: IMG.analyticsDashboard, tags: ["Visual Dashboards", "Data-Driven"], tags_ar: ["لوحات مرئية", "مبني على البيانات"] },
    { id: "sv6", link: "https://bsdi.gov.bh/cloud-infrastructure", title: "Cloud Infrastructure", title_ar: "البنية التحتية السحابية", description: "Scalable platform with high availability and disaster recovery capabilities.", description_ar: "منصة قابلة للتوسع بإتاحة عالية وقدرات استعادة من الكوارث.", image: IMG.serverNetwork, tags: ["High Availability", "Disaster Recovery"], tags_ar: ["إتاحة عالية", "استعادة الكوارث"] },
    { id: "sv7", link: "https://bsdi.gov.bh/apis", title: "Spatial Data APIs & Services", title_ar: "واجهات وخدمات البيانات المكانية", description: "To enable seamless access, integration, and sharing of geospatial data through standardized APIs and web services.", description_ar: "لتمكين الوصول والتكامل ومشاركة البيانات الجغرافية عبر واجهات برمجة موحّدة وخدمات ويب.", image: IMG.apiCode, tags: ["APIs", "Data Sharing"], tags_ar: ["واجهات برمجة", "مشاركة البيانات"] },
    { id: "sv8", link: "https://bsdi.gov.bh/decision-support", title: "Decision Support Systems", title_ar: "أنظمة دعم القرار", description: "To empower government and stakeholders with data-driven insights for planning, monitoring, and strategic decision-making.", description_ar: "لتمكين الحكومة وأصحاب المصلحة برؤى مبنية على البيانات للتخطيط والرصد وصنع القرار الاستراتيجي.", image: IMG.decisionSupport, tags: ["Data-Driven", "Strategic Planning"], tags_ar: ["مبني على البيانات", "تخطيط استراتيجي"] },
  ],
};

export const defaultUsers: UsersContent = {
  heading: "Who Can Use BSDI?",
  heading_ar: "من يمكنه استخدام BSDI؟",
  description: "BSDI is designed for organizations that rely on accurate spatial data, secure collaboration, and intelligent insights.",
  description_ar: "صُمّمت BSDI للمؤسسات التي تعتمد على بيانات مكانية دقيقة وتعاون آمن ورؤى ذكية.",
  cards: [
    { id: "u1", title: "Government Authorities", title_ar: "الجهات الحكومية", description: "Empowering national and local government bodies with comprehensive GIS infrastructure for policy making, urban development, and citizen services.", description_ar: "تمكين الهيئات الحكومية الوطنية والمحلية ببنية تحتية شاملة لنظم المعلومات الجغرافية لصنع السياسات والتنمية الحضرية وخدمات المواطنين.", image: IMG.govtBuilding },
    { id: "u2", title: "Urban Planning Departments", title_ar: "إدارات التخطيط العمراني", description: "Strategic tools for city planners to visualize growth, manage land use, and create sustainable urban environments with data-driven insights.", description_ar: "أدوات استراتيجية لمخططي المدن لتصور النمو وإدارة استخدام الأراضي وإنشاء بيئات حضرية مستدامة.", image: IMG.urbanPlan },
    { id: "u3", title: "Infrastructure & Utilities", title_ar: "البنية التحتية والمرافق", description: "Manage critical infrastructure networks including water, electricity, telecommunications, and transportation with real-time spatial monitoring.", description_ar: "إدارة شبكات البنية التحتية الحيوية تشمل الماء والكهرباء والاتصالات والنقل بمراقبة مكانية فورية.", image: IMG.powerLines },
    { id: "u4", title: "Environmental Agencies", title_ar: "الهيئات البيئية", description: "Monitor environmental changes, track natural resources, and implement conservation strategies using advanced geospatial analysis tools.", description_ar: "رصد التغيرات البيئية وتتبع الموارد الطبيعية وتنفيذ استراتيجيات الحفاظ باستخدام أدوات تحليل جغرافي متقدمة.", image: IMG.solar },
    { id: "u5", title: "Transportation & Smart Cities", title_ar: "النقل والمدن الذكية", description: "Optimize traffic flow, plan public transit routes, and build intelligent city systems with integrated transportation data and analytics.", description_ar: "تحسين تدفق المرور وتخطيط مسارات النقل العام وبناء أنظمة مدن ذكية ببيانات نقل متكاملة.", image: IMG.aerialRoad },
    { id: "u6", title: "National Security & Emergency", title_ar: "الأمن الوطني والطوارئ", description: "Enhance response times and coordination during emergencies with real-time location intelligence and secure communication channels.", description_ar: "تحسين أوقات الاستجابة والتنسيق خلال الطوارئ بذكاء موقعي فوري وقنوات اتصال آمنة.", image: IMG.emergency },
    { id: "u7", title: "Developers & Private Enterprises", title_ar: "المطورون والشركات الخاصة", description: "Build innovative location-based applications and services using our comprehensive APIs and developer-friendly spatial data infrastructure.", description_ar: "بناء تطبيقات وخدمات مبتكرة مبنية على الموقع باستخدام واجهات برمجتنا الشاملة وبنية تحتية ودودة للمطورين.", image: IMG.developers },
    { id: "u8", title: "Research & Academia", title_ar: "البحث والأكاديميا", description: "Access high-quality spatial datasets for academic research, geographic studies, and educational programs in GIS and spatial sciences.", description_ar: "الوصول إلى مجموعات بيانات مكانية عالية الجودة للبحث الأكاديمي والدراسات الجغرافية والبرامج التعليمية.", image: IMG.research },
    { id: "u9", title: "Non-Governmental Organizations", title_ar: "المنظمات غير الحكومية", description: "Utilize geospatial data for humanitarian aid, community development, and environmental advocacy projects with localized spatial insights.", description_ar: "استخدام البيانات الجغرافية للمساعدات الإنسانية والتنمية المجتمعية ومشاريع الدفاع عن البيئة برؤى مكانية محلية.", image: IMG.partnership },
  ],
};

export const defaultDataServices: DataServicesContent = {
  heading: "Data Services Provided by",
  heading_ar: "خدمات البيانات المقدّمة من",
  description: "Find Data Services by their providing entities",
  description_ar: "ابحث عن خدمات البيانات حسب الجهات المقدّمة",
  entities: [
    { id: "d1", name: "Information & eGovernment Authority", name_ar: "هيئة المعلومات والحكومة الإلكترونية", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f605a5e591189376365a30f4b95cd45df42b30e8.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d2", name: "Survey and Land Registration Bureau", name_ar: "جهاز المساحة والتسجيل العقاري", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/727daca89e21026342142442add6c9766c555cbb.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d3", name: "Social Insurance Organization", name_ar: "هيئة التأمين الاجتماعي", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f1c6e9c2249bcaeb1e3018078696afc3cfcf52d0.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d4", name: "Tender Board", name_ar: "مجلس المناقصات", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/01f965fdea88f9f7d0cced4e43fd8e495d4ffef2.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d5", name: "Ministry of Foreign Affairs", name_ar: "وزارة الخارجية", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f19352d4f262cdb0f5fc7260253177e0bfaae583.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d6", name: "Ministry of Industry and Commerce", name_ar: "وزارة الصناعة والتجارة", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d0a3949086d392f40ff1edc155daf8aa8b1bcd3b.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d7", name: "Ministry of Transportation and Telecommunications", name_ar: "وزارة المواصلات والاتصالات", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d6aa7287fb342a673e97a0e070843e01698abdc2.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
    { id: "d8", name: "Ministry of Interior", name_ar: "وزارة الداخلية", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/8f93324345cc3e00b8122973bbc8251a16de98d9.png", link: "https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" },
  ],
};

export const defaultFooter: FooterContent = {
  authorityTitle: "Information & eGovernment Authority",
  authorityTitle_ar: "هيئة المعلومات والحكومة الإلكترونية",
  address: "P.O. Box 33305,\nManama - Kingdom of Bahrain",
  address_ar: "ص.ب 33305،\nالمنامة - مملكة البحرين",
  phone: "8000 8001",
  phoneCaption: "(Government Services Contact Center)",
  phoneCaption_ar: "(مركز الاتصال للخدمات الحكومية)",
  copyrightText: "© 2026 Information & eGovernment Authority, Bahrain.",
  copyrightText_ar: "© 2026 هيئة المعلومات والحكومة الإلكترونية، البحرين.",
  legalLinks: [
    { id: "lg1", label: "TERMS OF USE", label_ar: "شروط الاستخدام", href: "#" },
    { id: "lg2", label: "PRIVACY POLICY", label_ar: "سياسة الخصوصية", href: "#" },
    { id: "lg3", label: "DISCLAIMER", label_ar: "إخلاء المسؤولية", href: "#" },
  ],
  quickLinks: [
    { id: "ql1", label: "Chief Executive Message", label_ar: "كلمة الرئيس التنفيذي", href: "#" },
    { id: "ql2", label: "Vision & Mission", label_ar: "الرؤية والرسالة", href: "#" },
    { id: "ql3", label: "Our Strategy", label_ar: "استراتيجيتنا", href: "#" },
    { id: "ql4", label: "Operations & Governance", label_ar: "العمليات والحوكمة", href: "#" },
    { id: "ql5", label: "Digital Transformation", label_ar: "التحول الرقمي", href: "#" },
    { id: "ql6", label: "Statistics & Population", label_ar: "الإحصاءات والسكان", href: "#" },
    { id: "ql7", label: "eParticipation", label_ar: "المشاركة الإلكترونية", href: "#" },
    { id: "ql8", label: "Emerging Technologies", label_ar: "التقنيات الناشئة", href: "#" },
    { id: "ql9", label: "Digital Twinning Overview", label_ar: "نظرة عامة على التوأمة الرقمية", href: "#" },
    { id: "ql10", label: "Photo Gallery", label_ar: "معرض الصور", href: "#" },
    { id: "ql11", label: "Conferences", label_ar: "المؤتمرات", href: "#" },
    { id: "ql12", label: "Contact", label_ar: "اتصل بنا", href: "#" },
    { id: "ql13", label: "Sitemap", label_ar: "خريطة الموقع", href: "#" },
  ],
  externalLinks: [
    { id: "el1", label: "GCC Statistical Center", label_ar: "المركز الإحصائي الخليجي", href: "https://gccstat.org" },
    { id: "el2", label: "SHAREKNA", label_ar: "شاركنا", href: "https://www.sharekna.bh" },
  ],
  socialLinks: [
    { platform: "Instagram", href: "#" },
    { platform: "Twitter", href: "#" },
    { platform: "Facebook", href: "#" },
    { platform: "LinkedIn", href: "#" },
    { platform: "YouTube", href: "#" },
  ],
};

export const defaultLayers: LayersContent = {
  heading: "Layers",
  heading_ar: "الطبقات",
  description: "Explore the spatial datasets and thematic layers powering Bahrain's geospatial intelligence.",
  description_ar: "استكشف مجموعات البيانات المكانية والطبقات الموضوعية التي تشغّل الذكاء الجغرافي للبحرين.",
  cards: [
    { id: "l1", previewSlot: 1, title: "ADDRESSES", title_ar: "العناوين", description: "Standardized address points across Bahrain.", description_ar: "نقاط عناوين موحّدة في جميع أنحاء البحرين.", image: IMG.addresses, link: "#",
      detailedDescription: "Standardized national address points across Bahrain used for navigation, utility services, emergency response, and municipal operations. Includes building numbers, street names, block identifiers, and geographic coordinates for accurate spatial referencing and location intelligence.",
      detailedDescription_ar: "نقاط العناوين الوطنية الموحدة عبر البحرين والمستخدمة للتنقل وخدمات المرافق والاستجابة للطوارئ والعمليات البلدية. تتضمن أرقام المباني وأسماء الشوارع ومعرفات المجمعات والإحداثيات الجغرافية لمرجعية مكانية دقيقة.",
      category: "Infrastructure", category_ar: "البنية التحتية", lastUpdated: "2025-09-01", source: "BSDI",
      tags: ["Address", "Location", "GIS"], tags_ar: ["عنوان", "موقع", "نظم معلومات جغرافية"],
      dataFormat: "GeoJSON / Shapefile", coordinateSystem: "WGS 84",
      coverageArea: "Kingdom of Bahrain", coverageArea_ar: "مملكة البحرين",
      updateFrequency: "Monthly", updateFrequency_ar: "شهرياً",
      dataType: "Point", dataType_ar: "نقطة",
      sourceAuthority: "BSDI", sourceAuthority_ar: "البنية التحتية للبيانات المكانية",
      usageApplications: "Navigation, utility billing, emergency dispatch, municipal services, e-government delivery.",
      usageApplications_ar: "التنقل، وفوترة المرافق، وإرسال الطوارئ، والخدمات البلدية، وتقديم الحكومة الإلكترونية.",
      relatedLayers: ["BUILDINGS", "BUS ROUTE", "ADMINBOUNDRY"] },
    { id: "l2", previewSlot: 2, title: "ADMINBOUNDRY", title_ar: "الحدود الإدارية", description: "Administrative boundaries and governorate divisions.", description_ar: "الحدود الإدارية وتقسيمات المحافظات.", image: IMG.adminBoundary, link: "#",
      detailedDescription: "Administrative boundary dataset representing governorates, municipalities, districts, and planning sectors across Bahrain. Supports governance, land management, demographic analysis, and regional planning workflows within GIS systems.",
      detailedDescription_ar: "مجموعة بيانات الحدود الإدارية التي تمثل المحافظات والبلديات والمناطق وقطاعات التخطيط في البحرين. تدعم الحوكمة وإدارة الأراضي والتحليل الديموغرافي وسير عمل التخطيط الإقليمي.",
      category: "Governance", category_ar: "الحوكمة", lastUpdated: "2025-08-15", source: "BSDI",
      tags: ["Boundary", "Governorate", "Planning"], tags_ar: ["حدود", "محافظة", "تخطيط"],
      dataFormat: "GeoJSON / Shapefile", coordinateSystem: "WGS 84",
      coverageArea: "Kingdom of Bahrain", coverageArea_ar: "مملكة البحرين",
      updateFrequency: "Quarterly", updateFrequency_ar: "ربع سنوي",
      dataType: "Polygon", dataType_ar: "مضلع",
      sourceAuthority: "BSDI", sourceAuthority_ar: "البنية التحتية للبيانات المكانية",
      usageApplications: "Administrative governance, demographics, land-use planning, electoral districting, statistical aggregation.",
      usageApplications_ar: "الحوكمة الإدارية، والتركيبة السكانية، وتخطيط استخدام الأراضي، والتقسيم الانتخابي، والتجميع الإحصائي.",
      relatedLayers: ["APPROVED_ZONES", "ADDRESSES"] },
    { id: "l3", previewSlot: 3, title: "APPROVED_ZONES", title_ar: "المناطق المعتمدة", description: "Officially approved planning and development zones.", description_ar: "مناطق التخطيط والتطوير المعتمدة رسمياً.", image: IMG.zones, link: "#",
      detailedDescription: "Officially approved zoning and planning areas designated for residential, commercial, industrial, and mixed-use developments. Helps urban planners and authorities monitor land-use regulations and future development strategies.",
      detailedDescription_ar: "مناطق التخطيط المعتمدة رسمياً والمخصصة للتطوير السكني والتجاري والصناعي ومتعدد الاستخدامات. تساعد مخططي المدن والسلطات في رصد لوائح استخدام الأراضي واستراتيجيات التطوير المستقبلية.",
      category: "Urban Planning", category_ar: "التخطيط العمراني", lastUpdated: "2025-07-20", source: "BSDI",
      tags: ["Zoning", "Land Use", "Planning"], tags_ar: ["تقسيم مناطق", "استخدام الأراضي", "تخطيط"],
      dataFormat: "GeoJSON / Shapefile", coordinateSystem: "WGS 84",
      coverageArea: "Kingdom of Bahrain", coverageArea_ar: "مملكة البحرين",
      updateFrequency: "Quarterly", updateFrequency_ar: "ربع سنوي",
      dataType: "Polygon", dataType_ar: "مضلع",
      sourceAuthority: "BSDI", sourceAuthority_ar: "البنية التحتية للبيانات المكانية",
      usageApplications: "Urban development, regulatory compliance, investment planning, infrastructure rollout.",
      usageApplications_ar: "التنمية العمرانية، والامتثال التنظيمي، وتخطيط الاستثمار، ونشر البنية التحتية.",
      relatedLayers: ["ADMINBOUNDRY", "BUILDINGS"] },
    { id: "l4", previewSlot: 4, title: "BACA", title_ar: "هيئة الثقافة والآثار", description: "Bahrain Authority for Culture & Antiquities sites.", description_ar: "مواقع هيئة البحرين للثقافة والآثار.", image: IMG.heritage, link: "#",
      detailedDescription: "Spatial dataset containing Bahrain Authority for Culture & Antiquities locations including heritage sites, museums, archaeological zones, and cultural landmarks. Supports tourism planning, preservation activities, and public cultural awareness initiatives.",
      detailedDescription_ar: "مجموعة بيانات مكانية تحتوي على مواقع هيئة البحرين للثقافة والآثار بما في ذلك المواقع التراثية والمتاحف والمناطق الأثرية والمعالم الثقافية. تدعم تخطيط السياحة وأنشطة الحفظ ومبادرات التوعية الثقافية.",
      category: "Culture & Heritage", category_ar: "الثقافة والتراث", lastUpdated: "2025-06-10", source: "BACA",
      tags: ["Heritage", "Culture", "Tourism"], tags_ar: ["تراث", "ثقافة", "سياحة"],
      dataFormat: "GeoJSON / Shapefile", coordinateSystem: "WGS 84",
      coverageArea: "Kingdom of Bahrain", coverageArea_ar: "مملكة البحرين",
      updateFrequency: "Annually", updateFrequency_ar: "سنوياً",
      dataType: "Point / Polygon", dataType_ar: "نقطة / مضلع",
      sourceAuthority: "Bahrain Authority for Culture & Antiquities", sourceAuthority_ar: "هيئة البحرين للثقافة والآثار",
      usageApplications: "Tourism, heritage conservation, cultural programs, education, archaeological research.",
      usageApplications_ar: "السياحة، والحفاظ على التراث، والبرامج الثقافية، والتعليم، والأبحاث الأثرية.",
      relatedLayers: ["BUILDINGS", "ADMINBOUNDRY"] },
    { id: "l5", title: "BBU", title_ar: "جامعة بيان البحرين", description: "Bahrain Bayan University campus and facilities.", description_ar: "حرم ومرافق جامعة بيان البحرين.", image: IMG.university, link: "#" },
    { id: "l6", title: "BIX", title_ar: "نقطة تبادل الإنترنت", description: "Bahrain Internet Exchange node locations.", description_ar: "مواقع عقد تبادل الإنترنت في البحرين.", image: IMG.serverNetwork, link: "#" },
    { id: "l7", title: "BOTANICAL_ATLAS", title_ar: "الأطلس النباتي", description: "Native flora and botanical reference data.", description_ar: "بيانات الغطاء النباتي المحلي والمرجعية النباتية.", image: IMG.vegetation, link: "#" },
    { id: "l8", title: "BUILDINGS", title_ar: "المباني", description: "Building footprints and structure inventory.", description_ar: "مساحات المباني وحصر المنشآت.", image: IMG.buildings, link: "#" },
    { id: "l9", title: "BUS ROUTE", title_ar: "مسارات الحافلات", description: "Public bus routes and transit corridors.", description_ar: "مسارات الحافلات العامة وممرات النقل.", image: IMG.bus, link: "#" },
    { id: "l10", title: "CAA", title_ar: "هيئة الطيران المدني", description: "Civil Aviation Authority airspace data.", description_ar: "بيانات المجال الجوي لهيئة الطيران المدني.", image: IMG.airport, link: "#" },
    { id: "l11", title: "CADASTRAL", title_ar: "المساحة العقارية", description: "Land parcels and cadastral survey records.", description_ar: "قطع الأراضي وسجلات المساحة العقارية.", image: IMG.cadastral, link: "#" },
    { id: "l12", title: "DISTRICT_COOLING", title_ar: "التبريد المركزي", description: "District cooling network infrastructure.", description_ar: "البنية التحتية لشبكة التبريد المركزي.", image: IMG.districtCooling, link: "#" },
    { id: "l13", title: "DTM", title_ar: "نموذج التضاريس الرقمي", description: "Digital terrain model elevation data.", description_ar: "بيانات ارتفاع نموذج التضاريس الرقمي.", image: IMG.terrain, link: "#" },
    { id: "l14", title: "DUBAISAT2011", title_ar: "صور الأقمار الصناعية", description: "Satellite imagery base layer over Bahrain.", description_ar: "طبقة صور الأقمار الصناعية على البحرين.", image: IMG.satelliteImagery, link: "#" },
    { id: "l15", title: "ELECTRICITYANDWATER", title_ar: "الكهرباء والماء", description: "Electricity and water utility networks.", description_ar: "شبكات مرافق الكهرباء والماء.", image: IMG.powerLines, link: "#" },
    { id: "l16", title: "EWA_EDD", title_ar: "توزيع الكهرباء", description: "EWA electricity distribution division assets.", description_ar: "أصول قسم توزيع الكهرباء.", image: IMG.powerLines, link: "#" },
    { id: "l17", title: "HEALTHSERVICES", title_ar: "الخدمات الصحية", description: "Hospitals, clinics and healthcare facilities.", description_ar: "المستشفيات والعيادات والمرافق الصحية.", image: IMG.hospital, link: "#" },
    { id: "l18", title: "OIL_GAS", title_ar: "النفط والغاز", description: "Oil and gas fields, pipelines and assets.", description_ar: "حقول النفط والغاز والأنابيب والأصول.", image: IMG.oilGas, link: "#" },
    { id: "l19", title: "PAVEMENTS", title_ar: "الأرصفة", description: "Pavement condition and surface inventory.", description_ar: "حالة الأرصفة وحصر الأسطح.", image: IMG.pavement, link: "#" },
    { id: "l20", title: "POPULATION_DEMOGRAPHY", title_ar: "السكان والديموغرافيا", description: "Population density and demographic layers.", description_ar: "كثافة السكان والطبقات الديموغرافية.", image: IMG.population, link: "#" },
    { id: "l21", title: "ROAD_DUCTS", title_ar: "قنوات الطرق", description: "Underground road duct network.", description_ar: "شبكة قنوات الطرق تحت الأرض.", image: IMG.underground, link: "#" },
    { id: "l22", title: "SEWERAGEANDDRAINAGE", title_ar: "الصرف الصحي", description: "Sewerage and stormwater drainage network.", description_ar: "شبكة الصرف الصحي ومياه الأمطار.", image: IMG.waterTreatment, link: "#" },
    { id: "l23", title: "STREETCENTERLINES", title_ar: "محاور الشوارع", description: "Street centerline reference network.", description_ar: "شبكة مرجعية لمحاور الشوارع.", image: IMG.aerialRoad, link: "#" },
    { id: "l24", title: "TELECOM", title_ar: "الاتصالات", description: "Telecommunications infrastructure layer.", description_ar: "طبقة البنية التحتية للاتصالات.", image: IMG.telecomTower, link: "#" },
    { id: "l25", title: "TOPOGRAPHIC", title_ar: "الطبوغرافيا", description: "Topographic base map of Bahrain.", description_ar: "خريطة الأساس الطبوغرافية للبحرين.", image: IMG.topographic, link: "#" },
    { id: "l26", title: "VEGETATION", title_ar: "الغطاء النباتي", description: "Vegetation cover and green space mapping.", description_ar: "تخطيط الغطاء النباتي والمساحات الخضراء.", image: IMG.greenspace, link: "#" },
    { id: "l27", title: "ZONES", title_ar: "المناطق", description: "Land use and planning zone classification.", description_ar: "تصنيف استخدام الأراضي ومناطق التخطيط.", image: IMG.zones, link: "#" },
  ],
};

export const defaultNews: NewsContent = {
  heading: "Latest News",
  heading_ar: "آخر الأخبار",
  description: "Stay informed with the latest updates, announcements and milestones from BSDI and the Information & eGovernment Authority.",
  description_ar: "ابقَ على اطلاع بآخر التحديثات والإعلانات والإنجازات من BSDI وهيئة المعلومات والحكومة الإلكترونية.",
  items: [
    { id: "n1", previewSlot: 1, title: "BSDI launches unified geospatial portal", title_ar: "BSDI تطلق البوابة الجغرافية الموحّدة", excerpt: "A new unified portal centralises spatial datasets across all government entities for streamlined access and analytics.", excerpt_ar: "بوابة موحّدة جديدة تجمع مجموعات البيانات المكانية عبر جميع الجهات الحكومية لتسهيل الوصول والتحليلات.", date: "Apr 22, 2026", image: IMG.unifiedPortal, link: "#" },
    { id: "n2", previewSlot: 2, title: "Bahrain advances Smart City initiative", title_ar: "البحرين تقدّم مبادرة المدينة الذكية", excerpt: "Smart city programmes accelerate as new 3D mapping and IoT integration come online across key urban districts.", excerpt_ar: "تتسارع برامج المدن الذكية مع إطلاق خرائط ثلاثية الأبعاد جديدة وتكامل إنترنت الأشياء في الأحياء الرئيسية.", date: "Apr 10, 2026", image: IMG.smartCity, link: "#" },
    { id: "n3", previewSlot: 3, title: "New partnership for open spatial data", title_ar: "شراكة جديدة للبيانات المكانية المفتوحة", excerpt: "BSDI partners with national agencies to expand the open data catalogue and improve cross-sector collaboration.", excerpt_ar: "BSDI تتشارك مع الجهات الوطنية لتوسيع كتالوج البيانات المفتوحة وتحسين التعاون بين القطاعات.", date: "Mar 28, 2026", image: IMG.partnership, link: "#" },
    { id: "n4", previewSlot: 4, title: "Solar & energy infrastructure mapped nationwide", title_ar: "تخطيط البنية التحتية للطاقة الشمسية على المستوى الوطني", excerpt: "New layers visualise renewable energy assets and grid infrastructure to support sustainability planning.", excerpt_ar: "طبقات جديدة تصوّر أصول الطاقة المتجددة والبنية التحتية للشبكة لدعم تخطيط الاستدامة.", date: "Mar 14, 2026", image: IMG.solar, link: "#" },
  ],
};

export const defaultMapView: MapViewContent = {
  heading: "Bahrain Map View",
  heading_ar: "خريطة البحرين",
  description: "Visualise spatial datasets, infrastructure and zones interactively across the Kingdom of Bahrain.",
  description_ar: "تصوّر مجموعات البيانات المكانية والبنية التحتية والمناطق بشكل تفاعلي في مملكة البحرين.",
  ctaLabel: "Open Map View",
  ctaLabel_ar: "افتح الخريطة",
  ctaHref: "/map",
  previewImage: IMG.bahrainMap,
};

export const defaultTechnologies: TechnologiesContent = {
  heading: "Technologies",
  heading_ar: "التقنيات",
  description: "Powering BSDI with modern GIS platforms, cloud infrastructure, analytics, AI, and enterprise technologies.",
  description_ar: "تشغيل BSDI بمنصات نظم المعلومات الجغرافية الحديثة والبنية السحابية والتحليلات والذكاء الاصطناعي وتقنيات المؤسسات.",
  cards: [
    { id: "t1", previewSlot: 1, title: "ArcGIS Enterprise", title_ar: "ArcGIS Enterprise", description: "Enterprise GIS platform for publishing and managing spatial services.", description_ar: "منصة نظم معلومات جغرافية مؤسسية لنشر وإدارة الخدمات المكانية.", icon: "https://cdn.simpleicons.org/arcgis/0079C1", category: "GIS", category_ar: "نظم معلومات جغرافية", tags: ["Enterprise", "GIS"], tags_ar: ["مؤسسي", "نظم معلومات جغرافية"], link: "" },
    { id: "t2", previewSlot: 2, title: "ArcGIS Pro", title_ar: "ArcGIS Pro", description: "Desktop application for GIS data creation, editing, and analysis.", description_ar: "تطبيق سطح المكتب لإنشاء بيانات نظم المعلومات الجغرافية وتحريرها وتحليلها.", icon: "https://cdn.simpleicons.org/arcgis/0079C1", category: "GIS", category_ar: "نظم معلومات جغرافية", tags: ["Desktop", "Analysis"], tags_ar: ["سطح المكتب", "تحليل"], link: "" },
    { id: "t3", previewSlot: 3, title: "PostgreSQL + PostGIS", title_ar: "PostgreSQL + PostGIS", description: "Spatial database for storing and managing geospatial data.", description_ar: "قاعدة بيانات مكانية لتخزين وإدارة البيانات الجغرافية.", icon: "https://cdn.simpleicons.org/postgresql/4169E1", category: "Database", category_ar: "قاعدة بيانات", tags: ["Spatial", "SQL"], tags_ar: ["مكاني", "SQL"], link: "" },
    { id: "t4", previewSlot: 4, title: "React", title_ar: "React", description: "Frontend framework for building responsive web applications.", description_ar: "إطار عمل واجهة أمامية لبناء تطبيقات ويب متجاوبة.", icon: "https://cdn.simpleicons.org/react/61DAFB", category: "Frontend", category_ar: "واجهة أمامية", tags: ["UI", "Web"], tags_ar: ["واجهة", "ويب"], link: "" },
    { id: "t5", title: "FME", title_ar: "FME", description: "Data integration and transformation workflows for multiple systems.", description_ar: "تكامل البيانات وتحويلها عبر أنظمة متعددة.", icon: "https://cdn.simpleicons.org/safe/0091EA", category: "Integration", category_ar: "تكامل", tags: ["ETL", "Integration"], tags_ar: ["ETL", "تكامل"], link: "" },
    { id: "t6", title: "REST APIs", title_ar: "واجهات REST", description: "Integration layer for system communication and data exchange.", description_ar: "طبقة تكامل لتواصل الأنظمة وتبادل البيانات.", icon: "https://cdn.simpleicons.org/openapiinitiative/6BA539", category: "APIs", category_ar: "واجهات برمجة", tags: ["REST", "Integration"], tags_ar: ["REST", "تكامل"], link: "" },
    { id: "t7", title: "Dashboard & Reporting", title_ar: "لوحات ومعلومات", description: "Interactive dashboards for monitoring project activities and KPIs.", description_ar: "لوحات تفاعلية لمراقبة أنشطة المشاريع ومؤشرات الأداء.", icon: "https://cdn.simpleicons.org/grafana/F46800", category: "Analytics", category_ar: "تحليلات", tags: ["Dashboards", "KPIs"], tags_ar: ["لوحات", "مؤشرات"], link: "" },
    { id: "t8", title: "Spatial Analytics", title_ar: "التحليلات المكانية", description: "GIS-based analysis and visualization of spatial information.", description_ar: "تحليل وتصور المعلومات المكانية باستخدام نظم المعلومات الجغرافية.", icon: "https://cdn.simpleicons.org/qgis/589632", category: "Analytics", category_ar: "تحليلات", tags: ["Spatial", "GIS"], tags_ar: ["مكاني", "GIS"], link: "" },
    { id: "t9", title: "GeoAI", title_ar: "الذكاء الجغرافي", description: "AI-assisted spatial analysis and image interpretation.", description_ar: "تحليل مكاني وتفسير صور بمساعدة الذكاء الاصطناعي.", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00", category: "AI", category_ar: "ذكاء اصطناعي", tags: ["AI", "ML"], tags_ar: ["ذكاء اصطناعي", "تعلم آلي"], link: "" },
    { id: "t10", title: "AWS Cloud", title_ar: "سحابة AWS", description: "Cloud infrastructure hosting and deployment environment.", description_ar: "بيئة استضافة ونشر للبنية السحابية.", icon: "https://cdn.simpleicons.org/amazonaws/FF9900", category: "Cloud", category_ar: "سحابة", tags: ["Cloud", "Hosting"], tags_ar: ["سحابة", "استضافة"], link: "" },
    { id: "t11", title: "Role-Based Access", title_ar: "وصول قائم على الأدوار", description: "Secure access control and user permission management.", description_ar: "تحكم آمن في الوصول وإدارة صلاحيات المستخدمين.", icon: "https://cdn.simpleicons.org/keycloak/4D4D4D", category: "Security", category_ar: "أمان", tags: ["Auth", "Security"], tags_ar: ["مصادقة", "أمان"], link: "" },
    { id: "t12", title: "Web GIS Services", title_ar: "خدمات Web GIS", description: "Web-based access to maps, layers, and geospatial services.", description_ar: "وصول عبر الويب للخرائط والطبقات والخدمات الجغرافية.", icon: "https://cdn.simpleicons.org/leaflet/199900", category: "GIS", category_ar: "نظم معلومات جغرافية", tags: ["Web", "Maps"], tags_ar: ["ويب", "خرائط"], link: "" },
  ],
};

export const defaultAuth: AuthContent = {
  loginBackground: IMG.loginBg,
};

const OLD_MAP_HEADINGS = ["Explore Bahrain on the Map"];

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      hero: defaultHero,
      vision: defaultVision,
      about: defaultAbout,
      statistics: defaultStatistics,
      services: defaultServices,
      users: defaultUsers,
      dataServices: defaultDataServices,
      footer: defaultFooter,
      layers: defaultLayers,
      news: defaultNews,
      mapView: defaultMapView,
      technologies: defaultTechnologies,
      auth: defaultAuth,
      updateHero: (data) => set((s) => ({ hero: { ...s.hero, ...data } })),
      updateVision: (data) => set((s) => ({ vision: { ...s.vision, ...data } })),
      updateAbout: (data) => set((s) => ({ about: { ...s.about, ...data } })),
      updateStatistics: (data) => set((s) => ({ statistics: { ...s.statistics, ...data } })),
      updateServices: (data) => set((s) => ({ services: { ...s.services, ...data } })),
      updateUsers: (data) => set((s) => ({ users: { ...s.users, ...data } })),
      updateDataServices: (data) => set((s) => ({ dataServices: { ...s.dataServices, ...data } })),
      updateFooter: (data) => set((s) => ({ footer: { ...s.footer, ...data } })),
      updateLayers: (data) => set((s) => ({ layers: { ...s.layers, ...data } })),
      updateNews: (data) => set((s) => ({ news: { ...s.news, ...data } })),
      updateMapView: (data) => set((s) => ({ mapView: { ...s.mapView, ...data } })),
      updateTechnologies: (data) => set((s) => ({ technologies: { ...s.technologies, ...data } })),
      updateAuth: (data) => set((s) => ({ auth: { ...s.auth, ...data } })),
    }),
    {
      name: "bsdi-content",
      version: 14,
      migrate: (persisted: any, version: number) => {
        if (persisted?.hero && version < 5) {
          persisted.hero.heroImages = [];
        }
        if (version < 6) {
          if (persisted?.services) delete persisted.services.cards;
          if (persisted?.layers) delete persisted.layers.cards;
          if (persisted?.news) delete persisted.news.items;
          if (persisted?.users) delete persisted.users.cards;
          if (persisted?.vision) delete persisted.vision.cards;
        }
        if (version < 7) {
          if (persisted?.layers) delete persisted.layers.cards;
        }
        if (version < 8) {
          if (persisted?.footer) delete persisted.footer;
        }
        if (version < 9) {
          if (persisted?.about) delete persisted.about;
        }
        if (version < 10) {
          // Reset news + layers so previewSlot defaults take effect
          if (persisted?.news) delete persisted.news.items;
          if (persisted?.layers) delete persisted.layers.cards;
        }
        if (version < 11) {
          if (persisted?.technologies) delete persisted.technologies;
        }
        if (version < 12) {
          // Reset layers so new GIS metadata defaults take effect
          if (persisted?.layers) delete persisted.layers.cards;
        }
        if (version < 13) {
          // Reset about stats so new richer KPI defaults take effect
          if (persisted?.about) delete persisted.about.stats;
        }
        if (version < 14) {
          // Move stats from about to standalone statistics
          if (persisted?.about?.stats) {
            persisted.statistics = { ...defaultStatistics, stats: persisted.about.stats };
            delete persisted.about.stats;
          }
        }
        return persisted;
      },
      merge: (persisted: any, current: any) => {
        const merged = { ...current, ...(persisted || {}) };
        if (persisted?.vision?.cards) {
          const persistedIds = new Set(persisted.vision.cards.map((c: any) => c.id));
          const newDefaults = defaultVision.cards.filter((c) => !persistedIds.has(c.id));
          merged.vision = { ...defaultVision, ...persisted.vision, cards: [...persisted.vision.cards, ...newDefaults] };
        } else {
          merged.vision = { ...defaultVision, ...(persisted?.vision || {}), cards: defaultVision.cards };
        }
        if (!persisted?.services?.cards) merged.services = { ...defaultServices, ...(persisted?.services || {}), cards: defaultServices.cards };
        if (!persisted?.users?.cards) merged.users = { ...defaultUsers, ...(persisted?.users || {}), cards: defaultUsers.cards };
        if (!persisted?.layers?.cards) merged.layers = { ...defaultLayers, ...(persisted?.layers || {}), cards: defaultLayers.cards };
        if (!persisted?.about) merged.about = defaultAbout;
        if (!persisted?.statistics?.stats) merged.statistics = { ...defaultStatistics, ...(persisted?.statistics || {}), stats: defaultStatistics.stats };
        if (!persisted?.news?.items) {
          merged.news = { ...defaultNews, ...(persisted?.news || {}), items: defaultNews.items };
        } else {
          const persistedIds = new Set(persisted.news.items.map((i: any) => i.id));
          const newItems = defaultNews.items.filter((i) => !persistedIds.has(i.id));
          merged.news = { ...defaultNews, ...persisted.news, items: [...persisted.news.items, ...newItems] };
        }
        if (!persisted?.dataServices?.entities) {
          merged.dataServices = { ...defaultDataServices, ...(persisted?.dataServices || {}), entities: defaultDataServices.entities };
        }
        if (!persisted?.mapView) merged.mapView = defaultMapView;
        if (persisted?.mapView && OLD_MAP_HEADINGS.includes(persisted.mapView.heading)) {
          merged.mapView = { ...merged.mapView, heading: defaultMapView.heading, heading_ar: defaultMapView.heading_ar, description: defaultMapView.description, description_ar: defaultMapView.description_ar };
        }
        if (persisted?.mapView && OLD_BAHRAIN_MAP_URLS.includes(persisted.mapView.previewImage)) {
          merged.mapView = { ...merged.mapView, previewImage: defaultMapView.previewImage };
        }
        if (!persisted?.auth) merged.auth = defaultAuth;
        if (!persisted?.technologies?.cards) {
          merged.technologies = { ...defaultTechnologies, ...(persisted?.technologies || {}), cards: defaultTechnologies.cards };
        }
        return merged;
      },
    }
  )
);
