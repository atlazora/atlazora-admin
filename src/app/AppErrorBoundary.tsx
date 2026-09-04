import { Component, type ReactNode } from "react";

import { catalog, type Locale } from "../i18n/catalog";
import { DEFAULT_LOCALE, applyDocumentLocale } from "../i18n/locale";

interface AppErrorBoundaryProps {
  children: ReactNode;
  locale?: Locale;
  reload?: () => void;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch() {
    // Application-local recovery boundary only.
    // External reporting belongs to the later observability foundation.
  }

  private handleReload = () => {
    const reload = this.props.reload ?? (() => window.location.reload());
    reload();
  };

  render() {
    const { children, locale = DEFAULT_LOCALE } = this.props;

    if (!this.state.hasError) {
      return children;
    }

    applyDocumentLocale(locale);

    const copy = catalog[locale].errorBoundary;

    return (
      <main className="admin-error-boundary">
        <section
          className="admin-error-boundary__panel"
          aria-labelledby="admin-error-title"
        >
          <p className="admin-eyebrow">{copy.eyebrow}</p>
          <h1 id="admin-error-title">{copy.title}</h1>
          <p>{copy.description}</p>
          <button type="button" onClick={this.handleReload}>
            {copy.reloadAction}
          </button>
        </section>
      </main>
    );
  }
}
