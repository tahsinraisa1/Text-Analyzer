import { Response } from "express";
import { logger } from "./logger";

export const handleServerErrors = (res: Response, error: any) => {
    logger.error(error?.message);
    return res.status(500).json({ error: error?.message });
};