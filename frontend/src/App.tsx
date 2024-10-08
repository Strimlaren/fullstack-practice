import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";

import { useState, useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Checks if the user is still logged on
  useEffect(() => {
    fetch("/api/auth/status", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setIsLoggedIn(true);
          setLoggedUser(data.user);
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

  return (
    <div className="flex flex-col test11">
      {isModalOpen ? (
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          setIsLoggedIn={setIsLoggedIn}
          setLoggedUser={setLoggedUser}
        />
      ) : undefined}
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsModalOpen={setIsModalOpen}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        isLoading={isLoading}
      />
      <div className="flex justify-center items-center">
        <Routes>
          <Route
            path="/register"
            element={<Register setIsModalOpen={setIsModalOpen} />}
          />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
