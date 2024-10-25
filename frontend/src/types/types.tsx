import { ReactNode } from "react";

export type campaignDataType = {
  campaignDescription: string;
  companyName: string;
  id: string;
  productDescription: string;
  targetAudience: string;
  userId: string;
  createdAt: string;
};

export interface headerProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: string;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  handlePopup: Function;
  campaignData: campaignDataType[];
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
  campaignData: campaignDataType[];
  updateCampaigns: Function;
}

export interface emailProps {
  handlePopup: Function;
}

export interface oneCampaignType {
  handlePopup: Function;
  campaignData: campaignDataType[];
}

export interface ProgressButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}
