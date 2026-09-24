"use client";

import { Input } from "@/components/ui/Input";
import { useProductSearch } from "@/features/products/hooks/useProductSearch";

type ProductSearchProps = {
  value?: string;
};

/** US-02: search field for the product listing. */
export function ProductSearch({ value }: ProductSearchProps) {
  const { search, setSearch } = useProductSearch(value);

  return (
    <label className="block min-w-56 flex-1">
      <span className="mb-1 block text-sm font-medium">Search</span>
      <Input
        value={search ?? ""}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        placeholder="Search products"
        aria-label="Search products"
      />
    </label>
  );
}
