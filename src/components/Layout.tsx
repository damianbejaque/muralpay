import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.default",
      }}
    >
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          color: "text.primary",
          padding: "20px",
          marginLeft: "240px", // Prevent sidebar overlap
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
