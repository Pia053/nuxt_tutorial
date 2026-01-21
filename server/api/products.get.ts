import { defineEventHandler } from "h3"; // H3 là engine HTTP của Nuxt
import type { ProductResponse } from "~/types";
import type { ApiResponse } from "~/types/backend/common";

export default defineEventHandler((event) => {
  const fakeLaravelResponse: ApiResponse<ProductResponse[]> = {
    success: true,
    message: "Lấy danh sách thành công",
    data: [
      {
        product_id: 101,
        product_name: "Bàn phím cơ Aula F75",
        product_image: "https://placehold.co/600x400",
        price_amount: 890000,
        is_active: true,
      },
      {
        product_id: 102,
        product_name: "Chuột Logitech G304",
        product_image: "https://placehold.co/600x400",
        price_amount: 750000,
        is_active: true,
      },
    ],
  };

  return fakeLaravelResponse;
});
