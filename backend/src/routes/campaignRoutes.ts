import express from "express";
import prisma from "../db/prisma";
import { Request, Response } from "express-serve-static-core";
import { User } from "../types/types";

const campaignRoutes = express.Router();

// GET CURRENT USERS ALL CAMPAIGNS
campaignRoutes.get("/", async (req: Request, res: Response): Promise<any> => {
  if (!req.user) {
    return res.status(401).json({ message: "User needs to be logged in." });
  }

  const user = req.user as User;

  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: user.id,
      },
    });

    if (campaigns.length === 0)
      return res.status(401).json({ message: "User has no campaigns." });

    return res.status(200).json(campaigns);
  } catch (err) {
    return res.status(500).json({ message: "Could not fetch campaigns.", err });
  }
});
// GET SPECIFIC CAMPAIGN
campaignRoutes.get(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    if (!req.user)
      return res.status(401).json({ message: "User needs to be logged in." });

    const user = req.user as User;
    const campaignId = req.params.id;

    try {
      const campaign = await prisma.campaign.findUnique({
        where: {
          userId: user.id,
          id: campaignId,
        },
      });
      return res.status(200).json(campaign);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Could not fetch campaigns.", err });
    }
  }
);
// CREATE NEW CAMPAIGN
campaignRoutes.post("/", async (req: Request, res: Response): Promise<any> => {
  const {
    companyName,
    campaignDescription,
    productDescription,
    targetAudience,
    emails,
  } = req.body;

  const user = req.user as User;

  const campaignAlreadyExists = await prisma.campaign.findFirst({
    where: {
      companyName: companyName,
      campaignDescription: campaignDescription,
      productDescription: productDescription,
      targetAudience: targetAudience,
    },
  });

  if (campaignAlreadyExists)
    return res
      .status(406)
      .json({ message: `An identical campaign already exists.` });

  try {
    const addCampaign = await prisma.campaign.create({
      data: {
        companyName: companyName,
        campaignDescription: campaignDescription,
        productDescription: productDescription,
        targetAudience: targetAudience,
        userId: user.id,
      },
    });

    res.status(201).json({
      message: "New campaign successfully added.",
      campaign: addCampaign,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not create new campaign.", err });
  }
});
// EDIT CAMPAIGN
campaignRoutes.put(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    if (!req.user)
      return res.status(401).json({ message: "User needs to be logged in." });

    const campaignId = req.params.id;
    const {
      companyName,
      productDescription,
      targetAudience,
      campaignDescription,
    } = req.body;

    try {
      const updatedCampaign = await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          companyName: companyName,
          productDescription: productDescription,
          targetAudience: targetAudience,
          campaignDescription: campaignDescription,
        },
      });
      res.status(200).json({ updatedCampaign });
    } catch (err) {
      console.error("Error updating campaign:", err);
      return res.status(500).json({ message: "Could not update campaign." });
    }
  }
);
// DELETE CAMPAIGN
campaignRoutes.delete(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      const removedCampaign = await prisma.campaign.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(removedCampaign);
    } catch (err) {
      console.error("Could not delete campaign.", err);
      res.status(404).json({ message: "Could not delete campaign." });
    }
  }
);
export default campaignRoutes;
