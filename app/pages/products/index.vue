<template>
  <div v-if="pending">Đang tải dữ liệu từ server giả...</div>

  <div v-else-if="error">Có lỗi: {{ error.message }}</div>

  <div v-else class="grid grid-cols-3 gap-4">
    <ProductCard v-for="item in products" :key="item.id" :product="item" />
  </div>
</template>

<script setup lang="ts">
const { getProducts } = useProductService();

const { data: products, error, pending } = getProducts();
</script>
