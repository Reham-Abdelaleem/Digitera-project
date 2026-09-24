"use client";

import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import { ProductSearch } from "@/features/products/components/ProductSearch";
import { ProductSortControl } from "@/features/products/components/ProductSort";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { ProductSearchParams } from "@/features/products/types/product.types";
import { parseProductListQuery } from "@/features/products/utils/product.utils";

type ProductsPageProps = {
  searchParams: ProductSearchParams;
};

export function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = parseProductListQuery(searchParams);
  const productsQuery = useProducts(query);

  return (
    <section className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs />
      <div className="flex w-full flex-col items-start gap-4 px-4 pb-8 sm:px-6 md:px-10 lg:px-20 lg:pb-10">
        <div className="flex w-full items-end justify-between gap-5">
          <div className="flex-1">
            <h1 className="w-full font-[family-name:var(--font-instrument-serif)] text-[42px] leading-[0.92] tracking-[-0.04em] text-[#18130f] sm:text-[52px] lg:text-[64px] lg:leading-[0.9]">
              All Fragrances
            </h1>
            <p className="mt-3 w-full text-[13px] font-normal tracking-[0.08em] text-[#605a54] uppercase sm:mt-4">
              Cultivated formulations curated to command atmospheric space.
            </p>
          </div>
          <div className="hidden min-w-[240px] max-w-[360px] flex-1 lg:block">
            <ProductSearch value={query.search} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-8 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:items-start lg:gap-12 lg:px-20 lg:pb-[100px]">
        <ProductFilters category={query.category} />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
          <div className="w-full lg:hidden">
            <ProductSearch value={query.search} />
          </div>
          <ProductSortControl
            value={query.sort ?? "price-desc"}
            availableCount={productsQuery.data?.total ?? 0}
          />
          <ProductGrid
            products={productsQuery.data?.items ?? []}
            isLoading={productsQuery.isLoading}
          />
          <ProductPagination
            page={productsQuery.data?.page ?? query.page ?? 1}
            pageSize={productsQuery.data?.pageSize ?? query.pageSize ?? 6}
            total={productsQuery.data?.total ?? 0}
          />
        </div>
      </div>
    </section>
  );
}
