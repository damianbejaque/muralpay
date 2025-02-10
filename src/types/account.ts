import { Customer } from "./customer";

export type DepositAccount = {
  id: string;
  accountId: string;
  status: string;
  currency: string;
  bankBeneficiaryName: string;
};

export type Balance = {
  balance: number;
  tokenSymbol: string;
};

export type Account = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  balance: Balance;
  blockchain: string;
  customer: Customer;
  depositAccount: DepositAccount;
  isApiEnabled: boolean;
  isPending: boolean;
};
