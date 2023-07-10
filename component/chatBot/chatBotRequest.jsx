import React, { useEffect, useState } from "react";

const ChatBotRequests = () => {
  const [prompts, setPrompts] = useState();
  const [replies, setReplies] = useState();

  const separator1 = "**";
  const separator2 = ";";

  useEffect(() => {
    fetch("https://your-firebase-database-url.com/text.json")
      .then((response) => response.json())
      .then((data) => setPrompts(data.text));

    fetch("https://your-firebase-database-url.com/textreplies.json")
      .then((response) => response.json())
      .then((data) => setReplies(data.textreplies));
  }, []);

  const try2 = prompts.split(separator2).map((i) => i.split(separator1));
  const try4 = replies.split(separator2).map((x) => x.split(separator1));

  return { prompts: try2, replies: try4 };
};

export default ChatBotRequests;
