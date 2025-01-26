import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useBookStore } from "@/stores/bookStore";
import { formatPrice } from "@/utils";

export default function FilterBookSidebar() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const { bookFilter, changeFilter, getSearchBook } = useBookStore();

  const onChangePriceRange = (val: number[]) => {
    changeFilter("minPrice", val[0]);
    changeFilter("maxPrice", val[1]);
    setPriceRange(val);
  };

  return (
    <aside className="w-64 bg-white border p-4 rounded-lg shadow-md ">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-6 flex flex-col items-center">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            name="textSearch"
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
        <Button type="button" onClick={() => getSearchBook(bookFilter)}>
          Apply search
        </Button>
      </div>
    </aside>
  );
}
