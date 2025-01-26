import { CartWithBook } from "@/types";
import { handleError } from "@/utils";
import { create } from "zustand";
import { useUserStore } from "./userStore";
import {
  createCartItemApi,
  getCartApi,
  removeFromCartApi,
  updateCartItemQuantityApi,
} from "@/api";

interface CartState {
  carts: CartWithBook[];
  getCart: () => Promise<void>;
  addToCart: (bookId: number) => Promise<void>;
  removeFromCart: (cartId: number) => Promise<void>;
  updateCartItemQuantity: (bookId: number, qty: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  carts: [],
  getCart: async () => {
    try {
      const userId = useUserStore.getState().user?.id;
      if (!userId) throw new Error("User not logged in.");

      const response = await getCartApi(userId);
      if (response.error) throw new Error(response.message);

      set({ carts: response.data });
    } catch (err) {
      handleError(err);
    }
  },
  addToCart: async (bookId: number) => {
    try {
      const existingCartItem = get().carts.find(
        (item) => item.bookId === bookId
      );

      if (existingCartItem) {
        await get().updateCartItemQuantity(bookId, +existingCartItem.qty + 1);
      } else {
        const userId = useUserStore.getState().user?.id;
        if (!userId) throw new Error("User not logged in.");

        const response = await createCartItemApi({
          userId,
          bookId,
          qty: 1,
        });
        if (response.error) throw new Error(response.message);
        await get().getCart();
      }
    } catch (err) {
      handleError(err);
    }
  },
  removeFromCart: async (cartId: number) => {
    try {
      const response = await removeFromCartApi(cartId);
      if (response.error) throw new Error(response.message);

      await get().getCart();
    } catch (err) {
      handleError(err);
    }
  },
  updateCartItemQuantity: async (bookId, qty) => {
    const cartItem = get().carts.find((item) => item.bookId === bookId);

    if (cartItem) {
      const response = await updateCartItemQuantityApi(cartItem.id, qty);
      if (response.error) throw new Error(response.message);

      await get().getCart();
    }
  },
}));
