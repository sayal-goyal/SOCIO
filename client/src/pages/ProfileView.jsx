import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUser, updateUser } from "../api/users";
import { isLoggedIn } from "../helpers/authHelper";
import CommentBrowser from "../components/comment/CommentBrowser";
import ErrorAlert from "../components/others/ErrorAlert";
import FindUsers from "../components/user/FindUsers";
import Loading from "../components/others/Loading";
import PostBrowser from "../components/post/PostBrowser";
import Profile from "../components/profile/Profile";
import ProfileTabs from "../components/profile/ProfileTabs";
import Slider from "../components/others/Slider";

const ProfileView = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("posts");
  const user = isLoggedIn();
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    setLoading(true);
    console.log(params)
    const data = await getUser(params);
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setProfile(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await updateUser(user, { biography: content });
    setProfile({ ...profile, user: { ...profile.user, biography: content } });
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = () => {
    navigate("/messenger", { state: { user: profile.user } });
  };

  useEffect(() => {
    fetchUser();
  }, [location]);

  const validate = (content) => {
    let error = "";
    if (content.length > 250) {
      error = "Bio cannot be longer than 250 characters";
    }
    return error;
  };

  
  let tabs;
  if (profile) {
    tabs = {
      posts: (
        <PostBrowser
          profileUser={profile.user}
          contentType="posts"
          key="posts"
          view="Posts"
        />
      ),
      liked: (
        <PostBrowser
          profileUser={profile.user}
          contentType="liked"
          key="liked"
          view="Likes"
        />
      ),
      comments: <CommentBrowser profileUser={profile.user} />,
    };
  }

  return (
    <div className="grid grid-cols-30 gap-x-4">
      <div className="col-span-8 flex flex-col space-y-3">
        <Profile
          profile={profile}
          editing={editing}
          handleSubmit={handleSubmit}
          handleEditing={handleEditing}
          handleMessage={handleMessage}
          validate={validate}
        />
        <FindUsers />
      </div>

      <div className="col-span-13 flex flex-col space-y-3">
        {profile ? (
          <>
            <ProfileTabs tab={tab} setTab={setTab} />

            {tabs[tab]}
          </>
        ) : (
          <Loading />
        )}
        {error && <ErrorAlert error={error} />}
      </div>

      <div className="col-span-9 flex flex-col space-y-3">
        <Slider />
        {/* <img className="rounded-lg" src="/refers.jpg" alt="" /> */}
        <div className="flex flex-col items-center p-6 bg-zinc-900 rounded-lg">
          <img src="/refer.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
