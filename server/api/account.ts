import { ApiResponse } from "~/types";
import type { AccountDTO, AccountResponse } from "~/types/backend/account";

// Dữ liệu Fake (Database giả)
let accounts: AccountDTO[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  full_name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `1234567890`,
  avatar: `https://via.placeholder.com/150`,
  role: "user",
  status: "active",
  created_at: new Date().toISOString(),
}));

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === "GET") {
    const query = getQuery(event);

    // ✅ Thêm log để debug
    console.log("📥 [API] Received query:", query);

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const search = ((query.q as string) || "").toLowerCase();

    // ✅ Log các giá trị đã parse
    console.log(
      "📥 [API] Parsed - page:",
      page,
      "limit:",
      limit,
      "search:",
      search,
    );

    let filteredAccounts = accounts.filter(
      (account) =>
        account.full_name.toLowerCase().includes(search) ||
        account.email.toLowerCase().includes(search),
    );

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filteredAccounts.slice(start, end);
    await new Promise((r) => setTimeout(r, 500));

    return {
      success: true,
      message: "Lấy danh sách tài khoản thành công",
      data: {
        data: paginatedData,
        pagination: {
          total: filteredAccounts.length,
          per_page: limit,
          current_page: page,
          last_page: Math.ceil(filteredAccounts.length / limit),
          from: start + 1,
          to: Math.min(end, filteredAccounts.length),
        },
      },
    } as ApiResponse<AccountResponse>;
  }

  if (method === "POST") {
    const body = await readBody(event);

    const newAccount: AccountDTO = {
      id: accounts.length + 1,
      full_name: body.name,
      email: body.email,
      phone: body.phone,
      avatar: body.avatar,
      role: body.role,
      status: body.status,
      created_at: new Date().toISOString(),
    };

    accounts.unshift(newAccount);

    return newAccount;
  }
});
