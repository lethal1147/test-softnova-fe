import BookSection from "@/components/books/bookSection";
import FilterBookSidebar from "@/components/books/filterBookSidebar";
import { useLoaderStore } from "@/stores";
import { useBookStore } from "@/stores/bookStore";
import { useEffect } from "react";

export default function BooksPage() {
  const { getHomepageBook, newRelease } = useBookStore();
  const { startLoading, stopLoading } = useLoaderStore();

  useEffect(() => {
    startLoading();
    getHomepageBook();
    stopLoading();
  }, []);

  return (
    <div className="h-full flex">
      <FilterBookSidebar />
      <div className="container space-y-3 !z-10">
        <BookSection books={newRelease} title="Best seller" />
        <BookSection books={newRelease} title="New release" />
      </div>
    </div>
  );
}
