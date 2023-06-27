import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import homepageStyle from "./homePage.module.css";
import { LibraryLogo } from "components/logo/LibraryLogo";
import LoginButton from "src/components/button/LoginButton";
import { DarkModeButton } from "src/components/darkMode/DarkModeButton";
import { getEntities } from "src/serverRequest/requests";
import { User } from "src/globalTypes/User";
import Swal from "sweetalert2";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  // תעשה שהוא יכול להיות undefined
  // ולפי זה תעשה את הבדיקה ב
  // handlelogin
  const [selectedUser, setSelectedUser] = useState<User>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getEntities("User").then((res) => setUsers(res));
  }, []);

  const handleLogin = () => {
    if (!selectedUser) {
      Swal.fire({
        title: "שגיאה!",
        text: "משתמש לא קיים",
        icon: "error",
        confirmButtonText: "חזרה",
      });
    } else {
      // תשמור את היוזר המלא
      dispatch({ type: "SET_USER", payload: selectedUser });
      navigate("/library");
    }
  };

  return (
    <Box
      className={homepageStyle.homePage}
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <DarkModeButton />
      <LibraryLogo />
      <Autocomplete
        className={homepageStyle.autocomplete}
        options={users.map((user: User) => ({ user: user, label: user.name }))}
        noOptionsText={"משתמש לא קיים"}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option,value) => option.user.id===value.user.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="השם שלך"
            inputProps={{ ...params.inputProps }}
            onKeyPress={(e) => {
              if (e?.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />
        )}
        onInputChange={() => {
          setSelectedUser(undefined);
        }}
        onChange={(_e, value) => {
          // ===
          if (value !== null) setSelectedUser(value.user);
        }}
      />
      {/* LoginButton */}
      <LoginButton text="התחבר" onClick={handleLogin} />
    </Box>
  );
};
export default HomePage;
