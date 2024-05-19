import React, { useEffect, useState } from "react";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { getPosts } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import Loading from "../others/Loading";
import PostCard from "./PostCard";

const TopPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const user = isLoggedIn();

  const fetchPosts = async () => {
    const query = { sortBy: "-likeCount" };
    const data = await getPosts(user && user.token, query);
    const topPosts = [];

    if (data && data.data) {
      for (let i = 0; i < 3 && i < data.data.length; i++) {
        topPosts.push(data.data[i]);
      }
    }
    setPosts(topPosts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center bg-zinc-900 rounded-lg px-6 py-4 space-x-3">
        <InsertChartIcon sx={{ color: "white", fontSize: 28 }} />
        <div className="text-zinc-100 text-lg">Top Posts</div>
      </div>
      {!loading ? (
        posts &&
        posts.map((post) => (
          <PostCard preview="secondary" post={post} key={post._id} />
        ))
      ) : (
        <div className="flex items-center justify-center w-full py-8 bg-zinc-900 rounded-lg">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default TopPosts;