export interface BlockchainDetails {
  blockchain: "POLYGON" | string; // In this case "POLYGON" is expected, but you can allow other strings if needed.
  walletAddress: string;
}

export interface RecipientInfo {
  blockchainDetails: BlockchainDetails;
  createdAt: string; // ISO date string
  id: string;
  recipientTransferType: "BLOCKCHAIN" | string; // Assuming BLOCKCHAIN is the only type here.
  tokenAmount: number;
  updatedAt: string; // ISO date string
}

export interface Payout {
  createdAt: string; // ISO date string
  id: string;
  memo: string;
  payoutAccountId: string;
  recipientsInfo: RecipientInfo[];
  status: "IN_REVIEW" | string; // Status value ("IN_REVIEW" here) but allow other strings if necessary.
  updatedAt: string; // ISO date string
}
