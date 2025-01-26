import { Book } from "@/types";
import BookCarousel from "./bookCarousel";

export default function BookSection({
  title,
  books,
}: {
  title: string;
  books: Book[];
}) {
  return (
    <div className="!z-10">
      <h2 className="text-2xl font-bold mb-4 text-center ">{title}</h2>
      <BookCarousel isBestSeller={title === "Best seller"} books={books} />
    </div>
  );
}
