import Navbar from "@/components/common/navbar";
import { Outlet } from "react-router-dom";

export default function AuthenLayout() {
  return (
    <main className="min-h-screen max-w-screen relative flex flex-col ">
      <Navbar />
      <section className="relative p-5 w-full grow">
        <Outlet />
      </section>
    </main>
  );
}
