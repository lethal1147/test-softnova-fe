import { loginApi } from "@/api";
import { User } from "@/types";
import { handleError } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: null | User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        try {
          const response = await loginApi({ email, password });
          set({
            user: response.data,
            isAuthenticated: true,
          });
        } catch (err) {
          handleError(err);
        }
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
