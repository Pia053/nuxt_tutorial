import type { AccountDTO, AccountResponse } from "~/types/backend/account";
import type {
  AccountClient,
  AccountClientResponse,
} from "~/types/client/account";
import type { Pagination } from "~/types/backend/common";
import type { PaginationClient } from "~/types/client/common";

/**
 * Map 1 account từ BE (snake_case) sang Client (camelCase)
 */
export const mapAccountDTOToClient = (dto: AccountDTO): AccountClient => {
  return {
    id: dto.id,
    name: dto.full_name,
    email: dto.email,
    phone: dto.phone,
    avatar: dto.avatar,
    role: dto.role === "admin" ? "Quản trị viên" : "Người dùng",
    status: dto.status === "active" ? "Hoạt động" : "Không hoạt động",
    createdAt: new Date(dto.created_at).toLocaleDateString("vi-VN"),
  };
};

/**
 * Map Pagination từ BE (snake_case) sang Client (camelCase)
 */
export const mapPaginationToClient = (
  pagination: Pagination,
): PaginationClient => {
  return {
    total: pagination.total,
    perPage: pagination.per_page,
    currentPage: pagination.current_page,
    lastPage: pagination.last_page,
    from: pagination.from,
    to: pagination.to,
  };
};

/**
 * Map toàn bộ Response (bao gồm data[] + pagination)
 * từ BE (snake_case) sang Client (camelCase)
 */
export const mapAccountResponseToClient = (
  response: AccountResponse,
): AccountClientResponse => {
  return {
    data: response.data.map(mapAccountDTOToClient),
    pagination: mapPaginationToClient(response.pagination),
  };
};
