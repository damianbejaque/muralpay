import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import SignUp from "./components/CreateCustomer";
import SelectAccount from "./components/SelectAccount";
import Dashboard from "./components/Dashboard";
import "./index.css";
import TransferRequest from "./components/TransferRequest";
import Header from "./components/Header";
import TransferDashboard from "./components/TransferDashboard";
import { AuthContext } from "./context/AuthContextDefinition";

const App = () => {
  const { customer } = useContext(AuthContext);

  return (
    <>
      <Header withSelectAccount={!!customer} />
      <Container sx={{ mt: 9 }}>
        <Routes>
          <Route
            path="/"
            element={
              customer ? <Dashboard /> : <Navigate to="/select-customer" />
            }
          />
          <Route
            path="/select-customer"
            element={
              !customer ? (
                <Box component="form" sx={{ maxWidth: 400, mx: "auto" }}>
                  <SelectAccount showLabel />
                </Box>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/transfer-main"
            element={customer ? <TransferDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/transfer-request"
            element={customer ? <TransferRequest /> : <Navigate to="/" />}
          />

          <Route
            path="/create-customer"
            element={!customer ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
