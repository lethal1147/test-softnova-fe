import { DISCOUNT_RATES } from "@/constants";
import { CartWithBook } from "@/types";

/*
 ตัวอย่างแรก 2A + 1B ->
 (A.price * A.qty + B.price * B.qty) - (lowestQty * ((A.price + B.price) * rate))
 (100 * 2 + 100 * 1) - (1 * ((100 + 100) * 0.1))
 total = 240, ส่วนลด 20
 ==============================================================
 ตัวอย่างสอง 3A + 3B ->
 (A.price * A.qty + B.price * B.qty) - (lowestQty * ((A.price + B.price) * rate)) ->
 (100 * 3 + 100 * 3) - (3 * ((100 + 100) * 0.1))
 total = 540, ส่วนลด 60
 ==============================================================
 ตัวอย่างสาม 3A + 3B + 2C ->
 (A.price * A.qty + B.price * B.qty + C.price * C.qty) - (lowestQty * ((A.price + B.price + C.price) * rate))
 (100 * 3 + 100 * 3 + 100 * 2) - (2 * (100 + 100 + 100) * 0.2)
 total = 680, ส่วนลด 120
 */
export const calculateCartDiscount = (
  carts: CartWithBook[]
): {
  subtotal: number;
  discount: number;
  total: number;
} => {
  // Point A = 2A + 1B
  // Point B = 3A + 3B
  let subtotal = 0;
  let sumPriceOfEach = 0;
  const uniqueBooks = new Set<number>();
  const quantityCount: Record<number, number> = {};

  for (const cart of carts) {
    subtotal += +cart.book.price * +cart.qty;
    uniqueBooks.add(cart.bookId);
    quantityCount[cart.qty] = (quantityCount[cart.qty] || 0) + 1;
    sumPriceOfEach += +cart.book.price;
  }

  if (uniqueBooks.size < 2) {
    return { subtotal, discount: 0, total: subtotal };
  }

  const discountRate =
    uniqueBooks.size <= 7 ? DISCOUNT_RATES[uniqueBooks.size] : 0.6;
  const totalPromotion = Math.min(...Object.keys(quantityCount).map(Number));
  const discount = sumPriceOfEach * discountRate * totalPromotion;

  return { subtotal: subtotal, discount: discount, total: subtotal - discount };
};
