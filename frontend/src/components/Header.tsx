import { headerProps } from "../types/types";

const Header = ({ isLoggedIn, setIsModalOpen, loggedUser }: headerProps) => {
  return (
    <div className="shadow p-2 flex justify-between items-center">
      <p>Icon</p>
      <nav className="flex gap-2">
        {isLoggedIn ? (
          <p>Welcome, {loggedUser}</p>
        ) : (
          <a onClick={() => setIsModalOpen(true)} className="button1">
            Login
          </a>
        )}
        {isLoggedIn ? undefined : <p className="button1">Register</p>}
      </nav>
    </div>
  );
};

export default Header;
