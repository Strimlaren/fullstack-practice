import { useEffect, useState } from "react";
import { campaignProps } from "../types/types";

export default function Campaigns({
  handlePopup,
  campaignData,
}: campaignProps) {
  return (
    <div className="flex flex-col mt-40">
      <h1 className="text-5xl font-black">My Spam Campaigns</h1>
      <aside className=" bg-orange-800 flex">
        <ul className="flex gap-6 justify-center items-center">
          {campaignData.map((campaign, index) => {
            return <li key={index}>{campaign.companyName}</li>;
          })}
        </ul>
      </aside>
    </div>
  );
}
