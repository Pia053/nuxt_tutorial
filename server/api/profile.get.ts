import { defineEventHandler, getCookie, createError } from "h3";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Bạn chưa đăng nhập (Không tìm thấy Cookie)",
    });
  }
  try {
    // BƯỚC 2: Gọi sang Laravel (Proxy)
    // Laravel API Endpoint ví dụ: http://my-laravel.com/api/user
    const laravelResponse = await $fetch("http://laravel-api.com/api/user", {
      method: "GET",
      headers: {
        // --- QUAN TRỌNG NHẤT ---
        // Gắn Token vào Header để Laravel hiểu
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    // BƯỚC 3: Trả kết quả từ Laravel về cho Client Nuxt
    return laravelResponse;
  } catch (error: any) {
    // Xử lý lỗi nếu Token hết hạn hoặc Laravel báo lỗi
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?.statusText || "Lỗi từ Laravel Server",
    });
  }
});
