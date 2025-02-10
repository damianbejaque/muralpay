import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition";
import SelectAccount from "./SelectAccount";

const Header = ({ withSelectAccount }: { withSelectAccount: boolean }) => {
  const { customer, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "primary.main",
        height: "64px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mural Pay
        </Typography>
        {customer ? (
          <>
            <ThemeToggle />
            <Box component="form" sx={{ maxWidth: 400, mx: "auto" }}>
              {withSelectAccount && <SelectAccount />}
            </Box>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <ThemeToggle />
            <Button color="inherit" component={Link} to="/select-customer">
              Select Customer
            </Button>
            <Button color="inherit" component={Link} to="/create-customer">
              Create Customer
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
