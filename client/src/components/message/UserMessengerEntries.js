import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Loading from "../others/Loading";
import UserMessengerEntry from "./UserMessengerEntry";

const UserMessengerEntries = (props) => {
  return !props.loading ? (
    <div className="flex flex-col space-y-3 h-full">
      <div className="flex items-center bg-zinc-900 rounded-lg px-6 py-4 space-x-4">
        <QuestionAnswerIcon sx={{ color: "white", fontSize: 28 }} />
        <div className="text-lg font-medium text-zinc-100">Your Conversations</div>
      </div>
      {props.conversations.length > 0 ? (
        <div className="flex flex-col bg-zinc-900 rounded-lg h-full">
          {props.conversations.map((conversation) => (
            <UserMessengerEntry
              conservant={props.conservant}
              conversation={conversation}
              key={conversation.recipient.username}
              setConservant={props.setConservant}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center h-full space-y-2 text-zinc-100 px-6 bg-zinc-900 rounded-lg">
          <ErrorIcon sx={{ color: "white", fontSize: 60 }} />
          <div className="text-2xl">No Conversations</div>
          <div>
            Click 'Message' on another user's profile to start a conversation
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex justify-center items-center h-full bg-zinc-900 rounded-lg">
      <Loading />
    </div>
  );
};

export default UserMessengerEntries;