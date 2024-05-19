import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import GoBack from "../GoBack";
// import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";

const SearchView = () => {
  return (
    <Container>
      {/* <GridLayout
        left={
          <Stack spacing={2}>
            <PostBrowser createPost contentType="posts" />
          </Stack>
        }
        right={<>div</>}
      /> */}
    </Container>
  );
};

export default SearchView;
