import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { NavigationItem } from "../types/navigation";
import { AdminShell } from "./AdminShell";

describe("AdminShell", () => {
  it("renders the admin identity and primary navigation", () => {
    render(
      <AdminShell>
        <h1>Overview</h1>
      </AdminShell>,
    );

    expect(screen.getByText("Atlazora")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("hides capability-aware navigation when the capability is absent", () => {
    const items: NavigationItem[] = [
      {
        id: "overview",
        label: "Overview",
        href: "/",
      },
      {
        id: "protected-example",
        label: "Protected example",
        href: "/protected-example",
        requiredCapability: "opaque.example.capability",
      },
    ];

    render(
      <AdminShell navigationItems={items}>
        <h1>Overview</h1>
      </AdminShell>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Protected example" }),
    ).not.toBeInTheDocument();
  });

  it("shows capability-aware navigation when the capability is present", () => {
    const items: NavigationItem[] = [
      {
        id: "protected-example",
        label: "Protected example",
        href: "/protected-example",
        requiredCapability: "opaque.example.capability",
      },
    ];

    render(
      <AdminShell
        capabilities={new Set(["opaque.example.capability"])}
        navigationItems={items}
      >
        <h1>Overview</h1>
      </AdminShell>,
    );

    expect(
      screen.getByRole("link", { name: "Protected example" }),
    ).toBeInTheDocument();
  });

  it("treats capability filtering as presentation visibility only", () => {
    const items: NavigationItem[] = [
      {
        id: "protected-example",
        label: "Protected example",
        href: "/protected-example",
        requiredCapability: "opaque.example.capability",
      },
    ];

    render(
      <AdminShell navigationItems={items}>
        <p>Backend authorization remains authoritative.</p>
      </AdminShell>,
    );

    expect(
      screen.getByText("Backend authorization remains authoritative."),
    ).toBeInTheDocument();
  });
});
