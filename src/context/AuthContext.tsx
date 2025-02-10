import { useState, ReactNode } from "react";
import { Customer } from "../types/customer";
import { AuthContext } from "./AuthContextDefinition";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const localCustomer = localStorage.getItem("customer");
  const [customer, setCustomer] = useState<Customer | null>(
    localCustomer ? JSON.parse(localCustomer) : null
  );

  const login = (customer: Customer) => {
    setCustomer(customer);
    localStorage.setItem("customer", JSON.stringify(customer));
  };

  const createAccount = async (name: string, organizationType: string) => {
    const createAccountUrl =
      (import.meta.env.VITE_BASE_API_URL as string) + "/customers";
    try {
      const response = await fetch(createAccountUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({ name, organizationType }),
      });

      if (!response.ok) {
        throw new Error("Sign up failed");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem("customer");
  };

  return (
    <AuthContext.Provider value={{ customer, login, createAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
