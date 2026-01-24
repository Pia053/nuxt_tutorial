import type { PaginationClient } from "./common";

export interface AccountClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  status: string;
  createdAt: string;
}

// Response chứa cả data và pagination (camelCase)
export interface AccountClientResponse {
  data: AccountClient[];
  pagination: PaginationClient;
}
