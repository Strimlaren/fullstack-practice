import Footer from "./components/Footer";
import Header from "./components/Header";

import { useState } from "react";

import LoginModal from "./components/LoginModal";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string>("");

  return (
    <div className="flex flex-col">
      {isModalOpen ? (
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          setIsLoggedIn={setIsLoggedIn}
          setLoggedUser={setLoggedUser}
        />
      ) : undefined}
      <Header
        isLoggedIn={isLoggedIn}
        setIsModalOpen={setIsModalOpen}
        loggedUser={loggedUser}
      />
      <div className="p-4">
        <p className="text-3xl">APP</p>
      </div>
      <Footer />
    </div>
  );
};

export default App;
