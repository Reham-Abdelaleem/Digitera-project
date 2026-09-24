import { mockProducts } from "@/features/products/services/products.mock-data";
import type { ProductsService } from "@/features/products/services/products.service";

const SORT_COMPARE = {
  "name-asc": (a: (typeof mockProducts)[number], b: (typeof mockProducts)[number]) =>
    a.name.localeCompare(b.name),
  "name-desc": (a: (typeof mockProducts)[number], b: (typeof mockProducts)[number]) =>
    b.name.localeCompare(a.name),
  "price-asc": (a: (typeof mockProducts)[number], b: (typeof mockProducts)[number]) =>
    a.price - b.price,
  "price-desc": (a: (typeof mockProducts)[number], b: (typeof mockProducts)[number]) =>
    b.price - a.price,
} as const;

/**
 * In-memory catalog used while no backend exists.
 * Search, filter, sort, and pagination are intentionally left for user stories.
 */
export const mockProductsService: ProductsService = {
  async list(query) {
    const search = query.search?.trim().toLowerCase();
    const page = query.page && query.page > 0 ? query.page : 1;
    const pageSize = query.pageSize && query.pageSize > 0 ? query.pageSize : 6;

    const filteredProducts = mockProducts.filter((product) => {
      if (search) {
        const haystack = [
          product.name,
          product.description,
          product.notes,
          product.category,
          product.scentFamily,
          product.occasion,
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(search)) {
          return false;
        }
      }

      if (query.category && product.category !== query.category) {
        return false;
      }

      return true;
    });

    const comparator = query.sort && query.sort in SORT_COMPARE ? SORT_COMPARE[query.sort] : SORT_COMPARE["price-desc"];
    const sortedProducts = [...filteredProducts].sort(comparator);
    const total = sortedProducts.length;
    const safePage = Math.min(page, Math.max(1, Math.ceil(total / pageSize) || 1));
    const start = (safePage - 1) * pageSize;

    return {
      items: sortedProducts.slice(start, start + pageSize),
      total,
      page: safePage,
      pageSize,
    };
  },

  async getById(id) {
    return mockProducts.find((product) => product.id === id) ?? null;
  },
};
