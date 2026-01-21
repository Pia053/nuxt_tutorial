<template>
  <div class="border p-4">
    <img :src="props.product.image" />
    <h3>{{ props.product.name }}</h3>
    <p>{{ props.product.price }} đ</p>
    <UButton
      icon="i-heroicons-shopping-bag"
      size="sm"
      color="primary"
      variant="solid"
      label="Mua ngay"
      class="rounded-full"
      @click="addToCart(product)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types";
const { addToCart } = useCart();
const props = defineProps<{ product: Product }>();
</script>
