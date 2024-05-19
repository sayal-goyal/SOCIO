import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { getMessages, sendMessage } from "../../api/messages";
import { isLoggedIn } from "../../helpers/authHelper";
import { socket } from "../../helpers/socketHelper";
import Loading from "../others/Loading";
import Message from "./Message";
import SendMessage from "./SendMessage";
import UserAvatar from "../user/UserAvatar";

const Messages = (props) => {
  const messagesEndRef = useRef(null);
  const user = isLoggedIn();
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);

  const conversationsRef = useRef(props.conversations);
  const conservantRef = useRef(props.conservant);
  const messagesRef = useRef(messages);
  useEffect(() => {
    conversationsRef.current = props.conversations;
    conservantRef.current = props.conservant;
    messagesRef.current = messages;
  });

  const conversation =
    props.conversations &&
    props.conservant &&
    props.getConversation(props.conversations, props.conservant._id);

  const setDirection = (messages) => {
    messages.forEach((message) => {
      if (message.sender._id === user.userId) {
        message.direction = "from";
      } else {
        message.direction = "to";
      }
    });
  };

  const fetchMessages = async () => {
    if (conversation) {
      if (conversation.new) {
        setLoading(false);
        setMessages(conversation.messages);
        return;
      }
      setLoading(true);
      const data = await getMessages(user, conversation._id);
      setDirection(data);
      if (data && !data.error) {
        setMessages(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [props.conservant]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const handleSendMessage = async (content) => {
    const newMessage = { direction: "from", content };
    const newMessages = [newMessage, ...messages];

    if (conversation.new) {
      conversation.messages = [...conversation.messages, newMessage];
    }

    let newConversations = props.conversations.filter(
      (conversationCompare) => conversation._id !== conversationCompare._id
    );

    newConversations.unshift(conversation);
    props.setConversations(newConversations);
    setMessages(newMessages);
    await sendMessage(user, newMessage, conversation.recipient._id);

    socket.emit(
      "send-message",
      conversation.recipient._id,
      user.username,
      content
    );
  };

  const handleReceiveMessage = (senderId, username, content) => {
    const newMessage = { direction: "to", content };

    const conversation = props.getConversation(
      conversationsRef.current,
      senderId
    );

    if (conversation) {
      let newMessages = [newMessage];
      if (messagesRef.current) {
        newMessages = [...newMessages, ...messagesRef.current];
      }

      setMessages(newMessages);

      if (conversation.new) {
        conversation.messages = newMessages;
      }
      conversation.lastMessageAt = Date.now();

      let newConversations = conversationsRef.current.filter(
        (conversationCompare) => conversation._id !== conversationCompare._id
      );

      newConversations.unshift(conversation);

      props.setConversations(newConversations);
    } else {
      const newConversation = {
        _id: senderId,
        recipient: { _id: senderId, username },
        new: true,
        messages: [newMessage],
        lastMessageAt: Date.now(),
      };
      props.setConversations([newConversation, ...conversationsRef.current]);
    }

    scrollToBottom();
  };

  useEffect(() => {
    socket.on("receive-message", handleReceiveMessage);
  }, []);

  return props.conservant ? (
    <>
      {messages && conversation && !loading ? (
        <div className="flex flex-col bg-zinc-900 rounded-lg h-full">
          <div className="flex space-x-3 p-4">
            <UserAvatar
              username={props.conservant.username}
              height={30}
              width={30}
            />
            <Link className="text-zinc-100 text-lg" to={"/users/" + props.conservant.username}>
              {props.conservant.username}
            </Link>
          </div>
          <hr className="h-[0.5px] p-0 border-zinc-600" />
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col-reverse p-4 overflow-y-auto">
              <div ref={messagesEndRef} />
              {messages.map((message, i) => (
                <Message
                  conservant={props.conservant}
                  message={message}
                  key={i}
                />
              ))}
            </div>
            <SendMessage onSendMessage={handleSendMessage} />
          </div>
          {scrollToBottom()}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full bg-zinc-900 rounded-lg">
          <Loading />
        </div>
      )}
    </>
  ) : (
    <div className="flex flex-col justify-center items-center h-full space-y-2 text-zinc-100 bg-zinc-900 rounded-lg">
      <QuestionAnswerIcon sx={{ color: "white", fontSize: 80 }} />
      <div className="text-3xl font-medium">Messenger</div>
      <div className="text-lg font-medium">Privately message other users</div>
    </div>
  );
};

export default Messages;