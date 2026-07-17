import axios from "axios";
import { toast } from "react-toastify";
import { SKIP_RATE_LIMIT_TOAST_FLAG } from "./apiError";

const RATE_LIMIT_TOAST_FLAG = "__taskopiaRateLimitToastShown";

if (!globalThis.__taskopiaRateLimitInterceptorInstalled) {
  globalThis.__taskopiaRateLimitInterceptorInstalled = true;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error?.response?.status === 429 &&
        !error?.config?.[RATE_LIMIT_TOAST_FLAG] &&
        !error?.config?.[SKIP_RATE_LIMIT_TOAST_FLAG]
      ) {
        const message =
          error?.response?.data?.message ||
          "429 Too Many Requests. Please try again later.";

        toast.error(message, { position: "top-right" });

        if (error.config) {
          error.config[RATE_LIMIT_TOAST_FLAG] = true;
        }
      }

      return Promise.reject(error);
    },
  );
}
