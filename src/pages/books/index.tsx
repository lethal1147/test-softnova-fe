import BookSection from "@/components/books/bookSection";
import FilterBookSidebar from "@/components/books/filterBookSidebar";

export default function BooksPage() {
  return (
    <div className="h-full flex">
      <FilterBookSidebar />
      <div className="container space-y-3 !z-10">
        <BookSection title="Best seller" />
        <BookSection title="New release" />
      </div>
    </div>
  );
}
