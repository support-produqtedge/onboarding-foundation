import { NextFunction, Request, Response } from "express";
import MonoServices from "../services/mono.services";
import createHttpError from "http-errors";

class KYCController {
  private readonly monoServices = new MonoServices();

  public verifyTIN = async (req: Request, res: Response, next: NextFunction) => {
    const {tin} = req.body;
    try {
      const tinVerified = await this.monoServices.verifyTin(tin);

      res.status(200).json(tinVerified);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(404, error))
      }
      next(createHttpError(404))
    }
  }

  public verifyCac = async (req: Request, res: Response, next: NextFunction) => {
    const {cac} = req.body;
    try {
      const cacVerified = await this.monoServices.verifyCac(cac);
      res.status(200).json(cacVerified);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(404, error))
      }
      next(createHttpError(404));
    }
  }
}

export default KYCController;
