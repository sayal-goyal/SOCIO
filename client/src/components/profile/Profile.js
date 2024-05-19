import { useTheme } from "@emotion/react";
import { Button, ThemeProvider, Stack } from "@mui/material";
import { GrayTheme } from "../theme/Button";
import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { isLoggedIn } from "../../helpers/authHelper";
import ContentUpdateEditor from "../others/ContentUpdateEditor";
import Loading from "../others/Loading";
import UserAvatar from "../user/UserAvatar";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <div className="flex flex-col">
      {user ? (
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col w-full p-6 bg-zinc-900 rounded-lg space-y-3">
            <div className="flex space-x-6 items-center">
              <UserAvatar height={60} width={60} />
              <div className="flex flex-col text-zinc-100 space-y-1">
                <div className="text-xl font-semibold">{user.username}</div>
                <div className="text-zinc-300">0 friends</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full p-6 bg-zinc-900 rounded-lg space-y-3">
            <div className="flex flex-col space-y-3 px-1 text-zinc-100">
              <div className="flex space-x-5">
                <PlaceIcon sx={{ color: "white", fontSize: 30 }} />
                <div className="text-lg">{user.location}</div>
              </div>
              <div className="flex  space-x-5">
                <WorkIcon sx={{ color: "white", fontSize: 30 }} />
                <div className="text-lg">{user.designation}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-6 bg-zinc-900 rounded-lg space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="text-xl text-zinc-100">Biography</div>
              {currentUser && user._id === currentUser.userId && (
                <ThemeProvider theme={GrayTheme}>
                  <Stack gap={2} alignItems="center">
                    <Button
                      variant="outlined"
                      startIcon={props.editing ? <CloseIcon sx={{ color: "white" }} /> : <DriveFileRenameOutlineIcon sx={{ color: "white" }} />}
                      onClick={props.handleEditing}
                      sx={{
                        color: "#fff", backgroundColor: "#27272A", py: 0.4, px: 2, borderColor: "#918E95", '&:hover': {
                          borderColor: "#B9B5BD",
                        }, fontSize: 14
                      }}>
                      {props.editing ? <>Cancel</> : <>Edit bio</>}
                    </Button>
                  </Stack>
                </ThemeProvider>
              )}
            </div>
            {props.editing ? (
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            ) : user.biography ? (
              <div className="text-zinc-300">
                {user.biography}
              </div>
            ) : (
              <div className="text-lg text-zinc-300">
                No bio yet
              </div>
            )}
          </div>

          {currentUser && user._id !== currentUser.userId && (
              <ThemeProvider theme={GrayTheme}>
                <Stack gap={2} alignItems="center">
                  <Button variant="outlined" onClick={props.handleMessage} fullWidth sx={{
                    color: "#fff", backgroundColor: "#27272A", py: 0.8, px: 2, borderColor: "#918E95", '&:hover': {
                      borderColor: "#B9B5BD",
                    }, fontSize: 16
                  }}>
                    Message
                  </Button>
                </Stack>
              </ThemeProvider>
          )}

          <div className="flex justify-center space-x-10 p-6 bg-zinc-900 rounded-lg text-lg text-zinc-100">
            <div className="flex space-x-2">
              <ThumbUpAltIcon sx={{ color: "white", fontSize: 26 }} />
              <div className="flex space-x-5">
                <div>Likes</div>
                <b>{props.profile.posts.likeCount}</b>
              </div>
            </div>
            <div className="flex space-x-2">
              <LocalPostOfficeIcon sx={{ color: "white", fontSize: 26 }} />
              <div className="flex space-x-5">
                <div>Posts</div>
                <b>{props.profile.posts.count}</b>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading label="Loading profile" />
      )}
    </div>
  );
};

export default Profile;
