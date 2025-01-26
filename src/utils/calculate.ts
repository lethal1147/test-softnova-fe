import { CartWithBook } from "@/types";

/**
 * ตัวอย่างแรก 2A + 1B ->
 * -> (A.price * A.qty + B.price * B.qty) - (lowestQty * ((A.price + B.price) * rate))
 * -> (100 * 2 + 100 * 1) - (1 * ((100 + 100) * 0.1))
 * -> total = 240, ส่วนลด 20
 * ==============================================================
 * ตัวอย่างสอง 3A + 3B ->
 * -> (A.price * A.qty + B.price * B.qty) - (lowestQty * ((A.price + B.price) * rate)) ->
 * -> (100 * 3 + 100 * 3) - (3 * ((100 + 100) * 0.1))
 * -> total = 540, ส่วนลด 60
 * ==============================================================
 * ตัวอย่างสาม 3A + 3B + 2C ->
 * -> (A.price * A.qty + B.price * B.qty + C.price * C.qty) - (lowestQty * ((A.price + B.price + C.price) * rate))
 * -> (100 * 3 + 100 * 3 + 100 * 2) - (2 * (100 + 100 + 100) * 0.2)
 * -> total = 680, ส่วนลด 120
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
  const discountRates: Record<number, number> = {
    2: 0.1,
    3: 0.2,
    4: 0.3,
    5: 0.4,
    6: 0.5,
    7: 0.6,
  };
  const subtotal = carts.reduce(
    (sum, cart) => sum + +cart.book.price * +cart.qty,
    0
  );

  const unique = new Set(carts.map((cart) => cart.bookId));
  if (unique.size < 2) return { subtotal, discount: 0, total: subtotal };

  const discountRate = discountRates[unique.size] || 0;

  const quantityMap = new Map<number, number>();

  carts.forEach((item) => {
    const currentCount = quantityMap.get(item.qty) || 0;
    quantityMap.set(item.qty, currentCount + 1);
  });
  const sumPriceOfEach = carts.reduce((acc, item) => {
    return acc + +item.book.price;
  }, 0);
  const totalPromotion = Math.min(
    ...Array.from(quantityMap.entries()).map(([key]) => key)
  );
  const sumTotal = carts.reduce((acc, item) => {
    return acc + item.book.price * item.qty;
  }, 0);
  const discount = sumPriceOfEach * discountRate * totalPromotion;
  return { subtotal: sumTotal, discount: discount, total: sumTotal - discount };
};
