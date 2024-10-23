import { useNavigate, useParams } from "react-router-dom";
import { campaignDataType, oneCampaignType } from "../types/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OneCampaign({
  handlePopup,
  campaignData,
}: oneCampaignType) {
  const [thisCampaign, setThisCampaign] = useState<campaignDataType | null>(
    null
  );

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const campaign = campaignData.find((campaign) => campaign.id === id);

    if (!campaign) {
      navigate("/");
      handlePopup("No such campaign exists.");
    } else {
      setThisCampaign(campaign);
    }
  }, [id, campaignData, navigate]);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setThisCampaign((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  if (!thisCampaign) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const secondaryHeader = () => {
    return (
      <div className="w-screen flex justify-between p-2 gap-2 items-end shadow-md">
        <div className="flex gap-5 items-center">
          <h2 className="font-bold text-lg">
            {thisCampaign.campaignDescription}
          </h2>
          <p className="text-black opacity-40 text-xs">
            {thisCampaign.createdAt.slice(0, 16).replace("T", " ")}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/campaigns">
            <p className="text-sm mr-2 link">← Back to Campaigns</p>
          </Link>
          <p className="button2">Edit</p>
          <p className="buttonRed">Delete</p>
          <p className="button2">Rename</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {secondaryHeader()}
      <div className="flex justify-center mt-20 w-3/4 flex-col">
        <h2 className="font-black text-2xl">Campaign Details</h2>
        <p className="text-black opacity-40">
          Details about the marketing campaign.
        </p>
        <form className="flex flex-col mt-4">
          <div className="flex gap-3 w-full">
            <div className="w-1/2">
              <label htmlFor="companyName">Company Name:</label>
              <br />
              <input
                className="w-full"
                type="text"
                id="companyName"
                name="companyName"
                value={thisCampaign.companyName}
                // onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="campaignDescription">Company Description:</label>
              <br />
              <textarea
                className="w-full"
                id="campaignDescription"
                name="campaignDescription"
                value={thisCampaign.campaignDescription}
                // onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label htmlFor="productDescription">Product Description:</label>
              <br />
              <textarea
                className="w-full"
                id="productDescription"
                name="productDescription"
                value={thisCampaign.productDescription}
                // onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="targetAudience">Target Audience:</label>
              <br />
              <textarea
                className="w-full"
                id="targetAudience"
                name="targetAudience"
                value={thisCampaign.targetAudience}
                // onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
        <div className="flex flex-col w-96">
          <div className="flex">
            <div className="w-1/2 font-bold">Campaign Description:</div>
            <div className="w-1/2">{thisCampaign.campaignDescription}</div>
          </div>
          <div className="flex">
            <div className="w-1/2 font-bold">Product Description:</div>
            <div className="w-1/2">{thisCampaign.productDescription}</div>
          </div>
          <div className="flex">
            <div className="w-1/2 font-bold">Target Audience:</div>
            <div className="w-1/2">{thisCampaign.targetAudience}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
