import React from "react";

const End = () => {
    return (
        <div className="flex flex-col items-center w-full bg-zinc-900 px-10 py-12 rounded-lg space-y-5">
            <img className="w-56" src="/end.png" alt="" />
            <div className="text-xl text-zinc-100">You have reached the end of the page.</div>
        </div>
    )
}

export default End;