import { loginApi, registerApi } from "@/api";
import { User } from "@/types";
import { handleError, handleSuccess } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: null | User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        try {
          const response = await loginApi({ email, password });
          if (response.error) throw new Error(response.message);

          set({
            user: response.data,
            isAuthenticated: true,
          });
          window.location.href = "/books";
        } catch (err) {
          handleError(err);
        }
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        window.location.href = "/login";
      },
      register: async (email, password) => {
        try {
          const response = await registerApi({ email, password });
          if (response.error) throw new Error(response.message);

          const responseLogin = await loginApi({ email, password });
          if (responseLogin.error) throw new Error(responseLogin.message);
          set({
            user: responseLogin.data,
            isAuthenticated: true,
          });
          handleSuccess(response.message);
          window.location.href = "/books";
        } catch (err) {
          handleError(err);
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
