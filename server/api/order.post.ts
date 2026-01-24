import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  // 1. Đọc dữ liệu từ body request (client gửi lên)
  // readBody là hàm tiện ích của H3 để parse JSON
  console.log("order post: ", event);
  const body = await readBody(event);

  console.log("order body: ", body);

  if (!body.cart || body.cart.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Giỏ hàng rỗng, không thể thanh toán",
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: "Đặt hàng thành công!",
    orderId: "ORD-" + Math.floor(Math.random() * 10000),
  };
});
