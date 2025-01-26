import CartHoverCard from "./cartHoverCard";
import UserDropdown from "./userDropdown";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary sticky w-full shadow-md ">
      <div className="py-4 px-8 flex justify-between items-center">
        <Link className="text-2xl font-bold text-white" to="/books">
          Book Store
        </Link>

        <div className="flex items-center gap-5">
          <CartHoverCard />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
