import { AuditLogs } from "../db";

class AuditLogsService {
  private readonly AuditLogs = AuditLogs;

  public async createLog(name: string, action: string, description: string) {
    try {
      const auditlog = await this.AuditLogs.create({
        name,
        action,
        description
      });

      return auditlog;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error))
    }
  }

  public async getLogs() {
    try {
      const logs = await this.AuditLogs.findAll();

      return logs;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error))
    }
  }
}

export default AuditLogsService;
