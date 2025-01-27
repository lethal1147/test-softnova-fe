import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useBookStore } from "@/stores/bookStore";
import { formatPrice } from "@/utils";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Filter } from "lucide-react";

export default function FilterBookSidebar({
  navigate = false,
}: {
  navigate?: boolean;
}) {
  const { bookFilter, changeFilter, getSearchBook } = useBookStore();
  const [priceRange, setPriceRange] = useState([
    bookFilter.minPrice || 0,
    bookFilter.maxPrice || 5000,
  ]);
  const navigateTo = useNavigate();
  const [open, setOpen] = useState(false);

  const onChangePriceRange = (val: number[]) => {
    changeFilter("minPrice", val[0]);
    changeFilter("maxPrice", val[1]);
    setPriceRange(val);
  };

  const handleApplySearch = () => {
    getSearchBook(bookFilter);
    if (navigate) navigateTo("/search");
    setOpen(false);
  };

  const FilterContent = () => (
    <div className="space-y-6 flex flex-col items-center">
      <div className="w-full">
        <Label htmlFor="search">Search</Label>
        <Input
          name="textSearch"
          value={bookFilter.textSearch}
          onChange={(e) => changeFilter("textSearch", e.target.value)}
          type="text"
          id="search"
          placeholder="Book name or author"
        />
      </div>
      <div className="space-y-3 w-full">
        <Label>Price Range</Label>
        <Slider
          className="my-3"
          max={5000}
          step={1}
          value={priceRange}
          onValueChange={onChangePriceRange}
        />
        <div className="flex justify-between mt-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      <Button type="button" onClick={handleApplySearch} className="w-full">
        Apply search
      </Button>
    </div>
  );

  return (
    <div className="absolute lg:relative z-20">
      {/* Mobile and Tablet Sidebar */}
      <aside className="w-64 bg-white border p-4 rounded-lg shadow-md hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <FilterContent />
      </aside>

      {/* Desktop Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="block lg:hidden absolute">
          <Button variant="outline" className="gap-2 flex">
            <Filter size={16} />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-[425px] block lg:hidden"
        >
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          {open && <FilterContent />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
