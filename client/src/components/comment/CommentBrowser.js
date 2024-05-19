import React, { useEffect, useState } from "react";
import { getUserComments } from "../../api/posts";
import Comment from "./Comment";
import Loading from "../others/Loading";
import SortBySelect from "../others/SortBySelect";

const CommentBrowser = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("-createdAt");

  const fetchComments = async () => {
    setLoading(true);

    const newPage = page + 1;
    setPage(newPage);

    let comments = await getUserComments({
      id: props.profileUser._id,
      query: { sortBy },
    });

    setComments(comments);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [sortBy]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setComments([]);
    setPage(0);
    setSortBy(newSortBy);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sorts = {
    "-createdAt": "Latest",
    createdAt: "Earliest",
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center px-6 py-5 bg-zinc-900 rounded-lg">
        <div className="text-xl text-zinc-100">View All Comments</div>
        <SortBySelect onSortBy={handleSortBy} sortBy={sortBy} sorts={sorts} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} profile />
            ))}

          <div className="flex flex-col items-center px-6 py-8 bg-zinc-900 rounded-lg space-y-6">
            <img className="w-44" src="/nocomment.png" alt="" />
            <div className="flex flex-col items-center space-y-1">
              <div className="text-2xl text-zinc-100">
                {comments.length > 0 ? (
                  <>All comments have been viewed</>
                ) : (
                  <>No comments available</>
                )}
              </div>
              <button className="text-zinc-300 hover:underline" onClick={handleBackToTop}>
                Back To Top
              </button>
            </div>
          </div>

          {/* <Stack py={5} alignItems="center">
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {comments.length > 0 ? (
                <>All comments have been viewed</>
              ) : (
                <>No comments available</>
              )}
            </Typography>
            <Button variant="text" size="small" onClick={handleBackToTop}>
              Back to top
            </Button>
          </Stack> */}
        </>
      )}
    </div>
  );
};

export default CommentBrowser;