import { SetStateAction } from "react";

export interface headerProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: string;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

export interface loginModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
}

export interface registerProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePopup: Function;
}

export interface messagePopupProps {
  message: string;
}
