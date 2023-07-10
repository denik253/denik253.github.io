import React, { useState, useEffect } from "react";
import "./ChatBotSettings.css"

const ChatBotSettings = () => {
  const [text, setText] = useState("");
  const [inputprompts1, setInputinputprompts1] = useState("");
  const [textreplies, setTextreplies] = useState("");

  useEffect(() => {
    const databaseUrl =
      "https://react-http-b8565-default-rtdb.firebaseio.com/chatset/text.json";
    const separator = ";"; // символ-разделитель

    // Получаем данные из базы данных Firebase и устанавливаем начальное значение состояния текста
    fetch(databaseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch text from database");
        }
        return response.text();
      })
      .then((text) => {
        const formattedText = text.trim().split(separator).join("\n");
        setText(formattedText);
        setInputinputprompts1(formattedText); // Устанавливаем начальное значение для отображаемого текста
      })
      .catch((error) => {
        console.error("Error getting text from database:", error);
      });

    const databaseUrlReplies =
      "https://react-http-b8565-default-rtdb.firebaseio.com/chatset/textreplies.json";

    // Получаем данные из базы данных Firebase и устанавливаем начальное значение состояния textreplies
    fetch(databaseUrlReplies)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch textreplies from database");
        }
        return response.text();
      })
      .then((text) => {
        const formattedText = text.trim().split(separator).join("\n");
        setTextreplies(formattedText);
      })
      .catch((error) => {
        console.error("Error getting textreplies from database:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleInputChangeReplies = (event) => {
    setTextreplies(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const databaseUrl =
      "https://react-http-b8565-default-rtdb.firebaseio.com/chatset/text.json";
    const separator = ";";
    const formattedText = text.trim().split("\n").join(separator);

    // Отправляем данные в базу данных Firebase
    console.log(formattedText);
    fetch(databaseUrl, {
      method: "PUT",
      body: JSON.stringify(formattedText),
    })
      .then(() => {
        console.log("Text sent to database!");

        // Получаем данные из базы данных Firebase после отправки и устанавливаем состояние для отображаемого текста
        fetch(databaseUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch text from database");
            }
            return response.text();
          })
          .then((text) => {
            const formattedText = text.trim().split(separator).join("\n");
            setText(formattedText);
          })
          .catch((error) => {
            console.error("Error getting text from database:", error);
          });
      })
      .catch((error) => {
        console.error("Error sending text to database:", error);
      });

    setText("");
  };

  const handleSubmitReplies = (event) => {
    event.preventDefault();

    const databaseUrlReplies =
      "https://react-http-b8565-default-rtdb.firebaseio.com/chatset/textreplies.json";
    const separator = ";"; // символ-разделитель
    const formattedText = textreplies.trim().split("\n").join(separator);
    fetch(databaseUrlReplies, {
      method: "PUT",
      body: JSON.stringify(formattedText),
    })
      .then(() => {
        console.log("Text replies sent to database!");

        // Получаем данные из базы данных Firebase после отправки и устанавливаем состояние для textreplies
        fetch(databaseUrlReplies)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch textreplies from database");
            }
            return response.text();
          })
          .then((text) => {
            const formattedText = text.trim().split(separator).join("\n");
            setTextreplies(formattedText);
          })
          .catch((error) => {
            console.error("Error getting textreplies from database:", error);
          });
      })
      .catch((error) => {
        console.error("Error sending text replies to database:", error);
      });

    setTextreplies("");
  };

  return (
    <div className="settings" style={{ width: '50%', margin: 'auto' }}>
      <h1 style={{ textAlign: "center"}}>Налаштування чат-бота</h1>
      <form onSubmit={handleSubmit}  style={{ float: 'right', marginBottom: '30px'}}>
        <label htmlFor="text">Введіть в текстове поле необхідний текст, розділяючи його ** ви отримаєте комбінацію переліку запитів, виконавши перехід на новий рядок ви створите новий запит, та його комбінації</label>
        <textarea
          id="text"
          value={text.replaceAll('"', '')}
          onChange={handleInputChange}
          style={{ width: '100%', height: '200px', resize: 'vertical', marginBottom: '10px' }}
        ></textarea>
        <button type="submit" style={{ float: 'right', borderRadius:'5px' }}>Зберегти запити</button>
      </form>
      <form onSubmit={handleSubmitReplies}>
        <label htmlFor="textreplies">Введіть текст, яким бот повинен відповідати, використовуючи синтаксис, описаний вище</label>
        <textarea
          id="textreplies"
          value={textreplies.replaceAll('"', '')}
          onChange={handleInputChangeReplies}
          style={{ width: '100%', height: '200px', resize: 'vertical', marginBottom: '10px'}}
        ></textarea>
        <button type="submit" style={{ float: 'right', borderRadius:'5px'}}>Зберегти відповіді</button>
      </form>
    </div>
  );
  
};

export default ChatBotSettings;
