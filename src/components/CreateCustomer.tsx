import { useState, useContext, FormEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DefaultModal from "./DefaultModal";
import { AuthContext } from "../context/AuthContextDefinition";

const CreateCustomer = () => {
  const { createAccount } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [organizationType, setOrganizationType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsDeleteDialogOpen] = useState(false);

  const handleChange = (e: SelectChangeEvent<string>) => {
    setOrganizationType(e.target.value);
  };

  const handleOpenModal = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteDialogOpen(false);
    navigate("/");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !organizationType) {
      setError("Please fill in all the fields");
      return;
    }
    try {
      await createAccount(name, organizationType);
      handleOpenModal();
    } catch (err) {
      setError(`Sign up failed. Please try again. ${err}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Name"
        type="name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <InputLabel id="select-organization-type">
        Select Organization Type
      </InputLabel>
      <Select<string>
        labelId="select-account"
        fullWidth
        value={organizationType}
        onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
        required
      >
        <MenuItem value="INDIVIDUAL">Individual</MenuItem>
        <MenuItem value="BUSSINESS">Bussiness</MenuItem>
      </Select>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
      <DefaultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Account Created"
        dialog={`Your account is now created. Please confirm your data with the URL to access your account.`}
        confirmText="Delete"
      />
    </Box>
  );
};

export default CreateCustomer;
