<template>
  <div class="flex h-screen bg-gray-50">
    <aside class="w-64 bg-white border-r hidden md:block">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-primary">My Profile</h2>
      </div>

      <nav class="p-4 space-y-2">
        <NuxtLink
          to="/profile"
          class="block p-2 rounded hover:bg-gray-100 text-gray-700"
        >
          Thông tin chung
        </NuxtLink>
        <NuxtLink
          to="/profile/orders"
          class="block p-2 rounded hover:bg-gray-100 text-gray-700"
        >
          Lịch sử đơn hàng
        </NuxtLink>
        <NuxtLink
          to="/profile/settings"
          class="block p-2 rounded hover:bg-gray-100 text-gray-700"
        >
          Cài đặt
        </NuxtLink>

        <div class="border-t my-2 pt-2">
          <NuxtLink to="/" class="block p-2 text-red-500 hover:bg-red-50">
            Quay về trang chủ
          </NuxtLink>
        </div>
      </nav>
    </aside>

    <main class="flex-1 overflow-y-auto">
      <header class="bg-white p-4 shadow-sm flex justify-between md:hidden">
        <span class="font-bold">Menu</span>
        <NuxtLink to="/">Trang chủ</NuxtLink>
      </header>

      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>
