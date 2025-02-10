import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, CreditCard } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("Accounts");

  const menuItems = [
    { name: "Home", icon: <Home />, route: "/" },
    {
      name: "Transfer Request",
      icon: <CreditCard />,
      route: "/transfer-main",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        position: "fixed",
        height: "100vh",
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#0d1117",
          color: "#ffffff",
          borderRight: "1px solid #30363d",
        },
      }}
    >
      <List sx={{ marginTop: "64px" }}>
        {menuItems.map((item) => (
          <Link
            to={item.route}
            style={{ textDecoration: "none", color: "inherit" }}
            key={item.name}
          >
            <ListItemButton
              selected={active === item.name}
              onClick={() => setActive(item.name)}
              sx={{
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "#21262d",
                  color: "#ffffff",
                },
                "&:hover": { backgroundColor: "#30363d" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
