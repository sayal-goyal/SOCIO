import React, { useEffect, useState } from "react";
import Messages from "../components/message/Messages";
import UserMessengerEntries from "../components/message/UserMessengerEntries";
import { getConversations } from "../api/messages";
import { isLoggedIn } from "../helpers/authHelper";
import { useLocation } from "react-router-dom";
import PostBox from "../components/post/PostBox";
import FindUsers from "../components/user/FindUsers";

const MessengerView = () => {
  const [conservant, setConservant] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWindowWidth] = useState(0);
  const mobile = width < 800;
  const user = isLoggedIn();
  const { state } = useLocation();
  const newConservant = state && state.user;

  const getConversation = (conversations, conservantId) => {
    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      if (conversation.recipient._id === conservantId) {
        return conversation;
      }
    }
  };

  const fetchConversations = async () => {
    let conversations = await getConversations(user);
    if (newConservant) {
      setConservant(newConservant);
      if (!getConversation(conversations, newConservant._id)) {
        const newConversation = {
          _id: newConservant._id,
          recipient: newConservant,
          new: true,
          messages: [],
        };
        conversations = [newConversation, ...conversations];
      }
    }
    setConversations(conversations);
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <div className="grid grid-cols-30 gap-x-4">
      <div className="col-span-8 flex flex-col space-y-3">
        <PostBox msg="Message Anyone, Anywhere and Anytime."/>
        <FindUsers/>
      </div>
      <div className="col-span-22 grid grid-cols-30 gap-x-4">
        <div className="col-span-10">
          <UserMessengerEntries
            conservant={conservant}
            conversations={conversations}
            setConservant={setConservant}
            loading={loading}
          />
        </div>
        <div className="col-span-20">
          <Messages
            conservant={conservant}
            conversations={conversations}
            setConservant={setConservant}
            setConversations={setConversations}
            getConversation={getConversation}
          />
        </div>
      </div>
    </div>
  );
};

export default MessengerView;
