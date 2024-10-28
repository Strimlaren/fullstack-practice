import { headerProps } from "../types/types";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

import { NavContent } from "./NavContent";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  setIsModalOpen,
  loggedUser,
  setLoggedUser,
  isLoading,
  handlePopup,
  campaignData,
}: headerProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");

    setLoggedUser("");
    setIsLoggedIn(false);
    handlePopup(`Bye, ${loggedUser}`);
    navigate("/");
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
              <NavContent
                campaigns={campaignData.length}
                handleLogout={handleLogout}
              />
            </div>
          ) : (
            <>
              <button onClick={() => setIsModalOpen(true)} className="button1">
                Login
              </button>
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
