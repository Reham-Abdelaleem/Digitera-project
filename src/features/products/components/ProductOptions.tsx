"use client";

import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

const VOLUME_OPTIONS = [
  { label: "30 ml", price: "$160" },
  { label: "50 ml", price: "$220" },
  { label: "100 ml", price: "$320" },
];

/** US-04: selectable product options. */
export function ProductOptions({
  product: _product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  const [giftWrapEnabled, setGiftWrapEnabled] = useState(true);

  void _product;
  const selectedVolume = selectedOptions.volume ?? "50 ml";

  return (
    <div className="space-y-5 pt-2">
      <div className="space-y-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#5d524d]">
          Select volume
        </p>

        <div className="grid grid-cols-3 gap-2 text-left">
          {VOLUME_OPTIONS.map((option) => {
            const active = selectedVolume === option.label;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onChange("volume", option.label)}
                className={`rounded-[10px] border px-3 py-3 text-center transition-colors ${
                  active
                    ? "border-[#171310] bg-[#f8f4ef] text-[#171310] shadow-[0_0_0_1px_rgba(23,19,16,0.08)]"
                    : "border-[#d9cfc3] bg-[#f6f2ee] text-[#5c554f]"
                }`}
              >
                <span className="block text-[13px] font-medium tracking-[-0.02em]">
                  {option.label}
                </span>
                <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.16em] text-[#877b72]">
                  {option.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#d9d0c5] bg-[#f4efe9] px-3 py-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex size-7 items-center justify-center rounded-full bg-[#171310] text-[12px] font-medium text-[#f9f3ed]">
            N
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#302d2a]">
              Complimentary Signature Gift Wrapping
            </p>
            <p className="mt-1 text-[11px] text-[#6a615b]">
              Encased in linen paper box with custom wax seal stamp.
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Toggle gift wrapping"
          aria-pressed={giftWrapEnabled}
          onClick={() => setGiftWrapEnabled((current) => !current)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors ${
            giftWrapEnabled ? "border-[#8a7f71] bg-[#d8d2cb]" : "border-[#c8bfb5] bg-[#f0ece7]"
          }`}
        >
          <span
            className={`inline-block size-5 rounded-full bg-[#ffffff] shadow-[0_1px_4px_rgba(0,0,0,0.18)] transition-transform ${
              giftWrapEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
