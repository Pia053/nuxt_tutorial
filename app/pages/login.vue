<template>
  <UContainer class="max-w-sm py-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

    <UForm :state="formData" @submit="handleLogin" class="space-y-4 gap-4">
      <UFormField label="Tên đăng nhập">
        <UInput v-model="formData.username" class="w-full" />
      </UFormField>

      <UFormField label="Mật khẩu">
        <UInput type="password" v-model="formData.password" class="w-full" />
      </UFormField>

      <UButton block :loading="isLoading" type="submit"> Đăng nhập </UButton>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
const { login } = useAuth();
const formData = reactive({
  username: "admin",
  password: "123456",
});
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  const res: any = await login(formData.username, formData.password);

  if (res.success) {
    alert("Đăng nhập thành công!");
    navigateTo("/");
  } else {
    alert(res.message);
  }
  isLoading.value = false;
};
</script>
