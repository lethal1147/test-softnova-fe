export type UserRole = "admin" | "user";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  password?: string;
}
