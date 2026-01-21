import type { Product, ProductResponse } from "~/types";
import type { ApiResponse } from "~/types/backend/common";
import { transformProductResponse } from "~/utils/mapper";

export const useProductService = () => {
  const getProducts = () => {
    return useFetch("/api/products", {
      key: "products-list", // key chỉ định cache/hydrate
      transform: (response: ApiResponse<ProductResponse[]>) =>
        transformProductResponse(response),
    });
  };

  return {
    getProducts,
  };
};
