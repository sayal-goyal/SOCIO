import {
  ThemeProvider,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import TextsmsIcon from '@mui/icons-material/Textsms';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../../helpers/authHelper";
import DropdownProfile from "../dashboard/DropdownProfile";
import { GrayTheme } from "../theme/Button";

const UserNavbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const profRef = useRef()
  const username = user && isLoggedIn().username;
  const [toogle, setToogle] = useState(false);

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleToogle = () => {
    setToogle(!toogle);
  }

  return (
    <div className="sticky top-0 w-full z-20 text-white bg-zinc-900">
      <div className="flex justify-between items-center w-full max-w-[1440px] h-20 mx-auto px-4">
        <Link to={user ? "/dashboard" : "/"} className="text-3xl tracking-wider text-white cursor-pointer">SOCIO</Link>
        {user &&
          <div className="relative flex items-center space-x-5">
            <IconButton sx={{ ":hover": { backgroundColor: "#3F3F46" } }} component={Link} to={"/messenger"}>
              <TextsmsIcon sx={{ color: "white", fontSize: 26 }} />
            </IconButton>
            <IconButton sx={{ ":hover": { backgroundColor: "#3F3F46" } }} component={Link} to={"/settings"}>
              <SettingsIcon sx={{ color: "white", fontSize: 26 }} />
            </IconButton>
            <IconButton sx={{ ":hover": { backgroundColor: "#3F3F46" } }} component={Link} to={"/notifications"}>
              <NotificationsIcon sx={{ color: "white", fontSize: 26 }} />
            </IconButton>
            <ThemeProvider theme={GrayTheme}>
              <Stack gap={2} alignItems="center">
                <Button onClick={handleToogle} color="lightGray" sx={{ textTransform: 'none', color: "#fff", backgroundColor: "#27272A", py: 0.6, px: 3, gap: "12px", borderRadius: "100px" }}>
                  <div ref={profRef} >{username}</div>
                  <img className="h-4" src={toogle ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg"} alt="" />
                </Button>
              </Stack>
            </ThemeProvider>
            {toogle && <DropdownProfile setToogle={setToogle} profRef={profRef} username={user.username} handleLogout={handleLogout} />}
          </div>}
      </div>
    </div>
  );
};

export default UserNavbar;