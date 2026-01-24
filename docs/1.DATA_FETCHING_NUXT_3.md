Đây là bản tổng hợp kiến thức **Nuxt 3 Data Fetching** hoàn chỉnh, chi tiết và được cấu trúc lại logic nhất dựa trên các nội dung bạn cung cấp. Tài liệu này loại bỏ các ý trùng lặp và tập trung vào bản chất, cách dùng và kiến trúc chuẩn.

---

# Nuxt 3 Data Fetching: Cẩm Nang Chuyên Sâu

Tài liệu tổng hợp toàn diện về cơ chế lấy dữ liệu, các công cụ cốt lõi và mô hình kiến trúc chuẩn trong Nuxt 3.

## 1. Tư Duy Cốt Lõi: Universal Rendering

Trước khi sử dụng công cụ, cần hiểu nguyên tắc hoạt động của Nuxt để tránh lỗi Hydration hoặc gọi API dư thừa.

- **Server-Side Rendering (SSR):** Ở lần tải đầu tiên (F5/URL), code chạy trên **Server** (Node.js) để tạo HTML sẵn có dữ liệu.
- **Hydration:** Khi trình duyệt tải xong, Vue "sống lại" trên đống HTML đó.
- **Client-Side Navigation:** Khi chuyển trang (NuxtLink), code chạy hoàn toàn trên **Client** giống SPA.

> **Mục tiêu của Data Fetching:** Nuxt cung cấp `useFetch` và `useAsyncData` để xử lý thông minh quy trình này: **Server gọi API -> Lưu kết quả (Payload) -> Gửi xuống Client -> Client dùng lại kết quả (không gọi API nữa).**

---

## 2. Phân Tích Bộ 3 Công cụ: $fetch, useFetch, useAsyncData

### A. `$fetch` (Người vận chuyển - The Worker)

Là hàm tiện ích (Library function) dựa trên `ofetch`.

- **Bản chất:** Giống `axios` hoặc `fetch` native.
- **Kết quả:** Trả về **Promise** (Dữ liệu tĩnh / Raw data). **KHÔNG** có tính Reactive (giao diện không tự cập nhật).
- **Môi trường:** Chạy được mọi nơi (Server API, Middleware, Vue components, JS thuần).
- **Dùng khi:**
  - Gọi API trong thư mục `server/api`.
  - Action của người dùng: `onClick`, `onSubmit` (Login, Post comment).

### B. `useFetch` (Quản lý dự án - The Manager)

Là Composable bọc lấy `$fetch`. Đây là công cụ chính (95% trường hợp).

- **Bản chất:** Tạo ra tính **Reactivity**. Trả về các **Vue Ref** (`data`, `pending`, `error`).
- **Môi trường:** Chỉ chạy trong **Vue Context** (`setup`, `script setup`, composables).
- **Cơ chế:** Tự động chống trùng lặp dữ liệu giữa Server và Client (Hydration).
- **Dùng khi:** Fetch dữ liệu để hiển thị ngay khi trang web được tải.

### C. `useAsyncData` (Kiến trúc sư - The Architect)

Là phiên bản gốc, linh hoạt hơn `useFetch`.

- **Bản chất:** Bọc bất kỳ logic bất đồng bộ nào (Promise) để hỗ trợ SSR, không giới hạn ở việc gọi URL.
- **Dùng khi:**
  - Gọi nhiều API song song (`Promise.all`).
  - Logic lấy dữ liệu phức tạp không qua URL (VD: Gọi trực tiếp CMS SDK, Firebase, Database).

---

## 3. Bảng So Sánh Chi Tiết (Cheatsheet)

| Đặc điểm                | `$fetch`                       | `useFetch`                                 | `useAsyncData`                             |
| :---------------------- | :----------------------------- | :----------------------------------------- | :----------------------------------------- |
| **Loại**                | Library Function               | Vue Composable                             | Vue Composable                             |
| **Kết quả trả về**      | `Promise<Data>` (Tĩnh)         | `Ref<Data>`, `pending`, `error` (Reactive) | `Ref<Data>`, `pending`, `error` (Reactive) |
| **Lưu State?**          | KHÔNG                          | CÓ                                         | CÓ                                         |
| **Chống Double Fetch?** | Không (Gọi là chạy)            | **Có** (Dựa vào Key)                       | **Có** (Dựa vào Key)                       |
| **Môi trường**          | Mọi nơi                        | Chỉ trong `.vue` & composables             | Chỉ trong `.vue` & composables             |
| **Trường hợp dùng**     | Submit Form, Login, Server API | Load data hiển thị trang (Page Load)       | Parallel request, 3rd party SDK            |

---

## 4. Deep Dive: `useFetch` & Các Tham Số Quan Trọng

Cú pháp chuẩn:

```typescript
const { data, pending, error, refresh, execute } = await useFetch(url, options);
```

### A. Bản chất biến trả về (Ref)

