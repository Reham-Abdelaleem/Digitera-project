"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * US-03: keep filter state close to the products feature.
 * Wire this hook to the listing query and URL params during implementation.
 */
export function useProductFilters(category?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCategory = (value: string | undefined) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (value) {
      nextParams.set("category", value);
    } else {
      nextParams.delete("category");
    }

    nextParams.delete("page");

    const queryString = nextParams.toString();
    const target = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(target, { scroll: false });
  };

  return {
    category,
    setCategory,
  };
}
