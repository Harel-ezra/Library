import LogButton from "../../button/LogButton";
import { LibraryLogo } from "../../logo/LibraryLogo";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import topBarStyle from "./topBar.module.css";
export const TopBar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };
  return (
    <Box className={topBarStyle.topBarBox}>
        <Typography>שלום הראל</Typography>
        <LogButton text="התנתק" onClick={handleLogOut} />
    </Box>
  );
};
