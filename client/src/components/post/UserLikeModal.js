import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import { getUserLikes } from "../../api/posts";
import Loading from "../others/Loading";
import UserEntry from "../user/UserEntry";

const UserLikeModal = ({ postId, open, setOpen }) => {
  const [userLikes, setUserLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const scrollBoxRef = useRef(null);

  const handleClose = () => setOpen(false);
  const handleBackdropClick = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const fetchUserLikes = async () => {
    if (loading || !hasMorePages) return;

    setLoading(true);

    let anchor = "";
    if (userLikes && userLikes.length > 0) {
      anchor = userLikes[userLikes.length - 1].id;
    }

    const data = await getUserLikes(postId, anchor);

    setLoading(false);
    if (data.success) {
      setUserLikes([...userLikes, ...data.userLikes]);
      setHasMorePages(data.hasMorePages);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserLikes();
    }
  }, [open]);

  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;

    if (
      scrollBox.scrollTop + scrollBox.clientHeight >
      scrollBox.scrollHeight - 12
    ) {
      fetchUserLikes();
    }
  };

  useEffect(() => {
    if (!scrollBoxRef.current) {
      return;
    }
    const scrollBox = scrollBoxRef.current;
    scrollBox.addEventListener("scroll", handleScroll);

    return () => {
      scrollBox.removeEventListener("scroll", handleScroll);
    };
  }, [userLikes]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          onClick: handleBackdropClick,
        },
      }}
    >
      <div className="absolute flex flex-col space-y-3 left-1/2 top-1/2 w-[400px] max-w-[80%] m-h-[10000px] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 py-4 px-6 rounded-lg"
        ref={scrollBoxRef}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className="text-2xl font-medium text-zinc-100">
          Liked by
        </div>
        <hr className="h-[0.5px] p-0 border-zinc-600" />
        <div className="flex flex-col space-y-3 py-3">
          {userLikes &&
            userLikes.map((like) => (
              <UserEntry username={like.username} key={like.username} />
            ))}
        </div>
        {loading && <Loading />}
      </div>
    </Modal>
  );
};

export default UserLikeModal;