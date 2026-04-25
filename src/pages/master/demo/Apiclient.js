
const BASE_URL = import.meta.env.BASE_URL|| "https://digiphonepay.com/public/api/";
const TOKEN    = import.meta.env.TOKEN|| "8082|cj7YVguoJLj8qDspXtTIjkfulJ1vgLTbLT8U0JCT3da69443";


export async function request(endpoint, options = {}) {
  const url = `https://digiphonepay.com/public/api${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,   // caller can override / add headers
      },
    });

    // HTTP-level errors (4xx, 5xx) don't throw by default — we handle them here
    if (!response.ok) {
      const message = `API error ${response.status}: ${response.statusText}`;
      return { data: null, error: message };
    }

    const data = await response.json();
    return { data, error: null };

  } catch (err) {
    // Network failures, JSON parse errors, etc.
    console.error(`[apiClient] ${endpoint}`, err);
    return { data: null, error: err.message || "Network error" };
  }
}