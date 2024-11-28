import { useCallback } from 'react';

const useQueryString = (searchParams: URLSearchParams) => {
  return useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      const { pathname, ...entriesParams } = params;

      for (const [key, value] of Object.entries(entriesParams)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return `${pathname}?${newSearchParams.toString()}`;
    },
    [searchParams],
  );
};

export default useQueryString;
