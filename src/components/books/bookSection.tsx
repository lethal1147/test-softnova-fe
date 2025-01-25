import BookCarousel from "./bookCarousel";

const dummyBooks = [
  {
    id: 1,
    bookImage: "/placeholder.svg",
    bookName: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
  },
  {
    id: 2,
    bookImage: "/placeholder.svg",
    bookName: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
  },
  {
    id: 3,
    bookImage: "/placeholder.svg",
    bookName: "1984",
    author: "George Orwell",
    price: 11.99,
  },
  {
    id: 4,
    bookImage: "/placeholder.svg",
    bookName: "Pride and Prejudice",
    author: "Jane Austen",
    price: 9.99,
  },
  {
    id: 5,
    bookImage: "/placeholder.svg",
    bookName: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 13.99,
  },
];

export default function BookSection({ title }: { title: string }) {
  return (
    <div className="!z-10">
      <h2 className="text-2xl font-bold mb-4 text-center ">{title}</h2>
      <BookCarousel books={dummyBooks} />
    </div>
  );
}
