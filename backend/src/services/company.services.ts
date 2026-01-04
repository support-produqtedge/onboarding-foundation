import { Company, User } from "../db";

class CompanyService {
  private readonly company = Company;
  private readonly user = User;

  public async createCompany(userId: string, name: string, cac: string, tin: string, document?: string) {
    try {
      const user = await this.user.findByPk(userId);
      if (!user) throw new Error("User not found");
      const company = await this.company.create({
        company_name: name,
        company_owner: user.id,
        cacRegNo: cac,
        tin: tin,
        document: document
      });

      await user.update({
        companyId: company.id
      });

      return {
        userId: user.id,
        ...company
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error));
    }
  }
}

export default CompanyService;
