import { describe, expect, it, vi } from "vitest";

import { createHttpAdminApi } from "../adapters/httpAdminApi";
import { assertAdminApiPath, type AdminApi } from "./adminApi";

describe("Admin API presentation boundary", () => {
  it("keeps application paths relative to the configured API base URL", () => {
    expect(assertAdminApiPath("/opaque-test-path")).toBe("/opaque-test-path");
    expect(() => assertAdminApiPath("opaque-test-path")).toThrow(
      "Admin API paths must be absolute application paths.",
    );
    expect(() => assertAdminApiPath("//example.invalid/path")).toThrow(
      "Admin API paths must not be protocol-relative URLs.",
    );
  });

  it("implements the AdminApi port through the HTTP adapter", async () => {
    const fetchImplementation = vi.fn(async () => {
      return new Response(JSON.stringify({ accepted: true }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    });

    const adminApi: AdminApi = createHttpAdminApi({
      apiBaseUrl: "https://api.example.invalid",
      fetchImplementation,
    });

    const result = await adminApi.request<{ accepted: boolean }>({
      path: "/opaque-test-path",
    });

    expect(result).toEqual({ accepted: true });
    expect(fetchImplementation).toHaveBeenCalledWith(
      "https://api.example.invalid/opaque-test-path",
      {
        method: "GET",
        headers: undefined,
        body: undefined,
      },
    );
  });

  it("serializes an opaque request body without defining business behavior", async () => {
    const fetchImplementation = vi.fn(async () => {
      return new Response(JSON.stringify({ accepted: true }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    });

    const adminApi = createHttpAdminApi({
      apiBaseUrl: "https://api.example.invalid",
      fetchImplementation,
    });

    await adminApi.request({
      path: "/opaque-test-path",
      method: "POST",
      body: {
        opaque: true,
      },
    });

    expect(fetchImplementation).toHaveBeenCalledWith(
      "https://api.example.invalid/opaque-test-path",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          opaque: true,
        }),
      },
    );
  });
});
