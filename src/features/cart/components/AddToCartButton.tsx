"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput & {
  className?: string;
  label?: string;
};

export function AddToCartButton({
  className,
  label = "Add to cart",
  ...props
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      onClick={() => addItem(props)}
      className={cn(
        "h-12 w-full rounded-full bg-[#1a1a1a] px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(26,26,26,0.16)] transition-all hover:bg-[#2b2926] disabled:bg-[#b9b1a7]",
        className,
      )}
    >
      {label}
    </Button>
  );
}
