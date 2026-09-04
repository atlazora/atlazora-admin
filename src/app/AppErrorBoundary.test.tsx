import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppErrorBoundary } from "./AppErrorBoundary";

function BrokenView(): never {
  throw new Error("Synthetic render failure");
}

describe("AppErrorBoundary", () => {
  it("renders children while no render failure exists", () => {
    render(
      <AppErrorBoundary>
        <p>Healthy admin content</p>
      </AppErrorBoundary>,
    );

    expect(screen.getByText("Healthy admin content")).toBeInTheDocument();
  });

  it("renders the English fallback for an application render failure", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <AppErrorBoundary>
        <BrokenView />
      </AppErrorBoundary>,
    );

    expect(
      screen.getByRole("heading", {
        name: "The admin workspace could not be displayed",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Reload workspace",
      }),
    ).toBeInTheDocument();
  });

  it("renders the Arabic fallback and applies RTL document direction", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <AppErrorBoundary locale="ar">
        <BrokenView />
      </AppErrorBoundary>,
    );

    expect(document.documentElement.lang).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");

    expect(
      screen.getByRole("heading", {
        name: "تعذر عرض مساحة الإدارة",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "إعادة تحميل المساحة",
      }),
    ).toBeInTheDocument();
  });

  it("invokes the recovery action", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const reload = vi.fn();

    render(
      <AppErrorBoundary reload={reload}>
        <BrokenView />
      </AppErrorBoundary>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Reload workspace",
      }),
    );

    expect(reload).toHaveBeenCalledTimes(1);
  });
});
