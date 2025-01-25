import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

export default function FilterBookSidebar() {
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <aside className="w-64 h-full bg-white border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input type="text" id="search" placeholder="Book name or author" />
        </div>
        <div className="space-y-3">
          <Label>Price Range</Label>
          <Slider
            className="my-3"
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
