import { SetStateAction } from "react";

export interface headerProps {
  isLoggedIn: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: string;
}

export interface loginModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
}
