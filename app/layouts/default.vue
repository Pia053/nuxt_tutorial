<template>
  <div class="h-screen flex flex-col">
    <!-- Tiêu đề -->
    <header class="border-b p-4 flex justify-between items-center">
      <h1 class="text-xl text-primary font-bold">NuxtShop</h1>

      <nav class="flex justify-center items-center gap-4">
        <div v-if="user" class="flex justify-center items-center gap-4">
          <NuxtLink to="/">Trang chủ</NuxtLink>
          <NuxtLink to="/products">Sản phẩm</NuxtLink>
          <UAvatar :src="user.image" alt="Avatar" size="sm" />
          <span class="text-sm font-bold">{{ user.name }}</span>
          <UButton size="xs" color="primary" @click="logout">Thoát</UButton>

          <UButton
            variant="ghost"
            color="primary"
            icon="i-heroicons-shopping-cart"
          >
            <UBadge color="primary" variant="solid" class="ml-1 rounded-full">
              {{ totalItems }}
            </UBadge>
          </UButton>
        </div>

        <NuxtLink v-else to="/login" class="hover:text-primary">
          Đăng nhập
        </NuxtLink>
      </nav>
    </header>

    <!-- Nội dung -->
    <main class="flex-1 p-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t p-4 text-center text-gray-500">
      © 2026 NuxtShop - Newbie to Master
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * +, Bộ khung xương: chứa những thứ không thay đổi khi chuyển tran (Header, Footer, Sidebar)
 */

const { totalItems } = useCart();
const { user, logout } = useAuth();
</script>
