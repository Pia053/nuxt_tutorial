import type { CartItem, Product } from "~/types";

export const useCart = () => {
  /**
   * State chạy cả hai SSR và CSR
   * Khi request useState được tạo và gán giá trị mặc định
   * Giá trị này được serialize (tuần tự hóa) vào HTML và gửi về client
   */
  const cart = useState<CartItem[]>("cart-state", () => []);

  // Tính tổng các item
  const totalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product: Product) => {
    const existingItem = cart.value.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ product, quantity: 1 });
    }
  };

  const totalPrice = computed(() => {
    return cart.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  });

  // Xóa sản phẩm khỏi giỏ hàng
  const remooveFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.product.id !== productId);
  };

  // Xóa tất cả sản phẩm khỏi giỏ hàng
  const clearCart = () => {
    cart.value = [];
  };

  // Load lại khi vừa mở trang (Chỉ chạy ở Client)
  onMounted(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("nuxt-shop-cart");
      if (savedCart) {
        try {
          cart.value = JSON.parse(savedCart);
        } catch (error) {
          localStorage.removeItem("nuxt-shop-cart");
        }
      }
    }
  });

  watch(
    cart,
    (newCart) => {
      if (import.meta.client) {
        localStorage.setItem("nuxt-shop-cart", JSON.stringify(newCart));
      }
    },
    { deep: true },
  );

  return {
    cart,
    totalItems,
    addToCart,
    remooveFromCart,
    clearCart,
    totalPrice,
  };
};
