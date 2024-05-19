import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import { initiateSocketConnection, socket } from "./helpers/socketHelper";
import UserNavbar from "./components/navbars/UserNavbar";
import PostView from "./pages/PostView";
import CreatePostView from "./pages/CreatePostView";
import ProfileView from "./pages/ProfileView";
import LoginView from "./pages/LoginView";
import SignupView from "./pages/SignupView";
import MessengerView from "./pages/MessengerView";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProfileInfo from "./pages/ProfileInfo";
import News from "./pages/News";
import AddNews from "./pages/AddNews";
import NewsCategory from "./pages/NewsCategory";
import { isLoggedIn } from "./helpers/authHelper";
import LoginNavbar from "./components/navbars/LoginNavbar";

const App = () => {
  const location = useLocation();
  const user = isLoggedIn();
  const hideNav = ["/login","/signup","/info"].includes(location.pathname)
  initiateSocketConnection();

  return (
    <div className="font-noto-sans bg-zinc-700 min-h-screen">

      {!hideNav && (user ? <UserNavbar /> : <LoginNavbar/>)}
      <div className={hideNav ? "" : "w-full max-w-[1440px] mx-auto py-8 px-4"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<ProfileInfo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/posts/create" element={<CreatePostView />} />
          <Route path="/messenger" element={<MessengerView />} />
          <Route path="/users/:id" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:category" element={<NewsCategory />} />
          <Route path="/news/create" element={<AddNews />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;