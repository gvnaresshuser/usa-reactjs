import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

interface RetryConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryConfig | undefined;
    const url = request?.url ?? "";
    const excluded = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];
    if (
      error.response?.status === 401 &&
      request &&
      !request._retried &&
      !excluded.some((path) => url.includes(path))
    ) {
      request._retried = true;
      if (!refreshPromise) {
        refreshPromise = api.post("/auth/refresh")
          .then(() => undefined)
          .finally(() => { refreshPromise = null; });
      }
      try {
        await refreshPromise;
        return api(request);
      } catch (refreshError) {
        window.dispatchEvent(new Event("auth-expired"));
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
