<template>
  <UContainer class="py-10 max-w-2xl">
    <h1 class="text-3xl font-bold mb-6">Thanh toán đơn hàng</h1>
    <div v-if="cart.length > 0">
      <UForm :state="customer" class="space-y-4 mb-8" @submit="handleCheckout">
        <UFormField label="Họ tên">
          <UInput
            v-model="customer.name"
            color="neutral"
            placeholder="Nhập họ tên..."
            class="w-full"
          />
        </UFormField>

        <UFormField label="Số điện thoại">
          <UInput
            v-model="customer.phone"
            color="neutral"
            placeholder="Nhập số điện thoại..."
            class="w-full"
          />
        </UFormField>

        <UFormField label="Địa chỉ nhận hàng">
          <UInput
            v-model="customer.address"
            color="neutral"
            placeholder="Số nhà đường"
            class="w-full"
          />
        </UFormField>

        <div class="border-t pt-4 mb-6">
          <div class="flex justify-between font-bold text-xl">
            <span>Tổng tiền:</span>
            <span class="text-primary"
              >{{ new Intl.NumberFormat("vi-VN").format(totalPrice) }} đ</span
            >
          </div>
        </div>

        <UButton block size="xl" :loading="isLoading" type="submit">
          Xác nhận đặt hàng
        </UButton>
      </UForm>
    </div>
    <div v-else class="text-center py-10">
      <p class="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
      <UButton to="/products" variant="outline">Quay lại mua sắm</UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import auth from "~/middleware/auth";

definePageMeta({
  middleware: [auth],
});

const { totalItems, cart, totalPrice, clearCart } = useCart();

const customer = reactive({
  name: "",
  phone: "",
  address: "",
});

// State xử lý loading khi bấm nút
const isLoading = ref(false);

// Xử lý khi bấm "Thanh toán"
const handleCheckout = async () => {
  if (cart.value.length === 0) {
    alert("Giở hàng trống");
    return;
  }

  try {
    isLoading.value = true;

    /**
     * Tại sao dùng $fetch mà không phải useFetch ?
     * Vì đây là hành động khi Click Action, không phải load trang
     * Không cần lưu data và state reactice, chỉ cần kết quả trả về
     */
    const response = await $fetch("/api/order", {
      method: "POST",
      body: {
        customer: customer,
        cart: cart.value,
      },
    });

    // 5. Xử lý thành công
    alert(`Thành công! Mã đơn: ${response.orderId}`);

    clearCart(); // Xóa sạch giỏ hàng (logic trong useCart)
    navigateTo("/"); // Chuyển hướng về trang chủ
  } catch (error: any) {
    alert("Lỗi: " + error.statusMessage || "Có lỗi xảy ra");
  } finally {
    isLoading.value = false;
  }
};
</script>
