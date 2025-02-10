import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Grid2,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { AuthContext } from "../context/AuthContextDefinition";
import Layout from "./Layout";

interface Recipient {
  name: string;
  currencyCode: string;
  tokenAmount: number;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  recipientTransferType: string;
  recipientType: string;
  bankContactDetails: {
    bankName: string;
    bankAccountOwnerName: string;
    currencyCode: string;
    accountType: string;
    bankAccountNumber: string;
    bankRoutingNumber: string;
    bankCode: string;
    documentNumber: string;
    documentType: string;
    physicalAddress: {
      address1: string;
      address2: string;
      country: string;
      state: string;
      city: string;
      zip: string;
    };
  };
  walletDetails: {
    walletAddress: string;
    blockchain: "POLYGON";
  };
}

const RecipientForm: React.FC = () => {
  const { customer } = useContext(AuthContext);
  const url = import.meta.env.VITE_BASE_API_URL as string;
  const [memo, setMemo] = useState<string>("");
  const initialRecipient: Recipient = {
    name: "",
    currencyCode: "COP",
    tokenAmount: 0,
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    recipientTransferType: "BLOCKCHAIN",
    recipientType: "INDIVIDUAL",
    bankContactDetails: {
      bankName: "",
      bankAccountOwnerName: "",
      currencyCode: "COP",
      accountType: "SAVINGS",
      bankAccountNumber: "",
      bankRoutingNumber: "",
      bankCode: "",
      documentNumber: "",
      documentType: "NATIONAL_ID",
      physicalAddress: {
        address1: "",
        address2: "",
        country: "CO",
        state: "",
        city: "",
        zip: "",
      },
    },
    walletDetails: {
      walletAddress: "",
      blockchain: "POLYGON",
    },
  };
  const [recipient, setRecipient] = useState<Recipient>(initialRecipient);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipient((prev) => ({
      ...prev,
      bankContactDetails: {
        ...prev.bankContactDetails,
        [name]: value,
      },
    }));
  };

  const handlePhysicalAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipient((prev) => ({
      ...prev,
      bankContactDetails: {
        ...prev.bankContactDetails,
        physicalAddress: {
          ...prev.bankContactDetails.physicalAddress,
          [name]: value,
        },
      },
    }));
  };

  const hadleBlockchainChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipient((prev) => ({
      ...prev,
      walletDetails: {
        ...prev.walletDetails,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setRecipient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/transfer-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({
          payoutAccountId: customer?.accountId,
          memo,
          recipientsInfo: [recipient],
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Recipient Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Memo"
              name="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={recipient.name}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={recipient.email}
              onChange={handleChange}
              required
              type="email"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Token Amount"
              name="tokenAmount"
              value={recipient.tokenAmount}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <Select<string>
              labelId="select-account"
              fullWidth
              name="currencyCode"
              value={recipient.currencyCode}
              onChange={handleSelectChange}
            >
              {customer?.currenciesInfo
                .filter((currency) => currency.isRestricted === false)
                .map((curr) => (
                  <MenuItem
                    key={`${curr.currencyCode}`}
                    value={curr.currencyCode}
                  >
                    {curr.currencyCode}
                  </MenuItem>
                ))}
            </Select>
          </Grid2>
          <Grid2 size={6}>
            <Select<string>
              labelId="select-account"
              fullWidth
              name="recipientType"
              value={recipient.recipientType}
              onChange={handleSelectChange}
              required
            >
              <MenuItem value={"INDIVIDUAL"}>Individual</MenuItem>
              <MenuItem value={"BUSINESS"}>Business</MenuItem>
            </Select>
          </Grid2>

          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={recipient.dateOfBirth}
              onChange={handleChange}
              required={recipient.recipientType === "INDIVIDUAL"}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={recipient.phoneNumber}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h6" gutterBottom>
              Bank Details
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={recipient.bankContactDetails.bankName}
              onChange={handleBankChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank Account Owner Name"
              name="bankAccountOwnerName"
              value={recipient.bankContactDetails.bankAccountOwnerName}
              onChange={handleBankChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank Country"
              name="country"
              value={recipient.bankContactDetails.physicalAddress.country}
              onChange={handlePhysicalAddressChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank State"
              name="state"
              value={recipient.bankContactDetails.physicalAddress.state}
              onChange={handlePhysicalAddressChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank City"
              name="city"
              value={recipient.bankContactDetails.physicalAddress.city}
              onChange={handlePhysicalAddressChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              type="number"
              label="Bank Zip"
              name="zip"
              value={recipient.bankContactDetails.physicalAddress.zip}
              onChange={handlePhysicalAddressChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank Address"
              name="address1"
              value={recipient.bankContactDetails.physicalAddress.address1}
              onChange={handlePhysicalAddressChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Address 2"
              name="address2"
              value={recipient.bankContactDetails.physicalAddress.address2}
              onChange={handlePhysicalAddressChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank Account Number"
              name="bankAccountNumber"
              value={recipient.bankContactDetails.bankAccountNumber}
              onChange={handleBankChange}
            />
          </Grid2>

          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank Routing Number"
              name="bankRoutingNumber"
              value={recipient.bankContactDetails.bankRoutingNumber}
              onChange={handleBankChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Document Number"
              name="documentNumber"
              value={recipient.bankContactDetails.documentNumber}
              onChange={handleBankChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h6" gutterBottom>
              Blockchain Information
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Bank Routing Number"
              name="walletAddress"
              value={recipient.walletDetails.walletAddress}
              onChange={hadleBlockchainChange}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <Select<string>
              labelId="select-account"
              fullWidth
              name="blockchain"
              value={recipient.walletDetails.blockchain}
              readOnly
              required
            >
              <MenuItem value={"ETHEREUM"}>ETHEREUM</MenuItem>
              <MenuItem value={"POLYGON"}>POLYGON</MenuItem>
              <MenuItem value={"BASE"}>BASE</MenuItem>
              <MenuItem value={"CELO"}>CELO</MenuItem>
            </Select>
          </Grid2>
          <Grid2 size={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Layout>
  );
};

export default RecipientForm;
