import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App.tsx";
import { useState } from "react";

export const ThemeModeContext = React.createContext({
  toggleColorMode: () => {},
});

const themeNames = {
  light: 'light',
  dark: 'dark',
  rainbow: 'rainbow',
} as const

type ThemeName = typeof themeNames[keyof typeof themeNames]

const LibraryTheme = () => {
  const [mode, setMode] = useState<ThemeName>('light');
  const changeThemeMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
    <ThemeModeContext.Provider value={changeThemeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default LibraryTheme;
