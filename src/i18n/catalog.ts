export const supportedLocales = ["en", "ar"] as const;

export type Locale = (typeof supportedLocales)[number];

interface TranslationCatalog {
  brand: {
    admin: string;
  };
  navigation: {
    primaryLabel: string;
    overview: string;
  };
  overview: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export const catalog = {
  en: {
    brand: {
      admin: "Admin",
    },
    navigation: {
      primaryLabel: "Primary navigation",
      overview: "Overview",
    },
    overview: {
      eyebrow: "Operations workspace",
      title: "Overview",
      description:
        "Atlazora Admin provides the presentation foundation for authenticated operational workflows.",
    },
  },
  ar: {
    brand: {
      admin: "الإدارة",
    },
    navigation: {
      primaryLabel: "التنقل الرئيسي",
      overview: "نظرة عامة",
    },
    overview: {
      eyebrow: "مساحة العمليات",
      title: "نظرة عامة",
      description:
        "توفر Atlazora Admin أساس واجهة العرض لسير العمل التشغيلي الموثق.",
    },
  },
} satisfies Record<Locale, TranslationCatalog>;
