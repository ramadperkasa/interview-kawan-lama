import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(url: string, options?: UseFetchOptions<T>) {
  const config = useRuntimeConfig();

  const fullUrl = `${config.public.apiBaseUrl}${
    url.startsWith("/") ? url.slice(1) : url
  }`;

  return useFetch(fullUrl, {
    ...options,
  });
}
