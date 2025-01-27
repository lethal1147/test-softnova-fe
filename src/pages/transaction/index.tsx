import BaseDataTable from "@/components/table/baseDataTable";
import TablePagination from "@/components/table/tablePagination";
import { PURCHASE_HISTORY_TABLE_COLUMNS } from "@/constants";
import { usePagination } from "@/hooks";
import { useBookTransactionStore } from "@/stores/bookTransactionStore";
import { formatPrice } from "@/utils";
import { useEffect } from "react";

export default function TransactionPage() {
  const { transactions, getAllTransaction, totalTransactions } =
    useBookTransactionStore();
  const rowsData = transactions.map((tran) => ({
    ...tran,
    discount: formatPrice(tran.discount),
    net: formatPrice(tran.total),
    total: formatPrice(+tran.total + +tran.discount),
  }));
  const {
    page,
    pageLimit,
    handlerNextPage,
    handlerPrevPage,
    handlerLimitChange,
  } = usePagination({ size: totalTransactions });

  useEffect(() => {
    getAllTransaction();
  }, []);

  return (
    <div className="h-full flex gap-10">
      <div className="container space-y-3 mx-auto !z-10 flex flex-col items-end">
        <div className="w-full">
          <BaseDataTable
            rows={rowsData}
            columns={PURCHASE_HISTORY_TABLE_COLUMNS}
          />

          <TablePagination
            handlerPageLimitChange={handlerLimitChange}
            handlerNextPage={handlerNextPage}
            handlerPrevPage={handlerPrevPage}
            totalDocs={totalTransactions}
            page={page}
            pageLimit={pageLimit}
          />
        </div>
      </div>
    </div>
  );
}
