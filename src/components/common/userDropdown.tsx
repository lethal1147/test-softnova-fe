import { useUserStore } from "@/stores";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CreditCard, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserDropdown() {
  const { user, logout } = useUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-3 items-center rounded-md hover:bg-white/40 p-1 cursor-pointer transition-all">
          <div className="size-10 flex items-center justify-center rounded-full bg-white">
            <div className="font-bold">
              {user?.email?.slice(0, 2).toUpperCase()}
            </div>
          </div>
          <p className=" hidden md:inline">{user?.email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer duration-150 focus:bg-gray-300"
          asChild
        >
          <div className="flex">
            <CreditCard />
            <Link to="purchase-history">Purchase history</Link>
          </div>
        </DropdownMenuItem>
        {user?.role === "admin" && (
          <DropdownMenuItem
            className="cursor-pointer duration-150 focus:bg-gray-300"
            asChild
          >
            <div className="flex">
              <Settings />
              <Link to="/books-management">Manage book</Link>
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer duration-150 focus:bg-gray-300"
        >
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
