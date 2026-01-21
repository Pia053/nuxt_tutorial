<template>
  <div class="text-center py-10">
    <h2 class="text-4xl font-bold mb-4">Chào mừng bạn đến mới NuxtShop</h2>
    <p class="mb-8 text-gray-600">Nơi code Typescript trở thành nghệ thuật</p>

    <UButton size="xl" color="primary" variant="solid" @click="handleShopNow">
      Mua sắm ngay
    </UButton>
  </div>
</template>

<script setup lang="ts">
const handleShopNow = () => {
  navigateTo("/products");
};
</script>
