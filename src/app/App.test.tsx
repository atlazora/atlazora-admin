import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  it("renders the admin overview inside the application shell", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Overview" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Atlazora")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });
});
