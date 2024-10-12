import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import Campaigns from "./pages/Campaigns";
import Emails from "./pages/Emails";

import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import MessagePopup from "./components/MessagePopup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [popupMessage, setPopupMessage] = useState<string>("");

  // Checks if the user is still logged on
  useEffect(() => {
    fetch("/api/auth/status", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setIsLoggedIn(true);
          setLoggedUser(data.user.email);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setIsLoading(false);
      });
  }, []);

  const handlePopup = async (message: string) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage("");
    }, 3000);
  };

  return (
    <div className="flex flex-col test11">
      {popupMessage.length > 0 ? (
        <MessagePopup message={popupMessage} />
      ) : undefined}
      {isModalOpen ? (
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          setIsLoggedIn={setIsLoggedIn}
          setLoggedUser={setLoggedUser}
          handlePopup={handlePopup}
        />
      ) : undefined}
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsModalOpen={setIsModalOpen}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        isLoading={isLoading}
        handlePopup={handlePopup}
      />
      <div className="flex justify-center items-center">
        <Routes>
          <Route
            path="/register"
            element={
              <Register
                setIsModalOpen={setIsModalOpen}
                handlePopup={handlePopup}
              />
            }
          />
          <Route
            path="/campaigns"
            element={<Campaigns handlePopup={handlePopup} />}
          />
          <Route
            path="/emails"
            element={<Emails handlePopup={handlePopup} />}
          />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
