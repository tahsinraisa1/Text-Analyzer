import { NextFunction } from "express";
import { Request, Response } from "express";
import { jwtSecret } from "../configs";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Authorization token required!" });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).userId = (user as JWTPayload)?.id;
    next();
  });
};
