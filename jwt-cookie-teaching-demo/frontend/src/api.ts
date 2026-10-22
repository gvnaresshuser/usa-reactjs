import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import Swal from "sweetalert2";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

interface RetryConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

// Only one refresh request at a time.
let refreshPromise: Promise<void> | null = null;

// Prevent multiple session-expired alerts.
let isRedirectingToLogin = false;

export const resetLoginRedirect = (): void => {
  isRedirectingToLogin = false;
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const request = error.config as RetryConfig | undefined;
    const url = request?.url ?? "";

    const excluded = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/logout",
    ];

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retried ||
      excluded.some((path) => url.includes(path))
    ) {
      return Promise.reject(error);
    }

    request._retried = true;

    try {
      if (!refreshPromise) {
        // Show SweetAlert while refreshing.
        Swal.fire({
          title: "Refreshing Session",
          text: "Your access token expired. Please wait...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => Swal.showLoading(),
        });

        refreshPromise = api
          .post("/auth/refresh")
          .then(() => {
            Swal.close();

            // Show success notification.
            void Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Access token refreshed successfully!",
              showConfirmButton: false,
              timer: 1800,
              timerProgressBar: true,
            });
          })
          .catch((refreshError: unknown) => {
            Swal.close();
            throw refreshError;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      // Wait for the shared refresh request.
      await refreshPromise;

      // Retry the original protected request.
      return api(request);
    } catch {
      if (!isRedirectingToLogin) {
        isRedirectingToLogin = true;

        Swal.close();

        void Swal.fire({
          icon: "error",
          title: "Session Expired",
          text:
            "Your refresh token has expired or is invalid. Please log in again.",
          confirmButtonText: "Go to Login",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          // Tell React to display the login screen.
          window.dispatchEvent(new Event("auth-expired"));
        });
      }

      return Promise.reject(error);
    }
  },
);

export default api;
