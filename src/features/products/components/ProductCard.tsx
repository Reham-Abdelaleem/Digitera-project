"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const image = product.images[0];

  return (
    <article className="flex min-w-0 flex-1 flex-col items-start gap-3 self-stretch rounded-[18px] bg-panel p-3 shadow-[0_0_0_1px_rgba(17,17,17,0.04)] sm:p-4">
      <Link
        href={productPaths.detail(product.id)}
        className="relative h-[235px] w-full shrink-0 overflow-hidden rounded-[14px] bg-surface-warm sm:h-[280px] lg:h-[320px]"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="rounded-[14px] object-cover"
            sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center rounded-[14px] bg-page text-sm text-ink-subtle">
            No image
          </div>
        )}
      </Link>
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-start justify-between gap-3">
          <Link
            href={productPaths.detail(product.id)}
            className="flex min-w-0 flex-col items-start gap-1"
          >
            <h2 className="w-full font-display text-[22px] leading-none tracking-[-0.03em] text-ink-soft sm:text-[23px]">
              {product.name}
            </h2>
            <p className="w-full text-[10px] font-medium uppercase tracking-[0.12em] text-gold sm:truncate">
              {product.notes}
            </p>
          </Link>
          <p className="shrink-0 pt-1 text-[15px] font-semibold text-ink-soft">
            {formatWholePrice(product.price)}
          </p>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded border border-solid border-border-soft bg-surface-soft py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap text-ink-soft transition-colors hover:bg-surface-alt"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image,
              selectedOptions: {},
            })
          }
        >
          Add to Cart +
        </button>
      </div>
    </article>
  );
}
