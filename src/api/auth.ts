import { api } from "@/services";
import { User } from "@/types";
import { BaseResponseProps } from "@/types";

export const loginApi = async (body: {
  email: string;
  password: string;
}): Promise<BaseResponseProps<User>> => await api.post("/auth/login", body);

export const registerApi = async (body: {
  email: string;
  password: string;
}): Promise<BaseResponseProps<User>> => await api.post("/user", body);
