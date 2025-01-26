import BaseDataTable from "@/components/table/baseDataTable";
import { PURCHASE_HISTORY_TABLE_COLUMNS } from "@/constants";
import { useBookTransactionStore } from "@/stores/bookTransactionStore";
import { formatPrice } from "@/utils";
import { useEffect } from "react";

export default function TransactionPage() {
  const { transactions, getAllTransaction } = useBookTransactionStore();
  const rowsData = transactions.map((tran) => ({
    ...tran,
    discount: formatPrice(tran.discount),
    net: formatPrice(tran.total),
    total: formatPrice(+tran.total + +tran.discount),
  }));

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
        </div>
      </div>
    </div>
  );
}
