import { CartWithBook } from "@/types";
import { calculateCartDiscount } from "../calculate";

describe("calculateCartDiscount", () => {
  const createCart = (
    bookId: number,
    qty: number,
    price: number
  ): CartWithBook => ({
    id: 0,
    qty: qty,
    userId: price,
    bookId: bookId,
    book: {
      id: bookId,
      bookImage: "",
      name: "",
      price: price,
      author: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    },
  });

  it("should discount 10% for two unique books", () => {
    const carts = [createCart(1, 2, 100), createCart(2, 1, 100)];
    const expected = {
      subtotal: 300,
      discount: 20,
      total: 280,
    };
    const result = calculateCartDiscount(carts);
    console.log(result);
    expect(result).toEqual(expected);
  });

  it("should discount 10% * lowest quantity for two unique books", () => {
    const carts = [createCart(1, 3, 100), createCart(2, 3, 100)];
    const expected = {
      subtotal: 600,
      discount: 60,
      total: 540,
    };
    const result = calculateCartDiscount(carts);
    console.log(result);

    expect(result).toEqual(expected);
  });

  it("should discount 20% for three unique books", () => {
    const carts = [
      createCart(1, 1, 100),
      createCart(2, 1, 100),
      createCart(3, 1, 100),
    ];
    const expected = {
      subtotal: 300,
      discount: 60,
      total: 240,
    };
    const result = calculateCartDiscount(carts);
    console.log(result);

    expect(result).toEqual(expected);
  });

  it("should return 0 discount for one unique book", () => {
    const carts = [createCart(1, 10, 100)];
    const expected = {
      subtotal: 1000,
      discount: 0,
      total: 1000,
    };
    const result = calculateCartDiscount(carts);
    console.log(result);

    expect(result).toEqual(expected);
  });

  it("should discount 60% for more than 7 unique books", () => {
    const carts = [
      createCart(1, 1, 100),
      createCart(2, 1, 100),
      createCart(3, 1, 100),
      createCart(4, 1, 100),
      createCart(5, 1, 100),
      createCart(6, 1, 100),
      createCart(7, 1, 100),
      createCart(8, 1, 100),
    ];
    const expected = {
      subtotal: 800,
      discount: 480,
      total: 320,
    };
    const result = calculateCartDiscount(carts);
    console.log(result);

    expect(result).toEqual(expected);
  });
});
