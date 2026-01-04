import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import MonoServices from "../services/mono.services";

const monoservice = new MonoServices();

export const validateKyc = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {tin, cac} = req.body;

    if (!tin) throw new Error("TIN is required");
    if (!cac) throw new Error ("CAC registration number is required");

    const verifyTin = await monoservice.verifyTin(tin);
    if (!verifyTin) throw new Error("Invalid TIN number");
    if (verifyTin.status !== "successful") throw new Error("Unable to verify TIN credentials");

    const verifyCac = await monoservice.verifyCac(cac);
    if (!verifyCac) throw new Error("Invalid CAC registration number");
    if (verifyCac.status !== "successful") throw new Error("Unable to verify CAC credentials");

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(createHttpError(403, error))
    }
    next(createHttpError(403));
  }
}
