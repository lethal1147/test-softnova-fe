import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import BookCard from "./bookCard";
import { Book } from "@/types";

interface CarouselProps {
  books: Book[];
  isBestSeller: boolean;
}

export default function BookCarousel({ books, isBestSeller }: CarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full z-10 max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
    >
      <CarouselContent>
        {books.map((book, idx) => (
          <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="z-10">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <BookCard
                    isBestSeller={isBestSeller}
                    index={idx + 1}
                    book={book}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
