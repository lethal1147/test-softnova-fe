import BookSection from "@/components/books/bookSection";
import FilterBookSidebar from "@/components/books/filterBookSidebar";
import { useBookStore } from "@/stores/bookStore";
import { useEffect } from "react";

export default function BooksPage() {
  const { getHomepageBook, newRelease, bestSeller } = useBookStore();

  useEffect(() => {
    getHomepageBook();
  }, []);

  return (
    <div className="h-full flex">
      <FilterBookSidebar navigate />
      <div className="container space-y-3 !z-10">
        <BookSection books={bestSeller} title="Best seller" />
        <BookSection books={newRelease} title="New release" />
      </div>
    </div>
  );
}
