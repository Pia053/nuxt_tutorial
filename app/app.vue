<template>
  <div
    :class="{ 'opacity-0': !isHydrated, 'opacity-100': isHydrated }"
    class="transition-opacity duration-150"
  >
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
/**
 * +, NuwxxtLayout: là khugng tranh. nó bảo đi tìm file
 * trong thư mục layouts và ốp vào đây. Nếu không khai báo layout nào
 * nó mặc định tìm default.vue
 * +, NuxtPage: khi vô trang chủ / nó hiển thị pages/index.vue,
 * khi vào /products nó hiển thị pages/products/index.vue
 */

// Prevent FOUC with hydration state
const isHydrated = ref(false);

onMounted(() => {
  // Mark as hydrated after mount
  isHydrated.value = true;
});
</script>
