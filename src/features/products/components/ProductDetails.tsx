import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

const SPECIAL_NOTES: Record<string, { top: string[]; heart: string[]; base: string[] }> = {
  "santal-parchment": {
    top: ["Sicilian Bergamot", "Pink Pepper"],
    heart: ["Egyptian Jasmine Sambac", "Papyrus"],
    base: ["West Indian Sandalwood", "Cardamom", "Amber"],
  },
};

/** US-04: product information. */
export function ProductDetails({ product }: ProductDetailsProps) {
  const notes = SPECIAL_NOTES[product.id] ?? {
    top: ["Bergamot", "Pink Pepper"],
    heart: ["Jasmine", "Cedar"],
    base: ["Sandalwood", "Amber"],
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5d524d]">
        <span>
          Scent family: <span className="text-[#1a1a1a]">{product.scentFamily}</span>
        </span>
        <span>
          Occasion: <span className="text-[#1a1a1a]">{product.occasion.replace(/-/g, " ")}</span>
        </span>
      </div>

      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[50px] leading-[0.95] tracking-[-0.06em] text-[#191613] sm:text-[58px] lg:text-[68px]">
        {product.name}
      </h1>

      <div className="flex items-center justify-between gap-3 border-b border-[#d8cfc3] pb-3.5">
        <p className="text-[28px] font-[500] tracking-[-0.08em] text-[#171310]">
          {formatPrice(product.price)}
        </p>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#9bc0a5] bg-[#edf7ef] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.17em] text-[#507863]">
          <span className="size-2 rounded-full bg-[#5d8f6d]" />
          Available in Atelier
        </span>
      </div>

      <p className="max-w-[34rem] text-[15px] leading-[1.7] text-[#5a514b]">
        {product.description}
      </p>

      <div className="pt-1">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.22em] text-[#1a1a1a]">
          Scent Anatomy
        </h2>

        <div className="mt-4 space-y-2 text-[14px] text-[#504a46]">
          <div className="flex items-start gap-4">
            <span className="w-[92px] shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-[#6d625b]">
              Top notes
            </span>
            <span className="flex-1 text-[14px] leading-6 text-[#534d49]">
              {notes.top.join(", ")}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-[92px] shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-[#6d625b]">
              Heart notes
            </span>
            <span className="flex-1 text-[14px] leading-6 text-[#534d49]">
              {notes.heart.join(", ")}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-[92px] shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-[#6d625b]">
              Base notes
            </span>
            <span className="flex-1 text-[14px] leading-6 text-[#534d49]">
              {notes.base.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
