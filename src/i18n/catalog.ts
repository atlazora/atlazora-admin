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
  errorBoundary: {
    eyebrow: string;
    title: string;
    description: string;
    reloadAction: string;
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
    errorBoundary: {
      eyebrow: "Application error",
      title: "The admin workspace could not be displayed",
      description:
        "Reload the workspace to recover from this unexpected display error.",
      reloadAction: "Reload workspace",
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
    errorBoundary: {
      eyebrow: "خطأ في التطبيق",
      title: "تعذر عرض مساحة الإدارة",
      description: "أعد تحميل مساحة الإدارة للتعافي من خطأ العرض غير المتوقع.",
      reloadAction: "إعادة تحميل المساحة",
    },
  },
} satisfies Record<Locale, TranslationCatalog>;
