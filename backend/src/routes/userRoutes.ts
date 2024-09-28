import express from "express";
import prisma from "../db/prisma";
import { Request, Response } from "express-serve-static-core";

const usersRoutes = express.Router();

usersRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err: "Could not find users" });
  }
});

usersRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err: "Could not find user." });
  }
});

usersRoutes.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ err: "Failed to add new user." });
  }
});

usersRoutes.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password } = req.body;

  const updatedUser: { email?: string; password?: string } = {};

  if (email) updatedUser.email = email;
  if (password) updatedUser.password = password;

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: updatedUser,
    });
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(404).json({ err: "Could not update that user." });
  }
});

usersRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(404).json({ err: "Could not delete that user" });
  }
});

export default usersRoutes;
