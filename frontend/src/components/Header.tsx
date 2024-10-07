import { headerProps } from "../types/types";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  setIsModalOpen,
  loggedUser,
  setLoggedUser,
  isLoading,
}: headerProps) => {
  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    setLoggedUser("");
    setIsLoggedIn(false);
  };

  return (
    <div className="shadow p-2 flex justify-between items-center">
      <div className="flex gap-2 items-center justify-center">
        <EnvelopeOpenIcon className="text-black size-6" />
        <p className="text-3xl">
          SPAM<span className="text-orange-700">mail</span>
        </p>
      </div>
      <nav className="flex gap-2">
        {!isLoading ? (
          isLoggedIn ? (
            <div className="flex gap-2 items-center">
              <p>
                Welcome, <span className="text-orange-700">{loggedUser}</span>
              </p>
              <a onClick={handleLogout} className="button1">
                Logout
              </a>
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
