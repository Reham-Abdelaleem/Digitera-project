"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions }) => (
        <div className="flex items-center justify-center gap-3 overflow-hidden rounded-[12px] bg-[#191613] text-[#f5f2ee] shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <span className="ml-4 flex size-8 items-center justify-center rounded-full bg-[#f4efe7] text-[13px] font-medium text-[#171310]">
            N
          </span>
          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            selectedOptions={selectedOptions}
            label={`Add to cart / ${formatPrice(product.price)}`}
            className="h-[52px] flex-1 rounded-none bg-transparent px-0 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-none hover:bg-transparent"
          />
        </div>
      )}
    />
  );
}
