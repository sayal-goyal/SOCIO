import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import PostCard from "../components/post/PostCard";
import Comments from "../components/comment/Comments";
import Loading from "../components/others/Loading";
import ErrorAlert from "../components/others/ErrorAlert";
import PostBox from "../components/post/PostBox";
import TopPosts from "../components/post/TopPosts";

const PostView = () => {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchPost = async () => {
    setLoading(true);
    const data = await getPost(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  return (
    <div className="grid grid-cols-30 gap-x-4">
      <div className="col-span-9">
        <PostBox msg="Edit, Like and Comment your posts seamlessly."/>
      </div>
      <div className="col-span-12">
        {
          loading ? (
            <Loading />
          ) : post ? (
            <div className="flex flex-col space-y-3">
              <PostCard post={post} key={post._id} />

              <Comments />
            </div>
          ) : (
            error && <ErrorAlert error={error} />
          )
        }
      </div>
      <div className="col-span-9">
        <TopPosts/>
      </div>
    </div>
  );
};

export default PostView;
