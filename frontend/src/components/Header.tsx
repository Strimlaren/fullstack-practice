import { headerProps } from "../types/types";

const Header = ({ isLoggedIn }: headerProps) => {
  return (
    <div className="shadow p-2 flex justify-between items-center">
      <p>Icon</p>
      <nav className="flex gap-2">
        {isLoggedIn ? <p>Welcome, User</p> : <p className="button1">Login</p>}
        {isLoggedIn ? undefined : <p className="button1">Register</p>}
      </nav>
    </div>
  );
};

export default Header;
