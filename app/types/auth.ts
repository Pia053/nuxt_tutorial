import type { User } from "./client/user";

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}
