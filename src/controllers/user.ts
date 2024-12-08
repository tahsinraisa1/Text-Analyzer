import { Request, Response } from "express";
import User from "../models/user";
import mongoose, { mongo } from "mongoose";
import { getTextMetrics } from "../utils/metricHelpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { jwtSecret } from "../configs";
import { handleServerErrors } from "../utils/errorHandler";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email & Password are required!" });
    }
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    return res.status(201).json({ data: { token } });
  } catch (error: any) {
    handleServerErrors(res, error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email & Password are required!" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    return res.json({ data: { token } });
  } catch (error: any) {
    handleServerErrors(res, error);
  }
};
