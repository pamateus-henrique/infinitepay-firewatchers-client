import { parseCookies, setCookie } from "nookies";

const API_BASE_URL = "http://localhost:8080/api/v1"; // Adjust this to your Go backend URL

interface FetchOptions extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: object;
}

async function fetchWrapper(endpoint: string, options: FetchOptions = {}) {
  const cookies = parseCookies();
  const token = cookies.jwt;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: "include", // This is important for handling cookies
  };

  if (options.data) {
    config.body = JSON.stringify(options.data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Handle the Set-Cookie header
    const setCookieHeader = response.headers.get("Set-Cookie");
    if (setCookieHeader) {
      // Parse the Set-Cookie header and set the cookie
      const cookieParts = setCookieHeader.split(";")[0].split("=");
      const cookieName = cookieParts[0].trim();
      const cookieValue = cookieParts[1].trim();
      setCookie(null, cookieName, cookieValue, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

export const api = {
  get: (endpoint: string, options?: FetchOptions) =>
    fetchWrapper(endpoint, { ...options, method: "GET" }),
  post: (endpoint: string, data: object, options?: FetchOptions) =>
    fetchWrapper(endpoint, { ...options, method: "POST", data }),
  put: (endpoint: string, data: object, options?: FetchOptions) =>
    fetchWrapper(endpoint, { ...options, method: "PUT", data }),
  delete: (endpoint: string, options?: FetchOptions) =>
    fetchWrapper(endpoint, { ...options, method: "DELETE" }),
  patch: (endpoint: string, options?: FetchOptions) =>
    fetchWrapper(endpoint, { ...options, method: "PATCH" }),
};
