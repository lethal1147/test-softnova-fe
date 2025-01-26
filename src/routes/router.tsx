import { AuthenLayout } from "@/layout";
import { BooksPage, LoginPage, RegisterPage, BooksManagement } from "@/pages";
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
      <Route element={<AuthenLayout />}>
        <Route path="books" element={<BooksPage />} />
        <Route element={<ProtectedRoute requireRoles={["admin"]} />}>
          <Route path="books-management" element={<BooksManagement />} />
        </Route>
      </Route>
    </>
  )
);
