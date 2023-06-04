import {Box} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LibraryLogo } from "../../components/logo/LibraryLogo";
import LogButton from "../../components/button/LogButton";
import TextField from "@mui/material/TextField";
import homepageStyle from "./homePage.module.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getAllUsersaAxios } from "../../serverRequest/request";
import { User } from "../../globalTypes/globalTypes";


const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/library");
  };
  
  useEffect(() => {
    getAllUsersaAxios().then(res => setUsers(res));
  }, []);

  return (
    <Box className={homepageStyle.mainBoxPage}>
      <LibraryLogo />
      <Autocomplete
        className={homepageStyle.autoCompletBox}
        options={ users.map((user: User) => (user.name)) }
        renderInput={(params) => <TextField {...params} label="השם שלך" />}
      />
      <LogButton text="התחבר" onClick={handleLogin} />
    </Box>
  );
};
export default HomePage;
