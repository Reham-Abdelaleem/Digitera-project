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
        <div className="overflow-hidden rounded-[12px] bg-[#191613] shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            selectedOptions={selectedOptions}
            label={`ADD TO CART / ${formatPrice(product.price).replace(".00", "")}`}
            className="h-[52px] w-full rounded-none bg-[#191613] px-4 text-[15px] font-medium uppercase tracking-[0.18em] text-[#f5f0ea] shadow-none hover:bg-[#191613]"
          />
        </div>
      )}
    />
  );
}
