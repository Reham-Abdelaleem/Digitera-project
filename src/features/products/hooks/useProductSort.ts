"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductSort } from "@/features/products/types/product.types";

/**
 * US-01: keep sort state close to the products feature.
 * Wire this hook to the listing query and URL params during implementation.
 */
export function useProductSort(sort?: ProductSort) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSort = (value: ProductSort | undefined) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (value) {
      nextParams.set("sort", value);
    } else {
      nextParams.delete("sort");
    }

    nextParams.delete("page");

    const queryString = nextParams.toString();
    const target = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(target, { scroll: false });
  };

  return {
    sort,
    setSort,
  };
}
