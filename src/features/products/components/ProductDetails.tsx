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
        <div className="w-fit rounded-full border border-border bg-surface-cream px-4 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
            Scent Family: <span className="font-semibold">{product.scentFamily.toUpperCase()}</span>
          </p>
        </div>

        <div className="w-fit rounded-full border border-border bg-surface-cream px-4 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
            Occasion: <span className="font-semibold">{occasionLabel.toUpperCase()}</span>
          </p>
        </div>
      </div>

      <h1 className="font-display text-[52px] leading-[0.9] tracking-[-0.06em] text-ink sm:text-[56px] lg:text-[64px]">
        {product.name}
      </h1>

      <div className="flex items-center justify-between gap-3 border-b border-border pb-3.5">
        <p className="text-[30px] font-[500] tracking-[-0.07em] text-ink">
          {formatPrice(product.price)}
        </p>
        <div className="flex items-center gap-2 text-accent">
          <span className="inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
            Available in Atelier
          </p>
        </div>
      </div>

    </div>
  );
}
