import { Tab, Tabs } from "@mui/material";
import React from "react";

const ProfileTabs = (props) => {
  const handleChange = (e, newValue) => {
    props.setTab(newValue);
  };

  return (
    <Tabs value={props.tab} onChange={handleChange} variant="fullWidth" textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: "#fff" }}} sx={{ backgroundColor: "#18181B", borderTopRightRadius: 7, borderTopLeftRadius: 7, color: "white", "& .MuiTab-root": {
      fontSize: 17, padding:2
    }, }}>
      <Tab label="Posts" value="posts" />
      <Tab label="Liked" value="liked" />
      <Tab label="Comments" value="comments" />
    </Tabs>
  );
};

export default ProfileTabs;