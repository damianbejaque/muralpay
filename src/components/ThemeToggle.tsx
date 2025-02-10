import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import { useThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeToggle;
