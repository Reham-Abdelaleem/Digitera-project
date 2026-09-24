"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = product.images.length > 0 ? product.images : ["/images/placeholder-product.png"];
  const activeImage = images[selectedIndex] ?? images[0];

  if (!activeImage) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-[18px] border border-[#eae1d7] bg-[#f3efe9] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative h-[420px] overflow-hidden rounded-[18px] border border-[#e8dfd4] bg-[#eadcc1] shadow-[0_14px_30px_rgba(28,22,15,0.10)] sm:h-[520px] lg:h-[640px]">
        <Image
          src={activeImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative h-[94px] overflow-hidden rounded-[12px] border transition-all ${
                selectedIndex === index
                  ? "border-[#1a1a1a] shadow-[0_0_0_1px_rgba(26,26,26,0.1)]"
                  : "border-[#ded0bf] bg-[#f9f4ef]"
              }`}
              aria-label={`Select product image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
