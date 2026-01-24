// Tại sao phải có file này?
// Để khi import, em chỉ cần: import { Product } from '~/types'
// Thay vì: import { Product } from '~/types/client/product' -> Đường dẫn quá dài và phụ thuộc cấu trúc file con.

export * from "./backend/product";
export * from "./backend/common";

export * from "./client/product";
export * from "./client/cart";
export * from "./client/user";

export * from "./auth";
