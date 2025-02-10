import { useContext } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextDefinition";
import { Customer } from "../types/customer";
import useFetchData from "../hooks/useFetchData";

type FetchCustomerProps = {
  total: number;
  results: Customer[];
};

const SelectAccout = ({ showLabel }: { showLabel?: boolean }) => {
  const { login, customer } = useContext(AuthContext);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_API_URL as string;
  const {
    data: customers,
    loading,
    error,
  } = useFetchData<FetchCustomerProps, "results">({
    url: `${url}/customers`,
    field: "results",
  });

  if (loading) return <Box sx={{ textAlign: "center", mt: 4 }}>Loading...</Box>;
  if (error)
    return (
      <Box sx={{ color: "error.main", textAlign: "center", mt: 4 }}>
        Error: {error.message}
      </Box>
    );
  const handleChange = async (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    if (!customers) {
      return;
    }
    const customer = customers.find(
      (customer) => customer.id === e.target.value
    );
    if (!customer) {
      return;
    }
    login(customer);
    navigate("/");
  };
  if (!customers && !loading) {
    navigate("/create-customer");
  }

  const selectedCustomer = customer?.id;

  return (
    <>
      {showLabel && <InputLabel id="select-account">Select Account</InputLabel>}
      <Select<string>
        labelId="select-account"
        fullWidth
        value={selectedCustomer}
        onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
        required
      >
        {customers
          ?.filter((customer) => customer.status === "COMPLETE")
          .map((customer) => (
            <MenuItem
              key={`${showLabel ? "withLabel" : null}${customer.id}`}
              value={customer.id}
            >
              {customer.name}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};

export default SelectAccout;
