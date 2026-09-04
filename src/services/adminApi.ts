export type AdminApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface AdminApiRequest {
  path: string;
  method?: AdminApiMethod;
  body?: unknown;
}

export interface AdminApi {
  request<TResponse>(request: AdminApiRequest): Promise<TResponse>;
}

export function assertAdminApiPath(path: string): string {
  const normalizedPath = path.trim();

  if (!normalizedPath.startsWith("/")) {
    throw new Error("Admin API paths must be absolute application paths.");
  }

  if (normalizedPath.startsWith("//")) {
    throw new Error("Admin API paths must not be protocol-relative URLs.");
  }

  return normalizedPath;
}
