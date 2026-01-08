import { NextFunction, Request, Response } from "express";
import CompanyService from "../services/company.services";
import createHttpError from "http-errors";

class CompanyController {
  private readonly companyService = new CompanyService();

  public getCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companies = await this.companyService.getCompanies();
      res.status(200).json(companies);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error));
      }
      next(createHttpError(400));
    }
  }

  public getCompany = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params["id"];
    try {
      const company = await this.companyService.getCompany(String(id));
      res.status(200).json(company);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error));
      }
      next(createHttpError(400));
    }
  }
}

export default CompanyController;
