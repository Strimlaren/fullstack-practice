import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface form {
  companyName: string;
  campaignDescription: string;
  productDescription: string;
  targetAudience: string;
}

export default function NewCampaign() {
  const [campaignForm, setCampaignForm] = useState<form>({
    companyName: "",
    campaignDescription: "",
    productDescription: "",
    targetAudience: "",
  });
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  const secondaryHeader = () => {
    return (
      <div className="w-screen flex justify-between p-2 gap-2 items-end shadow-md">
        <div className="flex gap-5 items-center">
          <h2 className="font-bold text-lg">{"Create New Campaign"}</h2>
          <p className="text-black opacity-40 text-xs">{}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/campaigns">
            <p className="text-sm inline mr-2 link">← My Campaigns</p>
          </Link>
          {/* <p className="button2">+ New Campaign</p> */}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (
      campaignForm.companyName !== "" &&
      campaignForm.campaignDescription !== "" &&
      campaignForm.productDescription !== "" &&
      campaignForm.targetAudience !== ""
    ) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [campaignForm]);

  const handleInputChanges = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCampaignForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmitNewCampaign = async () => {};

  return (
    <div className="flex flex-col items-center">
      {secondaryHeader()}
      <div className="flex justify-center mt-20 w-3/5 flex-col">
        <h2 className="font-black text-2xl">New Campaign</h2>
        <p className="text-black opacity-40">
          Enter the details about your new spam campaign.
        </p>
        <form action="/api" method="POST" className="flex flex-col mt-4">
          <label htmlFor="companyName">
            <strong>Company Name:</strong>
          </label>
          <input
            type="text"
            className="w-full"
            id="companyName"
            name="companyName"
            value={campaignForm.companyName}
            onChange={handleInputChanges}
            required
          />
          <label htmlFor="campaignDescription">
            <strong>Campaign Description:</strong>
          </label>
          <textarea
            className="w-full h-14"
            id="campaignDescription"
            name="campaignDescription"
            value={campaignForm.campaignDescription}
            onChange={handleInputChanges}
            required
          />
          <label htmlFor="productDescription">
            <strong>Product Description:</strong>
          </label>
          <textarea
            className="w-full h-14"
            id="productDescription"
            name="productDescription"
            value={campaignForm.productDescription}
            onChange={handleInputChanges}
            required
          />
          <label htmlFor="targetAudience">
            <strong>Target Audience:</strong>
          </label>
          <textarea
            className="w-full h-14"
            id="targetAudience"
            name="targetAudience"
            value={campaignForm.targetAudience}
            onChange={handleInputChanges}
            required
          />
          <button
            onClick={handleSubmitNewCampaign}
            className="button1 mt-3"
            disabled={!isFormFilled}>
            {isFormFilled ? "Create Campaign" : "No empty fields allowed."}
          </button>
        </form>
      </div>
    </div>
  );
}
