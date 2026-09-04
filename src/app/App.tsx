import { AdminShell } from "../components/AdminShell";
import { catalog, type Locale } from "../i18n/catalog";
import { DEFAULT_LOCALE } from "../i18n/locale";

interface AppProps {
  locale?: Locale;
}

export function App({ locale = DEFAULT_LOCALE }: AppProps) {
  const copy = catalog[locale];

  return (
    <AdminShell locale={locale}>
      <section className="admin-view" aria-labelledby="overview-title">
        <p className="admin-eyebrow">{copy.overview.eyebrow}</p>
        <h1 id="overview-title">{copy.overview.title}</h1>
        <p>{copy.overview.description}</p>
      </section>
    </AdminShell>
  );
}
