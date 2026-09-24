"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { useProduct } from "@/features/products/hooks/useProduct";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    volume: "50 ml",
  });

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    const baseOptions = Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );

    return product.options.length > 0 ? baseOptions : { ...selectedOptions, volume: selectedOptions.volume ?? "50 ml" };
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return <p className="text-sm text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-600">Product not found.</p>;
  }

  return (
    <section className="bg-[#f5f1ea] text-[#171310]">
      <div className="mx-auto max-w-[1260px] px-4 pb-10 pt-5 sm:px-6 md:px-10 lg:px-20 lg:pb-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#6d625d]"
        >
          <Link href={productPaths.list} className="transition-colors hover:text-[#171310]">
            Home
          </Link>
          <span>›</span>
          <Link href={productPaths.list} className="transition-colors hover:text-[#171310]">
            Shop
          </Link>
          <span>›</span>
          <Link href={productPaths.list} className="transition-colors hover:text-[#171310]">
            Fragrances
          </Link>
          <span>›</span>
          <span className="text-[#171310]">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1260px] px-4 pb-16 sm:px-6 md:px-10 lg:px-20 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="min-w-0">
            <ProductImages product={product} />
          </div>

          <div className="space-y-6 lg:pt-1">
            <ProductDetails product={product} />
            <ProductOptions
              product={product}
              selectedOptions={resolvedOptions}
              onChange={(optionId, value) =>
                setSelectedOptions((current) => ({
                  ...current,
                  [optionId]: value,
                }))
              }
            />

            <div className="flex items-center gap-4 pt-1">
              <div className="inline-flex items-center rounded-full border border-[#d8cfc3] bg-[#f7f2ed]">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center text-[28px] leading-none text-[#171310]"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setSelectedOptions((current) => ({
                      ...current,
                      quantity: String(Math.max(1, Number(current.quantity ?? 1) - 1)),
                    }))
                  }
                >
                  −
                </button>
                <span className="min-w-[44px] text-center text-[15px] font-medium text-[#171310]">
                  {selectedOptions.quantity ?? "1"}
                </span>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center text-[28px] leading-none text-[#171310]"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setSelectedOptions((current) => ({
                      ...current,
                      quantity: String(Number(current.quantity ?? 1) + 1),
                    }))
                  }
                >
                  +
                </button>
              </div>

              <div className="flex-1">{actions?.({ product, selectedOptions: resolvedOptions })}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
