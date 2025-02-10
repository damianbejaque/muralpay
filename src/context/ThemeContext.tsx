import { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";

interface ThemeContextProps {
  toggleTheme: () => void;
  mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
};

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const localTheme = localStorage.getItem("theme") as PaletteMode;

  const [mode, setMode] = useState<PaletteMode>(
    localTheme === "light" || localTheme === "dark" ? localTheme : "light"
  );

  const toggleTheme = () => {
    setMode((prevMode) => {
      localStorage.setItem("theme", prevMode === "light" ? "dark" : "light");
      return prevMode === "light" ? "dark" : "light";
    });
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: amber,
            background: { default: grey[100], paper: "#fff" },
          }
        : {
            primary: deepOrange,
            background: { default: grey[900], paper: grey[800] },
          }),
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
