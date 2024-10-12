export interface headerProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: string;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  handlePopup: Function;
}

export interface loginModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
  handlePopup: Function;
}

export interface registerProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePopup: Function;
}

export interface messagePopupProps {
  message: string;
}
export interface campaignProps {
  handlePopup: Function;
}
export interface emailProps {
  handlePopup: Function;
}
