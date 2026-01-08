import { NextFunction, Request, Response } from "express";
import AuditLogsService from "../services/auditLogs.services";
import createHttpError from "http-errors";

class AuditLogsController {
  private readonly auditlogsService = new AuditLogsService();

  public getLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logs = await this.auditlogsService.getLogs();
      res.status(200).json(logs);
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error))
      }
      next(createHttpError(400));
    }
  }
}

export default AuditLogsController;
