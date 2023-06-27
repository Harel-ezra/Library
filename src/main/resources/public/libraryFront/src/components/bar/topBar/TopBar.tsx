import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import topBarStyle from "./topBar.module.css";
import LogoutDialog from "components/dialog/LogoutDialog";
import { DarkModeButton } from "src/components/darkMode/DarkModeButton";
import { useSelector } from "react-redux";
import { StoreState } from "src/store";

export const TopBar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box className={topBarStyle.topBarBox}>
      <Box>
        <Typography className={topBarStyle.text} sx={{ color: "primary.main" }}>
          שלום, {useSelector((store: StoreState) => store.user?.name)}!
        </Typography>

        <Typography
          sx={{ color: "primary.light" }}
        >הספר האהוב עליך: {useSelector((store: StoreState) => store.user?.favoriteBookName)}
        </Typography>
      </Box>
      <Box>
        <DarkModeButton />
        <LogoutDialog text="התנתק" onClick={handleLogOut} />
      </Box>
    </Box>
  );
};
