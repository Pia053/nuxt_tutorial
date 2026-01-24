<template>
  <UContainer class="py-8">
    <h1 class="text-2xl font-bold mb-6">Quản lý tài khoản</h1>

    <div
      class="flex flex-wrap justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-lg"
    >
      <UInput
        v-model="q"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm kiếm ..."
        class="w-64"
        @update:model-value="handleSearch"
      />

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Hiển thị:</span>
        <USelectMenu
          v-model="selectedLimit"
          :options="limitOptions"
          value-attribute="value"
          @update:model-value="handleLimitUpdate"
        >
          <template #label>
            {{ selectedLimit?.label || "Chọn số dòng" }}
          </template>
        </USelectMenu>
      </div>
    </div>

    <!-- Table -->
    <div class="border rounded-lg overflow-hidden relative min-h-[300px]">
      <div
        v-if="pending"
        class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center"
      >
        <div class="flex flex-col items-center gap-2">
          <UIcon
            name="i-heroicons-arrow-path"
            class="animate-spin text-3xl text-primary"
          />
          <span class="text-sm text-gray-500">Đang tải dữ liệu...</span>
        </div>
      </div>

      <UTable :data="accounts" :columns="columns" />
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination.total > 0"
      class="flex justify-between items-center mt-4 border-t pt-4"
    >
      <span class="text-sm text-gray-500">
        Tổng số: <b>{{ pagination.total }}</b> kết quả
      </span>

      <UPagination
        v-model="page"
        :page-count="limit"
        :total="pagination.total"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { AccountClient } from "~/types/client/account";

const {
  page,
  limit,
  q,
  handleSearch,
  handleLimitChange,
  accounts,
  pagination,
  pending,
} = useAccount();

const columns: TableColumn<AccountClient>[] = [
  {
    accessorKey: "id",
    header: "ID",
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "name",
    header: "Tên",
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "avatar",
    header: "Ảnh đại diện",
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
];

const limitOptions = [
  { label: "5 dòng/trang", value: 5 },
  { label: "10 dòng/trang", value: 10 },
  { label: "20 dòng/trang", value: 20 },
  { label: "50 dòng/trang", value: 50 },
];

const selectedLimit = ref(
  limitOptions.find((opt) => opt.value === limit.value) || limitOptions[1],
);

const handleLimitUpdate = (newLimit: (typeof limitOptions)[0]) => {
  if (newLimit && newLimit.value !== limit.value) {
    handleLimitChange(newLimit.value);
  }
};
</script>
