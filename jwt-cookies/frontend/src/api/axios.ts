import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import Swal from "sweetalert2";

import {
  closeAlert,
  showLoading,
} from "../components/common/Alert";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

interface RetryableRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
};

/*
 * Holds the currently running refresh request.
 *
 * If multiple requests receive 401 at the same time,
 * they will all wait for this ONE refresh request.
 */
let refreshPromise: Promise<void> | null = null;

/*
 * Prevent multiple redirect/alert operations
 * when several requests fail together.
 */
let isRedirectingToLogin = false;

// Reset the redirect flag after successful authentication
export const resetLoginRedirect = (): void => {
  isRedirectingToLogin = false;
};

const refreshSession = async (): Promise<void> => {
  if (!refreshPromise) {
    console.log("Refreshing session...");
    showLoading(
      "Session expired. Refreshing your access token...",
    );

    refreshPromise = api
      .post("/auth/refresh")
      .then(() => {
        closeAlert();
      })
      .catch((error) => {
        closeAlert();

        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryableRequestConfig | undefined;

    const url = originalRequest?.url ?? "";

const isExcludedAuthRequest =
  url.includes("/auth/login") ||
  url.includes("/auth/register") ||
  url.includes("/auth/refresh") ||
  url.includes("/auth/logout") ||
  window.location.pathname === "/login";

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isExcludedAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        await refreshSession();

        return api(originalRequest);
      } catch (refreshError) {
        if (!isRedirectingToLogin) {
          isRedirectingToLogin = true;
          console.log("Session Expired, Your refresh token has expired or is no longer valid. Please login again.");

          void Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Your refresh token has expired or is no longer valid. Please login again.",
            confirmButtonText: "Login",
          }).then(() => {
            window.location.replace("/login");
          });
        }

return Promise.reject(refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;