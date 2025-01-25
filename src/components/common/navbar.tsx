import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { HoverCardPortal } from "@radix-ui/react-hover-card";
import { useUserStore } from "@/stores";

export default function Navbar() {
  const { user } = useUserStore();
  return (
    <nav className="bg-primary sticky w-full shadow-md ">
      <div className="py-4 px-8 flex justify-between items-center">
        <Link className="text-2xl font-bold text-white" to="/books">
          Book Store
        </Link>

        <div className="flex items-center gap-5">
          <HoverCard closeDelay={500}>
            <HoverCardTrigger>
              <Button asChild variant="ghost">
                <Link to="/cart" className="text-white">
                  <ShoppingCart className="h-6 w-6" />
                </Link>
              </Button>
            </HoverCardTrigger>
            <HoverCardPortal container={document.body}>
              <HoverCardContent>
                <div className="size-10 bg-gray-500 rounded-md" />
                <Separator className="my-3" />
                <p>Total : $200</p>
              </HoverCardContent>
            </HoverCardPortal>
          </HoverCard>
          <div className="flex gap-3 items-center rounded-md hover:bg-white/40 p-1 cursor-pointer transition-all">
            <div className="size-10 flex items-center justify-center rounded-full bg-white">
              <div className="font-bold">
                {user?.email?.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
