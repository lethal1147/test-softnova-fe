import { useUserStore } from "@/stores";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requireRoles = [] }: { requireRoles: string[] }) => {
  const { user } = useUserStore();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!requireRoles.includes(user.role)) {
    return <Navigate to="/books" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
