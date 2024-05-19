import React from "react";
import DashProfile from "../components/dashboard/DashProfile";
import FindUsers from "../components/user/FindUsers";
import PostBrowser from "../components/post/PostBrowser";
import TopPosts from "../components/post/TopPosts";
import DashNews from "../components/dashboard/DashNews";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-30 gap-4">
            <div className="col-span-7 flex flex-col space-y-3">
                <DashProfile />
                <FindUsers/>
            </div>
            <div className="col-span-6">
                <TopPosts/>
            </div>
            <div className="col-span-10">
                <PostBrowser createPost contentType="posts"/>
            </div>
            <div className="col-span-7">
                <DashNews/>
            </div>
        </div>
    )
}

export default Dashboard;