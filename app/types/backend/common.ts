// Generic <T>: T là kiểu dữ liệu dụ thể cho Data ví dụ ProductResponse[]
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
