import { Request, Response } from "express";
import dpdService from "../services/dpdService";

export const getStatus = async (req: Request, res: Response) => {
  try {
    const status = await dpdService.getStatusInfo();
    res.json(status);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Failed to fetch status info" });
  }
};
