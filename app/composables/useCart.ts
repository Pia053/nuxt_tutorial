import type { CartItem, Product } from "~/types";

export const useCart = () => {
  const cart = useState<CartItem[]>("cart-state", () => []);

  const totalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.value.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ product, quantity: 1 });
    }

    alert(`Đã thêm ${product.name} vào giỏ!`);
  };

  const remooveFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.product.id !== productId);
  };

  const clearCart = () => {
    cart.value = [];
  };

  return {
    cart,
    totalItems,
    addToCart,
    remooveFromCart,
    clearCart,
  };
};
