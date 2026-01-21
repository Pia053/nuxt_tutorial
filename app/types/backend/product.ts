/**
 * Tạo sao dùng INTERFACE thay vì TYPE?
 * Interface sinh ra dể mô tả "shape" (hình dáng) của 1 object
 * khả năng mở rộng extends tốt hơn performance khi compile nhanh hơn type 1 chút
 * Khi làm việc với Model dữ liệu, ưu tiên Interface.
 */

export interface ProductResponse {
  product_id: number;
  product_name: string;
  product_image: string;
  price_amount: number;
  is_active: boolean;
}
