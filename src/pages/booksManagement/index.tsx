import FilterBookSidebar from "@/components/books/filterBookSidebar";
import BaseDataTable from "@/components/table/baseDataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BOOKS_MANAGEMENT_TABLE_COLUMNS } from "@/constants";
import { useBookStore } from "@/stores/bookStore";
import { useEffect, useState } from "react";
import BookForm from "./components/bookForm";
import { useLoaderStore } from "@/stores";

export default function BooksManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const { books, bookFilter, getSearchBook } = useBookStore();
  const { startLoading, stopLoading } = useLoaderStore();

  useEffect(() => {
    startLoading();
    getSearchBook(bookFilter);
    stopLoading();
  }, []);

  const onClose = () => setOpenDialog(false);

  return (
    <div className="h-full flex gap-10">
      <FilterBookSidebar />
      <div className="container space-y-3 !z-10 flex flex-col items-end">
        <Dialog onOpenChange={setOpenDialog} open={openDialog}>
          <DialogTrigger asChild>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent>
            <BookForm onClose={onClose} />
          </DialogContent>
        </Dialog>
        <div className="w-full">
          <BaseDataTable
            rows={books}
            columns={BOOKS_MANAGEMENT_TABLE_COLUMNS}
          />
        </div>
      </div>
    </div>
  );
}
