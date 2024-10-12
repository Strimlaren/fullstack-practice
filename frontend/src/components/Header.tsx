import { headerProps } from "../types/types";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  setIsModalOpen,
  loggedUser,
  setLoggedUser,
  isLoading,
  handlePopup,
}: headerProps) => {
  const [campaignCount, setCampaignCount] = useState<number>(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");

    setLoggedUser("");
    setIsLoggedIn(false);
    handlePopup(`Bye, ${loggedUser}`);
    navigate("/");
  };

  useEffect(() => {
    getCampaignCount();
  }, []);

  const navContent = () => {
    return (
      <aside className="flex gap-2">
        <Link to="/campaigns">
          <p className="button1">
            Campaigns{" "}
            <span className="bg-white text-black ml-1 px-3 rounded-full font-semibold toaster">
              {campaignCount}
            </span>
          </p>
        </Link>
        <Link to="/emails">
          <p className="button1">Emails</p>
        </Link>
        <a onClick={handleLogout} className="button1">
          Logout
        </a>
      </aside>
    );
  };

  const getCampaignCount = async () => {
    const response = await fetch("/api/campaigns");

    if (response.ok) {
      const data = await response.json();

      setCampaignCount(data.length);
    }
  };

  return (
    <div className="shadow p-2 flex justify-between items-center">
      <div className="flex gap-2 items-center justify-center">
        <EnvelopeOpenIcon className="text-black size-6" />
        <Link to="/">
          <p className="text-3xl">
            SPAM<span className="text-orange-700">mail</span>
          </p>
        </Link>
      </div>
      <nav className="flex gap-2">
        {!isLoading ? (
          isLoggedIn ? (
            <div className="flex gap-2 items-center">
              <p>
                Welcome, <span className="text-orange-700">{loggedUser}</span>
              </p>
              {navContent()}
            </div>
          ) : (
            <>
              <a onClick={() => setIsModalOpen(true)} className="button1">
                Login
              </a>
              <Link to="/register">
                <p className="button1">Register</p>
              </Link>
            </>
          )
        ) : (
          <p className="loadingButton">Loading...</p>
        )}
      </nav>
    </div>
  );
};

export default Header;
