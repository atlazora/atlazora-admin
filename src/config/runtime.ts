export interface RuntimeConfig {
  apiBaseUrl: string;
}

export interface RuntimeEnvironment {
  VITE_API_BASE_URL?: string;
}

function getRuntimeEnvironment(): RuntimeEnvironment {
  return {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  };
}

export function readRuntimeConfig(
  environment: RuntimeEnvironment = getRuntimeEnvironment(),
): RuntimeConfig {
  const rawApiBaseUrl = environment.VITE_API_BASE_URL?.trim();

  if (!rawApiBaseUrl) {
    throw new Error("VITE_API_BASE_URL is required.");
  }

  let apiBaseUrl: URL;

  try {
    apiBaseUrl = new URL(rawApiBaseUrl);
  } catch {
    throw new Error("VITE_API_BASE_URL must be a valid absolute URL.");
  }

  if (apiBaseUrl.protocol !== "http:" && apiBaseUrl.protocol !== "https:") {
    throw new Error("VITE_API_BASE_URL must use http or https.");
  }

  return {
    apiBaseUrl: apiBaseUrl.toString().replace(/\/$/, ""),
  };
}
