import React from "react";
import UserAvatar from "../user/UserAvatar";

const Message = (props) => {
  const username = props.conservant.username;
  const message = props.message;

  let styles = {};
  if (message.direction === "to") {
    styles = {
      messageColor: "white",
      justifyContent: "justify-start",
    };
  } else if (message.direction === "from") {
    styles = {
      messageColor: "zinc-200",
      justifyContent: "justify-end",
    };
  }

  return (
    <div className={`flex w-full items-end space-x-4 py-2 ${styles.justifyContent}`}>
      {message.direction === "to" && (
        <UserAvatar username={username} height={30} width={30} />
      )}
      <div className={`rounded-lg py-3 px-4 max-w-[70%] bg-${styles.messageColor}`}>
        {message.content}
      </div>
    </div>
  );
};

export default Message;