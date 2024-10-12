import { useEffect, useState } from "react";
import { campaignProps } from "../types/types";

export default function Campaigns({ handlePopup }: campaignProps) {
  return (
    <div className="mt-40 bg-orange-800">
      <h1 className="text-5xl font-black">My Spam Campaigns</h1>
      <aside>Campaigns</aside>
    </div>
  );
}
