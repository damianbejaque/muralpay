import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition";
import useFetchData from "../hooks/useFetchData";
import { Account } from "../types/account";
import { Typography, CircularProgress, Box, Paper } from "@mui/material";
import Layout from "./Layout";

const Dashboard = () => {
  const { customer } = useContext(AuthContext);
  const url = import.meta.env.VITE_BASE_API_URL as string;
  const {
    data: account,
    loading,
    error,
  } = useFetchData<Account>({
    url: `${url}/accounts`,
    id: customer?.accountId,
  });

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Layout>
      <Paper
        sx={{
          padding: 3,
          maxWidth: 600,
          mx: "auto",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, {customer?.name}!
        </Typography>
        <Typography variant="h6">
          Balance: {account?.balance.balance} {account?.balance.tokenSymbol}
        </Typography>
        <Typography variant="body1">Address: {account?.address}</Typography>

        {account?.depositAccount && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Deposit Account</Typography>
            <ul>
              {Object.entries(account.depositAccount).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong>: {value}
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Paper>
    </Layout>
  );
};

export default Dashboard;
