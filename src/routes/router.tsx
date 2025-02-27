import { AuthenLayout } from "@/layout";
import {
  BooksPage,
  LoginPage,
  RegisterPage,
  BooksManagement,
  CheckoutPage,
  TransactionPage,
  SearchPage,
} from "@/pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<LoginPage />} />
      <Route element={<ProtectedRoute requireRoles={["user", "admin"]} />}>
        <Route element={<AuthenLayout />}>
          <Route path="books" element={<BooksPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="purchase-history" element={<TransactionPage />} />
          <Route element={<ProtectedRoute requireRoles={["admin"]} />}>
            <Route path="books-management" element={<BooksManagement />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);
