import { Link } from "react-router-dom";
import { navContentProps } from "../types/types";

export const NavContent = ({ campaigns, handleLogout }: navContentProps) => {
  return (
    <aside className="flex gap-2">
      <Link to="/campaigns">
        <button className="button1">
          Campaigns{" "}
          <span className="bg-white text-black ml-1 px-3 rounded-full font-semibold toaster">
            {campaigns}
          </span>
        </button>
      </Link>
      <Link to="/emails">
        <button className="button1">Emails</button>
      </Link>
      <button onClick={handleLogout} className="button1">
        Logout
      </button>
    </aside>
  );
};
