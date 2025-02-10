import { createContext } from "react";
import { Customer } from "../types/customer";

interface AuthContextType {
  customer: Customer | null;
  login: (customer: Customer) => void;
  createAccount: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  customer: null,
  login: async () => {},
  createAccount: async () => {},
  logout: () => {},
});
