"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * US-02: keep search state close to the products feature.
 * Wire this hook to the listing query and URL params during implementation.
 */
export function useProductSearch(search = "") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearch = (value: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    const trimmed = value.trim();
    if (trimmed) {
      nextParams.set("search", trimmed);
    } else {
      nextParams.delete("search");
    }

    nextParams.delete("page");

    const queryString = nextParams.toString();
    const target = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(target, { scroll: false });
  };

  return {
    search,
    setSearch,
  };
}
