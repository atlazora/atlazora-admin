import type { Locale } from "./catalog";

export type DocumentDirection = "ltr" | "rtl";

export interface LocaleMetadata {
  lang: Locale;
  dir: DocumentDirection;
}

export interface DocumentLocaleTarget {
  lang: string;
  dir: string;
}

export const DEFAULT_LOCALE: Locale = "en";

const localeMetadata: Record<Locale, LocaleMetadata> = {
  en: {
    lang: "en",
    dir: "ltr",
  },
  ar: {
    lang: "ar",
    dir: "rtl",
  },
};

export function getLocaleMetadata(locale: Locale): LocaleMetadata {
  return localeMetadata[locale];
}

export function applyDocumentLocale(
  locale: Locale,
  target: DocumentLocaleTarget = document.documentElement,
): LocaleMetadata {
  const metadata = getLocaleMetadata(locale);

  target.lang = metadata.lang;
  target.dir = metadata.dir;

  return metadata;
}
