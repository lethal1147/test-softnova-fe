import { Button } from "@/components/ui/button";

interface BookCardProps {
  bookImage: string;
  bookName: string;
  author: string;
  price: number;
}

export default function BookCard({
  //   bookImage,
  bookName,
  author,
  price,
}: BookCardProps) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <img
        src={"https://placehold.co/600x400"}
        alt={bookName}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{bookName}</h3>
        <p className="text-gray-600 text-sm mb-2">{author}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">${price.toFixed(2)}</span>
          <Button variant="outline" size="sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
