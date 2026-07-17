export const SKIP_RATE_LIMIT_TOAST_FLAG = "__taskopiaSkipRateLimitToast";

export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again."
) => {
  if (error?.code === "auth/too-many-requests") {
    return (
      error?.message ||
      "Too many login attempts. Please wait a few minutes and try again."
    );
  }

  if (error?.response?.status === 429) {
    return (
      error?.response?.data?.message ||
      "Too many requests. Please try again later."
    );
  }

  return error?.response?.data?.message || error?.message || fallback;
};