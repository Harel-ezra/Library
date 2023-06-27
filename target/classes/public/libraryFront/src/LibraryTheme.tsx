import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App.tsx";
import { useState } from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const LibraryTheme = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const lightTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#3c6479",
          },
        },
      }),
    []
  );
  const darkTheme = React.useMemo(
    () =>
      createTheme({
        components: {
          MuiPaper: {},
        },
        palette: {
          mode: "dark",
          primary: {
            main: "#b3c8ce",
          },
          background: {
            default: "#334d5b",
          },
        },
      }),
    []
  );
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default LibraryTheme;
