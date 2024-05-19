import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, ThemeProvider, Link, Stack } from "@mui/material";
import { getPosts, getUserLikedPosts } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import CreatePost from "./CreatePost";
import Loading from "../others/Loading";
import PostCard from "../post/PostCard";
import SortBySelect from "../others/SortBySelect";
import { GrayTheme } from "../theme/Button";

const PostBrowser = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [count, setCount] = useState(0);
  const user = isLoggedIn();

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const searchExists =
    search && search.get("search") && search.get("search").length > 0;

  const fetchPosts = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
      sortBy,
    };

    let data;

    if (props.contentType === "posts") {
      if (props.profileUser) query.author = props.profileUser.username;
      if (searchExists) query.search = search.get("search");

      data = await getPosts(user && user.token, query);
    } else if (props.contentType === "liked") {
      data = await getUserLikedPosts(
        props.profileUser._id,
        user && user.token,
        query
      );
    }

    if (data.data.length < 10) {
      setEnd(true);
    }

    setLoading(false);
    if (!data.error) {
      setPosts([...posts, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, effect]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
  }, [search]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setPosts([]);
    setPage(0);
    setEnd(false);
    setSortBy(newSortBy);
  };

  const removePost = (removedPost) => {
    setPosts(posts.filter((post) => post._id !== removedPost._id));
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const contentTypeSorts = {
    posts: {
      "-createdAt": "Latest",
      "-likeCount": "Likes",
      "-commentCount": "Comments",
      createdAt: "Earliest",
    },
    liked: {
      "-createdAt": "Latest",
      createdAt: "Earliest",
    },
  };

  const sorts = contentTypeSorts[props.contentType];

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center px-6 py-5 bg-zinc-900 rounded-lg">
        {props.createPost && <CreatePost />}
        {props.view ? (<div className="text-xl text-zinc-100">View All {props.view}</div>) : ("")}
        <SortBySelect
          onSortBy={handleSortBy}
          sortBy={sortBy}
          sorts={sorts}
        />
      </div>

      {searchExists && (
        <div className="flex flex-col space-y-3">
          <div className="text-zinc-100 text-xl">
            Showing results for "{search.get("search")}"
          </div>
          <div className="text-zinc-300 text-lg">
            {count} results found
          </div>
        </div>
      )}

      {posts.map((post, i) => (
        <PostCard
          preview="primary"
          key={post._id}
          post={post}
          removePost={removePost}
        />
      ))}

      {loading && <div className="flex items-center justify-center w-full py-8 bg-zinc-900 rounded-lg"><Loading /></div>}
      {end ? (
        <div className="flex flex-col items-center p-8 text-zinc-100 bg-zinc-900 rounded-lg space-y-2 ">
          <img className="h-52" src="/nopost.png" alt="" />
          <div className="flex flex-col items-center space-y-1">
            <div className="text-2xl">
              {posts.length > 0 ? (
                <>All posts have been viewed</>
              ) : (
                <>No posts available</>
              )}
            </div>
            <button className="text-zinc-300 hover:underline" onClick={handleBackToTop}>
              Back to top
            </button>
          </div>
        </div>
      ) : (
        !loading &&
        posts &&
        posts.length > 0 && (
          <div className="flex  items-center bg-zinc-900 p-6 rounded-lg">
            <ThemeProvider theme={GrayTheme}>
              <Stack gap={8} alignItems="center">
                <Button color="lightGray" variant="outlined" onClick={fetchPosts}
                  sx={{ color: "#fff", backgroundColor: "#27272A", py: 0.6, px: 3 }}>
                  Load more
                </Button>
                <Button color="lightGray" variant="outlined" onClick={handleBackToTop}
                  sx={{ color: "#fff", backgroundColor: "#27272A", py: 0.6, px: 3 }}>
                  Back to top
                </Button>
              </Stack>
            </ThemeProvider>
          </div>
        )
      )}
    </div >
  );
};

export default PostBrowser;