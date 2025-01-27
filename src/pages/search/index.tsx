import BookCard from "@/components/books/bookCard";
import FilterBookSidebar from "@/components/books/filterBookSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { useBookStore } from "@/stores/bookStore";

export default function SearchPage() {
  const { books } = useBookStore();

  return (
    <div className="h-full flex gap-5">
      <FilterBookSidebar />
      <div className="container gap-5 grid grid-cols-3 !z-10">
        {books.map((book, idx) => (
          <div className="p-1">
            <Card className="z-10 aspect-square">
              <CardContent className="flex  items-center justify-center p-6">
                <BookCard isBestSeller={false} index={idx + 1} book={book} />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
