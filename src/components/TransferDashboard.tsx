import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { Payout } from "../types/transfer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import Layout from "./Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition";
import { handleTransfer } from "../api/transfer";

type FetchTransferProps = {
  total: number;
  results: Payout[];
};

const TransferDashboard = () => {
  const { customer } = useContext(AuthContext);
  const url = import.meta.env.VITE_BASE_API_URL as string;
  const {
    data: transferList,
    loading,
    error,
  } = useFetchData<FetchTransferProps, "results">({
    url: `${url}/transfer-requests`,
    field: "results",
  });
  const filterTransferList = transferList?.filter(
    (transfer) => transfer.payoutAccountId === customer?.accountId
  );
  const navigate = useNavigate();

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;
  if (!transferList)
    return (
      <Typography color="error">
        No transfer request found do you want create a new one?
      </Typography>
    );

  const handleCreateTransfer = () => {
    navigate("/transfer-request");
  };

  const handleApprove = async (id: string): Promise<void> => {
    try {
      const response = await handleTransfer(id, "execute");
      console.log("Transfer Approved:", response);
    } catch (error: unknown) {
      console.error("Failed to approve transfer request:", error);
      alert(`Failed to approve transfer request: ${(error as Error).message}`);
    }
  };

  const handleCancel = async (id: string): Promise<void> => {
    try {
      const response = await handleTransfer(id, "cancel");
      console.log("Transfer Approved:", response);
    } catch (error: unknown) {
      console.error("Failed to approve transfer request:", error);
      alert(`Failed to approve transfer request: ${(error as Error).message}`);
    }
  };

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 2 }}
          onClick={handleCreateTransfer}
        >
          Create Transfer
        </Button>

        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Payouts</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell>Memo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterTransferList?.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell>
                  {new Date(payout.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{payout.memo}</TableCell>
                <TableCell>{payout.status}</TableCell>
                <TableCell>
                  {new Date(payout.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {payout.recipientsInfo[0].tokenAmount}
                  </Typography>
                </TableCell>
                <TableCell sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={payout.status !== "IN_REVIEW"}
                    onClick={() => handleApprove(payout.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={payout.status !== "IN_REVIEW"}
                    onClick={() => handleCancel(payout.id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default TransferDashboard;
