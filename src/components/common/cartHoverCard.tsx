import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { HoverCardPortal } from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { formatBase64String, formatPrice } from "@/utils";
import { useEffect } from "react";

export default function CartHoverCard() {
  const { carts, getCart, updateCartItemQuantity } = useCartStore();
  const totalPrice = carts.reduce(
    (sum, item) => sum + +item.qty * +item.book.price,
    0
  );

  useEffect(() => {
    getCart();
  }, []);
  return (
    <HoverCard closeDelay={500}>
      <HoverCardTrigger>
        <Button asChild variant="outline">
          <Link to="/checkout" className="text-white relative bg-transparent">
            <ShoppingCart />
            {carts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {carts.length}
              </span>
            )}
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardPortal container={document.body}>
        <HoverCardContent className="w-64">
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {carts.length > 0 ? (
              carts.map((cart) => (
                <li className="flex space-x-4">
                  <img
                    src={formatBase64String(cart.book.bookImage)}
                    alt={cart.book.name}
                    className="object-cover w-20 h-24"
                  />
                  <div className="flex-1 gap-3">
                    <p className="text-sm font-medium">{cart.book.name}</p>
                    <p className="text-sm ">By: {cart.book.author}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateCartItemQuantity(cart.bookId, cart.qty - 1)
                        }
                        // disabled={cart.qty <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{cart.qty}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateCartItemQuantity(cart.bookId, cart.qty + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatPrice(cart.book.price * cart.qty)}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-center">No book in cart.</li>
            )}
          </ul>
          <Separator className="my-3" />
          <p>Total : {formatPrice(totalPrice)}</p>
          <Button size="sm" asChild>
            <Link to="/checkout">Checkout</Link>
          </Button>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}
