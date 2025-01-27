import FilterBookSidebar from "@/components/books/filterBookSidebar";
import BaseDataTable from "@/components/table/baseDataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BOOKS_MANAGEMENT_TABLE_COLUMNS } from "@/constants";
import { useBookStore } from "@/stores/bookStore";
import { useEffect, useState } from "react";
import BookForm from "./components/bookForm";
import TablePagination from "@/components/table/tablePagination";
import { usePagination } from "@/hooks";
import { formatPrice } from "@/utils";
import { PencilIcon } from "lucide-react";

export default function BooksManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const { books, bookFilter, getSearchBook, totalBooks, selectBook } =
    useBookStore();
  const {
    page,
    pageLimit,
    handlerNextPage,
    handlerPrevPage,
    handlerLimitChange,
  } = usePagination({ size: totalBooks });

  useEffect(() => {
    getSearchBook({ ...bookFilter, page, limit: pageLimit });
  }, [page, pageLimit]);

  const onClose = () => {
    setOpenDialog(false);
    selectBook(null);
  };
  const formatted = books.map((book) => ({
    ...book,
    price: formatPrice(book.price),
    operation: (
      <div className="flex justify-center">
        <Button
          className="self-center"
          type="button"
          onClick={() => {
            selectBook(book);
            setOpenDialog(true);
          }}
        >
          <PencilIcon />
        </Button>
      </div>
    ),
  }));

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
            rows={formatted}
            columns={BOOKS_MANAGEMENT_TABLE_COLUMNS}
          />

          <TablePagination
            handlerPageLimitChange={handlerLimitChange}
            handlerNextPage={handlerNextPage}
            handlerPrevPage={handlerPrevPage}
            totalDocs={totalBooks}
            page={page}
            pageLimit={pageLimit}
          />
        </div>
      </div>
    </div>
  );
}
