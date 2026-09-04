import { readRuntimeConfig } from "../config/runtime";
import {
  assertAdminApiPath,
  type AdminApi,
  type AdminApiRequest,
} from "../services/adminApi";

export interface HttpAdminApiOptions {
  apiBaseUrl?: string;
  fetchImplementation?: typeof fetch;
}

export function createHttpAdminApi(
  options: HttpAdminApiOptions = {},
): AdminApi {
  const apiBaseUrl = options.apiBaseUrl ?? readRuntimeConfig().apiBaseUrl;
  const fetchImplementation = options.fetchImplementation ?? fetch;

  return {
    async request<TResponse>({
      path,
      method = "GET",
      body,
    }: AdminApiRequest): Promise<TResponse> {
      const safePath = assertAdminApiPath(path);
      const requestUrl = `${apiBaseUrl}${safePath}`;

      const response = await fetchImplementation(requestUrl, {
        method,
        headers:
          body === undefined
            ? undefined
            : {
                "content-type": "application/json",
              },
        body: body === undefined ? undefined : JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `Admin API request failed with status ${response.status}.`,
        );
      }

      return (await response.json()) as TResponse;
    },
  };
}
