import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import BookCard from "./bookCard";

interface Book {
  id: number;
  bookImage: string;
  bookName: string;
  author: string;
  price: number;
}

interface CarouselProps {
  books: Book[];
}

export default function BookCarousel({ books }: CarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full z-10 max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
    >
      <CarouselContent>
        {books.map((book) => (
          <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="z-10">
                <CardContent className="flex items-center justify-center p-6">
                  <BookCard {...book} />
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
