import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(url: string, options?: UseFetchOptions<T>) {
  const config = useRuntimeConfig();

  const fullUrl = `${config.public.apiBaseUrl}${url}`;

  return useLazyFetch(fullUrl, {
    ...options,
    key: fullUrl,
  });
}
