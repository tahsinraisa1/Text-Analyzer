import { Request, Response } from "express";
import Text from "../models/text";
import mongoose, { mongo } from "mongoose";
import { getTextMetrics } from "../utils/metricHelpers";
import { logger } from "../utils/logger";
import { handleServerErrors } from "../utils/errorHandler";

export const getTextList = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    return Text.find({ author: userId })
      .then((data) => res.status(200).json({ data }))
      .catch((err) => res.status(400).json({ error: err?.message }));
  } catch (error: any) {
    handleServerErrors(res, error);
  }
};

export const getTextMeta = async (req: Request, res: Response) => {
  try {
    const { id, type } = req.params;
    const textData = await Text.findById(id);
    if (!textData) {
      return res.status(404).json({ error: "Text data not found." });
    }
    const result = getTextMetrics(textData?.data, type);
    return res.json({ data: { [type]: result } });
  } catch (error: any) {
    handleServerErrors(res, error);
  }
};

export const addText = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const authorId = (req as any)?.userId;
    const textData = new Text({ data: text, author: authorId });
    return textData
      .save()
      .then(() => res.status(201).json({ message: "Text saved. " }))
      .catch((err) => res.status(400).json({ error: err?.message }));
  } catch (error: any) {
    handleServerErrors(res, error);
  }
};
