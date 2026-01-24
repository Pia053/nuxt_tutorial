<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Thông tin tài khoản</h1>

    <div v-if="user" class="flex gap-6 items-start">

      <div class="space-y-2">
        <p><strong>Họ tên:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>ID:</strong> #{{ user.id }}</p>

        <UButton color="primary" variant="outline" class="mt-4">
          Chỉnh sửa thông tin
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const { user } = useAuth();
</script>
