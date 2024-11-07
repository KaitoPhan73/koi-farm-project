import { TAuthResponse } from "@/schema/auth.schema";
import { redirect } from "next/navigation";
import NextFetchRequestConfig from "next/types";
import envConfig from "@/schema/config";
import { normalizePath } from "./utils";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface CustomOptions
  extends Omit<RequestInit, "method">,
    NextFetchRequestConfig {
  baseUrl?: string;
  params?: Record<string, any>;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  status?: string;
  code?: string;
}

interface HttpResponse<T> {
  status: number;
  payload: T;
}

class HttpError extends Error {
  constructor(public status: number, public payload: ApiErrorResponse) {
    super(payload.message);
    this.name = "HttpError";
  }
}

class EntityError extends HttpError {
  constructor(public errors: { field: string; message: string }[]) {
    super(422, {
      success: false,
      message: "Validation Error",
      errors,
    });
    this.name = "EntityError";
  }
}

const buildQueryString = (params: Record<string, any>): string =>
  Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

export const isClient = () => typeof window !== "undefined";

const createHttpClient = (defaultBaseUrl: string) => {
  let clientLogoutRequest: Promise<any> | null = null;

  const request = async <T>(
    method: HttpMethod,
    url: string,
    options?: CustomOptions
  ): Promise<HttpResponse<T>> => {
    const baseUrl =
      options?.baseUrl === undefined ? defaultBaseUrl : options.baseUrl;
    let fullUrl = normalizePath(`${baseUrl}/${url}`);

    if (options?.params) {
      const queryString = buildQueryString(options.params);
      fullUrl = queryString ? `${fullUrl}?${queryString}` : fullUrl;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...Object.fromEntries(
        Object.entries(options?.headers || {}).filter(
          ([_, value]) => typeof value === "string"
        )
      ),
    };

    if (isClient()) {
      const token = localStorage.getItem("accessToken");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit & NextFetchRequestConfig = {
      ...options,
      method,
      headers,
      body:
        options?.body instanceof FormData
          ? options.body
          : JSON.stringify(options?.body),
      next: options?.next,
      cache: options?.cache || (options?.next ? undefined : "no-store"),
    };

    try {
      const response = await fetch(fullUrl, config);
      let data: any;

      try {
        data = await response.json();
      } catch (e) {
        throw new HttpError(response.status, {
          success: false,
          message: "Invalid JSON response from server",
        });
      }

      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new HttpError(400, {
              success: false,
              message: data.message || "Bad Request",
              errors: data.errors,
            });

          case 401:
            await handleUnauthorized(headers);
            throw new HttpError(401, {
              success: false,
              message: data.message || "Unauthorized",
            });

          case 403:
            throw new HttpError(403, {
              success: false,
              message: data.message || "Forbidden",
            });

          case 404:
            throw new HttpError(404, {
              success: false,
              message: data.message || "Not Found",
            });

          case 422:
            throw new EntityError(
              data.errors || [
                {
                  field: "general",
                  message: data.message || "Validation Error",
                },
              ]
            );

          case 500:
            throw new HttpError(500, {
              success: false,
              message: data.message || "Internal Server Error",
            });

          default:
            throw new HttpError(response.status, {
              success: false,
              message: data.message || "Unknown Error",
              ...data,
            });
        }
      }

      handleAuthResponse(url, data);
      return { status: response.status, payload: data };
    } catch (error) {
      console.error(`Error in ${method} request to ${fullUrl}:`, error);

      if (error instanceof HttpError) {
        throw error;
      }

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new HttpError(0, {
          success: false,
          message: "Network Error: Unable to connect to server",
        });
      }

      throw new HttpError(500, {
        success: false,
        message: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  };

  const handleUnauthorized = async (headers: Record<string, string>) => {
    if (isClient()) {
      if (!clientLogoutRequest) {
        clientLogoutRequest = fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }),
          headers,
        });
        try {
          await clientLogoutRequest;
        } finally {
          localStorage.removeItem("accessToken");
          clientLogoutRequest = null;
          window.location.href = "/login";
        }
      }
    } else {
      const token = (headers["Authorization"] as string)?.split("Bearer ")[1];
      redirect(`/logout?accessToken=${token}`);
    }
  };

  const handleAuthResponse = (url: string, data: any) => {
    if (isClient()) {
      console.log("Normalized URL:", normalizePath(url));

      if (
        ["api/auth", "/register"].some((item) => item === normalizePath(url))
      ) {
        localStorage.setItem("accessToken", data.user.token);
        const parseData = data.user.user;
        console.log("parseData", JSON.stringify(parseData));
        localStorage.setItem("user", JSON.stringify(parseData));
      } else if (url === "/auth/logout") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    }
  };

  return {
    get: <T>(url: string, options?: Omit<CustomOptions, "body">) =>
      request<T>("GET", url, options),
    post: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
      request<T>("POST", url, { ...options, body }),
    put: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
      request<T>("PUT", url, { ...options, body }),
    patch: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
      request<T>("PATCH", url, { ...options, body }),
    delete: <T>(url: string, options?: Omit<CustomOptions, "body">) =>
      request<T>("DELETE", url, options),
  };
};

const httpServer = createHttpClient(envConfig.NEXT_PUBLIC_URL);
const httpBag = createHttpClient(envConfig.NEXT_PUBLIC_BAG_API_ENDPOINT);

export { httpServer, httpBag, HttpError, EntityError };
export type { ApiErrorResponse };
