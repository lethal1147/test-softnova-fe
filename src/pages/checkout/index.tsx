import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoaderStore, useUserStore } from "@/stores";
import { useBookTransactionStore } from "@/stores/bookTransactionStore";
import { useCartStore } from "@/stores/cartStore";
import { CreateBookTransactionBody } from "@/types";
import {
  calculateCartDiscount,
  formatBase64String,
  formatPrice,
} from "@/utils";
import { Separator } from "@radix-ui/react-separator";

export default function CheckoutPage() {
  const { carts } = useCartStore();
  const { createTransaction } = useBookTransactionStore();
  const { user } = useUserStore();
  const { startLoading, stopLoading } = useLoaderStore();
  const { subtotal, total, discount } = calculateCartDiscount(carts);

  const onCheckout = async () => {
    if (!user?.id) return;
    const body: CreateBookTransactionBody = {
      userId: user.id,
      total: total,
      discount: discount,
      bookTransactionItem: carts.map((cart) => ({
        bookId: cart.bookId,
        price: cart.book.price,
        qty: cart.qty,
      })),
    };
    startLoading();
    await createTransaction(body);
    stopLoading();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
              <ul className="space-y-4">
                {carts.map((cart) => (
                  <li key={cart.id} className="flex items-center space-x-4">
                    <img
                      src={formatBase64String(cart.book.bookImage)}
                      alt={cart.book.name}
                      width={60}
                      height={90}
                      className="object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{cart.book.name}</h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {cart.qty}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: {cart.book.price}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(cart.book.price * cart.qty)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onCheckout} type="button" className="w-full">
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
