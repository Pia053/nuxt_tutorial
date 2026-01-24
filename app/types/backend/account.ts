import type { Pagination } from "./common";

export type ROLE = "admin" | "user";
export type STATUS = "active" | "inactive";

export interface AccountDTO {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  avatar: string;
  role: ROLE;
  status: STATUS;
  created_at: string;
  updated_at?: string;
}

export interface AccountResponse {
  data: AccountDTO[];
  pagination: Pagination;
}
