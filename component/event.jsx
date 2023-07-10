import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Event = ({ tabName }) => {
  const [lesson, setLesson] = useState(null);
  const { lessonId } = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const match = urlParams.get("match");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/${lessonId}.json`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch event.");
        }

        setLesson(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEvent();
  }, [tabName, lessonId]);

  if (!lesson) {
    return <p>Завантажуємо...</p>;
  }

  const highlightMatch = (text, match) => {
    if (!match) {
      return text;
    }

    const regex = new RegExp(match, "gi");
    return text.replace(regex, (match) => `**${match}**`);
  };

  const processQueryWord = (queryWord) => {
    if (!queryWord) {
      return; // Возвращаем null, если queryWord не существует
    }
  
    let modifiedQueryWord = queryWord;
  
    if (queryWord.length > 4) {
      modifiedQueryWord = queryWord.slice(0, -2);
    } else if (queryWord.length > 3) {
      modifiedQueryWord = queryWord.slice(0, -1);
    } else if (queryWord.length > 2) {
      modifiedQueryWord = queryWord.slice(0, -1);
    } else {
      return; // пропустить слова, содержащие 2 символа или менее
    }
  
    return modifiedQueryWord.toLowerCase();
  };

  const searchWords = match ? match.split(" ") : [];
  const modifiedSearchWords = searchWords.map(processQueryWord);

  const isMatch = (text) => {
    for (let i = 0; i < modifiedSearchWords.length; i++) {
      if (text.toLowerCase().includes(modifiedSearchWords[i])) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <div id="staticinfo">
        <div className="card">
        <h2>{lesson.title}</h2>
        <img src={lesson.imageUrl} alt={lesson.title} />
        <p>{lesson.description}</p>
        </div>
        <ReactMarkdown>
          {highlightMatch(lesson.text, modifiedSearchWords[0])}
        </ReactMarkdown>
        {modifiedSearchWords.slice(1).map((searchWord) => (
          <ReactMarkdown key={searchWord}>
            {highlightMatch(lesson.text, searchWord)}
          </ReactMarkdown>
        ))}
      </div>
    </div>
  );
};

export default Event;
