import { NextFunction } from "express";
import { Request, Response } from "express";

export const cacheEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
  res.setHeader("Expires", new Date(Date.now() + 3600000).toUTCString());
  next();
};
