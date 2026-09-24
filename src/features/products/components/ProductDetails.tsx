import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

/** US-04: product information. */
export function ProductDetails({ product }: ProductDetailsProps) {
  const occasionLabel = product.occasion === "personal-use" ? "Evening" : product.occasion.replace(/-/g, " ");

  return (
    <div className="space-y-5">
      <div className="flex gap-2.5">
        <div className="w-fit rounded-full border border-[#d8cfc3] bg-[#f5efe9] px-4 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#171310]">
            Scent Family: <span className="font-semibold">{product.scentFamily.toUpperCase()}</span>
          </p>
        </div>

        <div className="w-fit rounded-full border border-[#d8cfc3] bg-[#f5efe9] px-4 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#171310]">
            Occasion: <span className="font-semibold">{occasionLabel.toUpperCase()}</span>
          </p>
        </div>
      </div>

      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[52px] leading-[0.9] tracking-[-0.06em] text-[#171310] sm:text-[56px] lg:text-[64px]">
        {product.name}
      </h1>

      <div className="flex items-center justify-between gap-3 border-b border-[#d8cfc3] pb-3.5">
        <p className="text-[30px] font-[500] tracking-[-0.07em] text-[#171310]">
          {formatPrice(product.price)}
        </p>
        <div className="flex items-center gap-2 text-[#5d8f74]">
          <span className="inline-block size-2 rounded-full bg-[#5d8f74]" aria-hidden="true" />
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#5d8f74]">
            Available in Atelier
          </p>
        </div>
      </div>

    </div>
  );
}
