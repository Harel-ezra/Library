import { Typography } from "@mui/material";
import LibraryLogoStyle from "./LibraryLogo.module.css";

export const LibraryLogo = () => (
  <Typography
    className={LibraryLogoStyle.libraryLogo}
    sx={{
      color: "primary.main",
    }}
  >
    ספרייה
  </Typography>
);
