import React from "react";
import ReactMarkdown from "react-markdown";

const Markdown = ({ content }) => {
  const disallowed = ["Image"];

  return (
      <ReactMarkdown
        className="text-zinc-300"
        disallowedElements={disallowed}
        skipHtml
        children={content}
      />
  );
};

export default Markdown;
