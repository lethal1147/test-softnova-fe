import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Book } from "@/types";
import { formatBase64String } from "@/utils";

interface BookCardProps {
  book: Book;
  index: number;
  isBestSeller: boolean;
}

export default function BookCard({ book, index, isBestSeller }: BookCardProps) {
  const { addToCart } = useCartStore();
  const showLabel = index && index <= 3;
  return (
    <div className="rounded-lg shadow-md overflow-hidden relative">
      {showLabel && isBestSeller && (
        <div className="absolute top-0 right-0 size-40 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 mt-6 w-40 h-8 bg-red-600 text-white text-xs font-bold text-center leading-8 transform rotate-45">
            #{index} Best Seller
          </div>
        </div>
      )}
      <img
        src={formatBase64String(book.bookImage)}
        alt={book.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{book.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">{book.price}฿</span>
          <Button
            onClick={() => addToCart(book.id)}
            type="button"
            variant="outline"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
