import express from "express";
import passport from "passport";
import { Request, Response } from "express-serve-static-core";
import prisma from "../db/prisma";
import bcrypt from "bcrypt";
import { User } from "../types/types";

const authRoutes = express.Router();

// LOGIN
authRoutes.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Logged in successfully", user: req.user });
  }
);
// CREATE USER
authRoutes.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser)
      return res.status(406).json({ message: `User ${email} already exists.` });

    try {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPass,
        },
      });
      res
        .status(200)
        .json({ message: "Successfully created user", user: newUser });
    } catch (err) {
      res.status(500).json({ err, message: "Error creating user" });
    }
  }
);
// LOGGED IN USER STATUS
authRoutes.get("/status", (req: Request, res: Response): any => {
  const user = req.user as User;

  if (req.user) {
    return res
      .status(200)
      .json({ message: `User ${user.email} is logged in.`, user: user.email });
  }
  res.status(401).json({ message: "No user is logged in" });
});
// LOG OUT
authRoutes.get("/logout", (req: Request, res: Response) => {
  const user = req.user as User;

  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy((err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Session destroy failed", error: err });
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: `User logged out.` });
    });
  });
});

export default authRoutes;
