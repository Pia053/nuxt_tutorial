import type { ApiResponse } from "~/types";
import type { AccountResponse } from "~/types/backend/account";
import { mapAccountResponseToClient } from "~/utils/account.mapper";

export const useAccount = () => {
  const page = ref(1);
  const limit = ref(10);
  const q = ref("");

  const data = ref<ReturnType<typeof mapAccountResponseToClient> | null>(null);
  const pending = ref(false);
  const error = ref<Error | null>(null);

  const fetchAccounts = async () => {
    pending.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse<AccountResponse>>(
        "/api/account",
        {
          query: {
            page: page.value,
            limit: limit.value,
            q: q.value,
          },
        },
      );

      if (response && response.success && response.data) {
        data.value = mapAccountResponseToClient(response.data);
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      error.value = err as Error;
    } finally {
      pending.value = false;
    }
  };

  // Fetch lần đầu
  fetchAccounts();

  // Watch để refetch khi params thay đổi
  watch([page, limit, q], () => {
    fetchAccounts();
  });

  let timeout: ReturnType<typeof setTimeout>;
  const handleSearch = (keyword: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      q.value = keyword;
      page.value = 1;
    }, 500);
  };

  const handleLimitChange = (newLimit: number) => {
    limit.value = newLimit;
    page.value = 1;
  };

  return {
    accounts: computed(() => data.value?.data || []),
    pagination: computed(
      () =>
        data.value?.pagination || {
          total: 0,
          perPage: limit.value,
          currentPage: 1,
          lastPage: 1,
          from: 0,
          to: 0,
        },
    ),
    pending: readonly(pending),
    error: readonly(error),
    refresh: fetchAccounts,
    page,
    limit,
    q,
    handleSearch,
    handleLimitChange,
  };
};
