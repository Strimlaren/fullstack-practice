import { useEffect, useState } from "react";
import { campaignProps } from "../types/types";

export default function Campaigns({
  handlePopup,
  campaignData,
}: campaignProps) {
  return (
    <div className="flex flex-col mt-20 w-full justify-center items-center">
      <h1 className="text-5xl font-black">My Spam Campaigns</h1>
      <aside className="flex">
        <ul className="flex gap-6 justify-center items-center flex-wrap">
          {campaignData.map((campaign, index) => {
            return (
              <li
                className="shadow p-2 w-48 flex flex-col hover:shadow-xl transition-all hover:cursor-pointer"
                key={index}>
                <h2 className="text-lg uppercase text-orange-700">
                  {campaign.companyName}
                </h2>
                <p className="text-sm text-black">
                  {campaign.companyDescription}
                </p>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
