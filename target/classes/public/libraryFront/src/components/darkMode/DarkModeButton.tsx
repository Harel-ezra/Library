import React from "react";
import { IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "src/LibraryTheme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import buttonStyle from "./darmModeButton.module.css";

export const DarkModeButton = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  // IconButton תשתמש ב
  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      className={buttonStyle.button}
      sx={{ color: "primary.main" }}
    >
      {/* ??? */}
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};
