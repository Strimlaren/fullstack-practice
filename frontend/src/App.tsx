import Campaigns from "./pages/Campaigns";
import Emails from "./pages/Emails";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import OneCampaign from "./pages/OneCampaign";

import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import MessagePopup from "./components/MessagePopup";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { campaignDataType } from "./types/types";
import NewCampaign from "./pages/NewCampaign";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [campaignData, setCampaignData] = useState<campaignDataType[]>([]);

  // Checks if the user is still logged on
  const checkLoginStatus = async () => {
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
          setLoggedUser("");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  // Gets campaign data and sets it in the state when user logs in.
  const updateCampaigns = async () => {
    const response = await fetch("/api/campaigns");

    if (response.ok) {
      const data = await response.json();
      setCampaignData(data);
    } else {
      setCampaignData([]);
    }
  };

  useEffect(() => {
    updateCampaigns();
  }, [isLoggedIn]);

  const handlePopup = async (message: string) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage("");
    }, 2500);
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
        campaignData={campaignData}
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
            element={
              isLoggedIn ? (
                <Campaigns
                  handlePopup={handlePopup}
                  campaignData={campaignData}
                  updateCampaigns={updateCampaigns}
                  checkLoginStatus={checkLoginStatus}
                />
              ) : (
                <Welcome />
              )
            }
          />
          <Route
            path="/campaigns/:id"
            element={
              isLoggedIn ? (
                <OneCampaign
                  handlePopup={handlePopup}
                  campaignData={campaignData}
                />
              ) : (
                <Welcome />
              )
            }
          />
          <Route
            path="/new-campaign"
            element={
              isLoggedIn ? (
                <NewCampaign handlePopup={handlePopup} />
              ) : (
                <Welcome />
              )
            }
          />
          <Route
            path="/emails"
            element={
              isLoggedIn ? <Emails handlePopup={handlePopup} /> : <Welcome />
            }
          />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
