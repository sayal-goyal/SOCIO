import React from "react";

const PostBox = ({msg}) => {
    return (
        <div className="flex flex-col items-center text-center space-y-3 w-full px-8 py-12 rounded-lg bg-zinc-900">
            <img className="w-56" src="/morepost.png" alt="posts" />
            <div className="text-xl text-zinc-100">{msg}</div>
        </div>
    )
}

export default PostBox;