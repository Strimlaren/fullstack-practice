import { useEffect, useState } from "react";
import { campaignProps } from "../types/types";
import { Link } from "react-router-dom";

export default function Campaigns({
  handlePopup,
  campaignData,
  updateCampaigns,
  checkLoginStatus,
}: campaignProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const secondaryHeader = () => {
    return (
      <div className="w-screen flex justify-between p-2 gap-2 items-end shadow-md">
        <div className="flex gap-5 items-center">
          <h2 className="font-bold text-lg">{"Spam Campaigns"}</h2>
          <p className="text-black opacity-40 text-xs">{}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/">
            <p className="text-sm mr-2 link">← Home</p>
          </Link>
          <Link to="/new-campaign">
            <p className="button2">+ New Campaign</p>
          </Link>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      await checkLoginStatus();
      await updateCampaigns();
      setIsLoading(false);
    };

    fetchCampaigns();
  }, []);

  if (isLoading) return <p className="mt-48">Loading Campaigns...</p>;

  return (
    <div className="flex flex-col items-center">
      {secondaryHeader()}
      <div className="flex flex-col mt-20 w-full justify-center items-center">
        <h1 className="text-5xl font-black">My Spam Campaigns</h1>
        <aside className="flex">
          <ul className="flex gap-6 justify-center items-center flex-wrap ">
            {campaignData.map((campaign, index) => {
              return (
                <Link to={`/campaigns/${campaign.id}`} key={index}>
                  <li className="shadow p-2 w-48 flex flex-col hover:shadow-lg transition-all hover:cursor-pointer hover: rounded-md hover:-translate-y-px">
                    <h2 className="text-md font-bold uppercase text-black">
                      {campaign.campaignDescription}
                    </h2>
                    <p className="text-xs font-semibold text-gray-600 uppercase">
                      {campaign.companyName}
                    </p>
                    <p className="text-xs text-gray-600 uppercase">
                      {campaign.productDescription}
                    </p>
                    <p className="text-xs text-gray-600 uppercase">
                      Targeting{" "}
                      <span className="uppercase">
                        {campaign.targetAudience}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 uppercase">
                      Created:{" "}
                      {`${campaign.createdAt.slice(0, 16).replace(/T/g, " ")}`}
                    </p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
