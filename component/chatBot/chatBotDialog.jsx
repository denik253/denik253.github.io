const separator1 = "**";
const separator2 = ";";

const fetchData = async () => {
  const promptsResponse = await fetch(
    "https://react-http-b8565-default-rtdb.firebaseio.com/chatset/text.json"
  );
  const promptsData = await promptsResponse.json();

  const replyResponse = await fetch(
    "https://react-http-b8565-default-rtdb.firebaseio.com/chatset/textreplies.json"
  );
  const replyData = await replyResponse.json();

  const prompts = promptsData.split(separator2).map((str) => str.split(separator1));
  const replies = replyData.split(separator2).map((str) => str.split(separator1));

  return { prompts, replies };
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatBotDialog = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);

  const [prompts, setPrompts] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    async function fetchDataAndUpdateState() {
      const { prompts, replies } = await fetchData();
      setPrompts(prompts);
      setReplies(replies);
    }

    fetchDataAndUpdateState();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (!input || input.length < 1) {
      return;
    }
  
    dispatch({ type: "ADD_MESSAGE", payload: { text: input, sender: "user" } });
  
    const response = await output(input);
    dispatch({ type: "ADD_MESSAGE", payload: { text: response, sender: "bot" } });
  
    setInput("");
  }
  

  const alternative = [
    "За запитом нічого не знайдено",
    "Хм... Я нічого не знайшов",
  ];

  function output(input) {
    let product = null;
    let text = input.toLowerCase().trim();
  
    if (prompts.length > 0 && replies.length > 0) {
      for (let i = 0; i < prompts.length; i++) {
        if (prompts[i].includes(text)) {
          product = replies[i][Math.floor(Math.random() * replies[i].length)];
          return product;
        }
      }
    }
  
    const firebaseUrl = "https://react-http-b8565-default-rtdb.firebaseio.com";
    return fetch(`${firebaseUrl}/lessons.json`)
      .then((response) => response.json())
      .then((lessons) => {
        let maxMatches = 0;
        let product = null;
  
        Object.keys(lessons).forEach((lessonId) => {
          const lesson = lessons[lessonId];
          let matches = 0;
          const lessonText = lesson.text
            .replace(/([_*~`])/g, "")
            .replace(/<\/?[^>]+>/g, "");
          const words = lessonText.split(" ");
  
          text.split(" ").forEach((queryWord) => {
            let modifiedQueryWord = "";
            if (queryWord.length > 4) {
              modifiedQueryWord = queryWord.slice(0, -2);
            } else if (queryWord.length > 3) {
              modifiedQueryWord = queryWord.slice(0, -1);
            } else if (queryWord.length > 2) {
              modifiedQueryWord = queryWord.slice(0, -1);
            } else {
              return;
            }
  
            words.forEach((word) => {
              if (word.toLowerCase().includes(modifiedQueryWord.toLowerCase())) {
                matches++;
              }
            });
          });
  
          if (matches > maxMatches) {
            maxMatches = matches;
            const link = `/lessons/${lessonId}?match=${encodeURIComponent(
              text
            )}  `;
            product = (
              <div>
                Знайдено {matches} співпадінь. Посилання на:
                <a href={link} target="_blank">
                  {" "}
                  {lesson.title}
                </a>
              </div>
            );
          }
        });
  
        if (product) {
          return product;
        } else {
          return alternative[Math.floor(Math.random() * alternative.length)];
        }
      })
      .catch((error) => {
        console.log(error);
        return <div>Невідома помилка</div>;
      });
  }

  

  return (
    <div className="dialog-window show">
      <div id="messages">
        {messages.map((message, index) => (
          <div key={index} className={`response ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          value={input}
          type="text"
          placeholder="Введіть запит..."
          onChange={(event) => setInput(event.target.value)}
        />
        <FontAwesomeIcon
          className="icon"
          icon={faPaperPlane}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatBotDialog;