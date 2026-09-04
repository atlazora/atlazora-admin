import { describe, expect, it } from "vitest";

import {
  applyDocumentLocale,
  DEFAULT_LOCALE,
  getLocaleMetadata,
  type DocumentLocaleTarget,
} from "./locale";

describe("Admin locale foundation", () => {
  it("uses English with left-to-right direction by default", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(getLocaleMetadata("en")).toEqual({
      lang: "en",
      dir: "ltr",
    });
  });

  it("maps Arabic to right-to-left document direction", () => {
    expect(getLocaleMetadata("ar")).toEqual({
      lang: "ar",
      dir: "rtl",
    });
  });

  it("applies locale language and direction to the presentation document target", () => {
    const target: DocumentLocaleTarget = {
      lang: "",
      dir: "",
    };

    applyDocumentLocale("ar", target);

    expect(target).toEqual({
      lang: "ar",
      dir: "rtl",
    });

    applyDocumentLocale("en", target);

    expect(target).toEqual({
      lang: "en",
      dir: "ltr",
    });
  });
});
