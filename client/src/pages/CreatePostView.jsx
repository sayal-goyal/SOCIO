import React from "react";
import PostEditor from "../components/post/PostEditor";
import PostBox from "../components/post/PostBox";
import TopPosts from "../components/post/TopPosts";

const CreatePostView = () => {
  return (
    <div className="grid grid-cols-30 gap-4">
      <div className="col-span-8">
        <PostBox msg="Edit, Like and Comment your posts seamlessly."/>
      </div>
      <div className="col-span-14">
        <PostEditor />
      </div>
      <div className="col-span-8">
        <TopPosts />
      </div>
    </div>
  );
};

export default CreatePostView;
