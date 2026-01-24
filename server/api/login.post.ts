import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 1. Validate đơn gian
  if (!body.username || !body.password) {
    throw createError({
      statusCode: 400,
      message: "Thiếu tông tin đăng nhập",
    });
  }

  if (body.username === "admin" && body.password === "123456") {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Trả về Token và thông tin User
    return {
      success: true,
      token: "fake-jwt-token-" + Date.now(), // Token giả
      user: {
        id: 1,
        name: "Admin Đẹp Trai",
        email: "admin@nuxtshop.com",
        avatar: "https://placehold.co/100",
      },
    };
  }

  throw createError({
    statusCode: 401,
    message: "Sai tên đăng nhập hoặc mật khẩu",
  });
});
