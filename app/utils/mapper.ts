import type { ProductResponse, Product } from "~/types";
import type { ApiResponse } from "~/types/backend/common";

export const mapProductToClient = (serverData: ProductResponse): Product => {
  return {
    id: serverData.product_id,
    name: serverData.product_name,
    price: serverData.price_amount,
    image: serverData.product_image,
    isActive: serverData.is_active,
  };
};

export const mapPayloadToServer = (
  clientData: Omit<Product, "id">,
): Omit<ProductResponse, "product_id"> => {
  return {
    product_name: clientData.name,
    product_image: clientData.image,
    price_amount: clientData.price,
    is_active: clientData.isActive,
  };
};

// Hàm transform response tổng
// Input: ApiResponse chứa mảng ProductResponse
// Output: Mảng Product sạch sẽ
export const transformProductResponse = (
  response: ApiResponse<ProductResponse[]>,
): Product[] => {
  // 1. Kiểm tra success từ Laravel
  if (!response.success || !response.data) {
    // Nếu BE trả lỗi, ném lỗi ra để useFetch bắt được vào biến 'error'
    throw new Error(response.message || "Lỗi không xác định từ Server");
  }

  // 2. Nếu ngon lành, map từng phần tử trong data
  return response.data.map(mapProductToClient);
};
