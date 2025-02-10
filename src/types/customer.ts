type CurrencyInfo = {
  currencyCode: string;
  stage: "TOS" | "COMPLETE";
  isRestricted: boolean;
};

type Account = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
};

type CustomerType = "BUSINESS" | "INDIVIDUAL";
type Status = "COMPLETE" | "PENDING" | "INCOMPLETE";

export type Customer = {
  id: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  customerType: CustomerType;
  status: Status;
  currenciesInfo: CurrencyInfo[];
  account: Account;
};
