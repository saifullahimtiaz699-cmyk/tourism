const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiOrigin = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, "").replace(/\/api$/i, "")
  : import.meta.env.DEV
    ? "http://localhost:5000"
    : "";

export const API_URL = apiOrigin ? `${apiOrigin}/api` : "";