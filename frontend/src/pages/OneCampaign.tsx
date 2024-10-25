import { useNavigate, useParams } from "react-router-dom";
import { campaignDataType, oneCampaignType } from "../types/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProgressButton from "../components/ProgressButton";

import { CONFIRM_DELETE_MS } from "../utils/constants";

export default function OneCampaign({
  handlePopup,
  campaignData,
}: oneCampaignType) {
  const [thisCampaign, setThisCampaign] = useState<campaignDataType | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteInitiated, setDeleteInitiated] = useState<boolean>(false);

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

  if (!thisCampaign) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const handleChangeFields = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setThisCampaign((prevData) => {
      if (prevData === null) {
        return null;
      }

      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      await fetch(`/api/campaigns/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: thisCampaign.companyName,
          productDescription: thisCampaign.productDescription,
          targetAudience: thisCampaign.targetAudience,
          campaignDescription: thisCampaign.campaignDescription,
        }),
      });
    } catch (err) {
      console.error("Could not update campaign.", err);
      handlePopup("Could not update campaign.");
    }
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    setDeleteInitiated(true);
    setTimeout(() => {
      setDeleteInitiated(false);
    }, CONFIRM_DELETE_MS);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        handlePopup("User session expired. Action not allowed.");
        navigate("/campaigns");
      }
    } catch (err) {
      console.error("Could not delete campaign.", err);
      handlePopup("Could not delete campaign.");
      return;
    }
    navigate("/campaigns");
  };

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
          <button className="button2" onClick={handleEditSave}>
            {isEditing ? "Save" : "Edit"}
          </button>
          {deleteInitiated ? (
            <ProgressButton onClick={handleDelete}>Confirm?</ProgressButton>
          ) : (
            <button className="buttonRed" onClick={handleConfirmDelete}>
              Delete
            </button>
          )}
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
                onChange={handleChangeFields}
                disabled={!isEditing}
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
                onChange={handleChangeFields}
                disabled={!isEditing}
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
                onChange={handleChangeFields}
                disabled={!isEditing}
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
                onChange={handleChangeFields}
                disabled={!isEditing}
                required
              />
            </div>
          </div>
        </form>
        {/* <div className="flex flex-col w-96">
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
        </div> */}
      </div>
    </div>
  );
}