- Biến `data`, `pending` là **Vue Ref** (giống `ref()`).
- **Trong `<script>`:** Phải dùng `.value` (VD: `data.value`).
- **Trong `<template>`:** Dùng trực tiếp (Vue tự unwrap).
- **Tính chất:** Khi `data` thay đổi, giao diện tự động render lại.

### B. Vấn đề về `key` (Tại sao phải đặt?)

Nuxt cần một ID để khớp dữ liệu giữa Server và Client.

- **Mặc định:** Nuxt tự sinh key dựa trên _tên file_ và _dòng code_.
- **Vấn đề:** Nếu dùng `useFetch` trong một component được tái sử dụng nhiều lần (VD: `ProductCard` trong vòng lặp `v-for`), tất cả sẽ có **chung một key mặc định** -> **Ghi đè dữ liệu hoặc lỗi Hydration Mismatch.**
- **Giải pháp:** Bắt buộc đặt key unique thủ công trong trường hợp này.
  ```typescript
  // Trong ProductCard.vue
  useFetch("/api/product", { key: `prod-${props.id}` });
  ```

### C. Các `options` bắt buộc phải nhớ

1.  **`lazy: boolean`**
    - `false` (Mặc định): Chặn (block) điều hướng cho đến khi có data. Tốt cho SEO, tránh layout shift.
    - `true`: Chuyển trang ngay lập tức. `data` ban đầu là `null`, `pending` là `true`. Cần hiển thị Skeleton/Loading. Dùng cho API chậm hoặc trang con không quan trọng SEO.

2.  **`server: boolean`**
    - `true` (Mặc định): Fetch ở Server (SSR) rồi gửi xuống Client.
    - `false`: Chỉ fetch ở Client (SPA mode). Dùng cho dữ liệu riêng tư (User Profile) hoặc dữ liệu không cần SEO.

3.  **`watch: [Ref]`**
    - Tự động gọi lại API khi biến trong mảng thay đổi.
    - **Ứng dụng:** Search, Pagination, Filter.
    - _Ví dụ:_ `watch: [page, searchKeyword]`

4.  **`transform: (res) => ...`**
    - Hàm sửa đổi dữ liệu trước khi lưu vào biến `data`.
    - **Ứng dụng:** Chuyển đổi format (Snake_case -> CamelCase), lọc bỏ dữ liệu thừa.

5.  **`pick: string[]`**
    - Chỉ lấy các field cụ thể từ response để giảm dung lượng Payload gửi từ Server xuống Client.
    - _Ví dụ:_ `pick: ['title', 'slug', 'thumbnail']`.

6.  **`immediate: boolean`**
    - `true` (Mặc định): Gọi ngay khi load component.
    - `false`: Không gọi ngay. Phải kích hoạt thủ công bằng hàm `execute()`. Dùng cho tính năng "Load More".

---

## 5. Kỹ Thuật Nâng Cao: Gọi API Song Song

Khi cần gọi nhiều API cùng lúc, đừng dùng `await useFetch` liên tiếp (sẽ bị tuần tự - Waterfall). Hãy dùng `useAsyncData` kết hợp `Promise.all`:

```typescript
const { data } = await useAsyncData("home-data", async () => {
  const [products, categories] = await Promise.all([
    $fetch("/api/products"),
    $fetch("/api/categories"),
  ]);
  return { products, categories };
});
```

---

## 6. Kiến Trúc Chuẩn (BFF Pattern) Cho Dự Án Thực Tế

Nên tổ chức code theo mô hình 3 tầng để dễ bảo trì và mở rộng:

**Tầng 1: Backend Giả lập / Proxy (`server/api/*.ts`)**

- **Công cụ:** `$fetch`.
- **Nhiệm vụ:**
  - Gọi External API (Backend thật).
  - Giấu API Key, Token.
  - Trả về JSON chuẩn (thường là Snake Case).

**Tầng 2: Service Logic (`composables/useProductService.ts`)**

- **Công cụ:** `useFetch` / `useAsyncData`.
- **Nhiệm vụ:**
  - Gọi Tầng 1.
  - Dùng `transform` để map dữ liệu sang Camel Case (chuẩn JS/Frontend).
  - Xử lý lỗi chung (Error Handling).
  - Return về các Ref cho UI.

**Tầng 3: UI Presentation (`pages/*.vue` hoặc Components)**

- **Công cụ:** Gọi hàm từ Tầng 2.
- **Nhiệm vụ:**
  - Nhận `data`, `pending`.
  - Hiển thị giao diện, Loading spinner, thông báo lỗi.
  - Không chứa logic gọi API trực tiếp.

---

## 7. Tổng Kết Chiến Thuật

1.  **Mặc định:** Dùng **`useFetch`**.
2.  **Form Submit / Click Action:** Dùng **`$fetch`**.
3.  **Search / Phân trang:** Dùng **`useFetch`** + **`watch`**.
4.  **Component dùng lại (v-for):** Dùng **`useFetch`** + **`key` thủ công**.
5.  **Load nhiều API cùng lúc:** Dùng **`useAsyncData`** + `Promise.all`.
6.  **Load More:** Dùng **`useFetch`** + `immediate: false`.
