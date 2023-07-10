import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import EventList from "./component/eventList";
import Event from "./component/event";
import AddEventForm from "./component/addEventForm";
import Register from "./component/login/Registration";
import Login from "./component/login/LoginForm";
import ChatBotSettings from "./component/chatBot/chatBotSettings";
import ChatBotButton from "./component/chatBot/chatBotButton";
import Home from "./component/home";
import Contact from "./component/contact";


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const handleLogin = (data) => {
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("email", data.email);
    setToken(data.idToken);
    setEmail(data.email);
  };

  return (
    <Router>
      <div>
        <div id="nav">
          <Link to="/">Головна</Link>
          <Link to="/lessons">Публікації</Link>
          <Link to="/contact">Контакти</Link>
          <></>
          {!token && <Link to="/login">Увійти</Link>}
          {token && (
            <>
            <Link to="/chatBotSettings">Налаштування чат-боту</Link>
            <Link
              to="/lessons"
              onClick={() => {
                localStorage.clear();
                setToken(null);
                setEmail(null);
              }}
            >
              Вийти
            </Link>
            </>
          )}
        </div>
        <Routes>
          <Route
            exact path="/"
            element={
              <>
                <Home />
                <ChatBotButton />
              </>
            }
          />
          <Route
            path="/lessons"
            element={
              <>
                <EventList tabName="lessons" />
                <ChatBotButton />
              </>
            }
          />
          <Route
            path="/lessons/:lessonId"
            element={<Event tabName="lessons" />}
          />
          <Route
            path="/lessons/add"
            element={<AddEventForm tabName="lessons" />}
          />
          <Route
            path="/contact"
            element={
              <>
                <Contact />
                <ChatBotButton />
              </>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/chatBotSettings" element={<ChatBotSettings />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
