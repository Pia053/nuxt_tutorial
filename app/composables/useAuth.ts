import type { LoginResponse, User } from "~/types";

export const useAuth = () => {
  // 1. Tạo state User (Lưu thông tin hiển thị)
  const user = useCookie<User | null>("auth-user-info", {
    maxAge: 60 * 60 * 24 * 7,
    default: () => null, // Mặc định là null
    watch: true,
  });

  // 2, tạo Cookie Token (Lưu token đăng nhập)
  // useCookie tự động đồng bộ giữa Server và Client
  const token = useCookie("auth-token", {
    maxAge: 60 * 60 * 24 * 7, // Lưu 7 ngày
  });

  const login = async (username: string, password: string) => {
    try {
      const data = await $fetch<LoginResponse>("/api/login", {
        method: "POST",
        body: { username, password },
      });

      token.value = data.token;
      user.value = data.user as User;

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.statusMessage || "Lỗi đăng nhập",
      };
    }
  };

  // 4. Hàm Logout
  const logout = () => {
    token.value = null; // Xóa cookie
    user.value = null; // Xóa state
    navigateTo("/login");
  };

  return {
    user,
    token,
    login,
    logout,
  };
};
