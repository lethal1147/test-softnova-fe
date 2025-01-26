import { api } from "@/services";
import { BaseResponseProps, CartWithBook, CreateCartBody } from "@/types";

export const createCartItemApi = async (
  body: CreateCartBody
): Promise<BaseResponseProps<CartWithBook>> => api.post("/cart", body);

export const getCartApi = async (
  userId: number
): Promise<BaseResponseProps<CartWithBook[]>> => api.get(`/cart/${userId}`);

export const updateCartItemQuantityApi = async (
  cartId: number,
  qty: number
): Promise<BaseResponseProps<CartWithBook>> =>
  api.patch(`/cart/${cartId}`, { qty });

export const removeFromCartApi = async (
  cartId: number
): Promise<BaseResponseProps<CartWithBook>> => api.delete(`/cart/${cartId}`);
