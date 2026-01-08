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

  public async getCompanies() {
    try {
      const companies = await this.company.findAll({
        attributes: [
          "id",
          "company_name",
          "company_owner",
        ]
      });
      const users = await this.user.findAll();
      const mapUsers = users.map((u) => {
        return {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          companyId: u.companyId
        }
      });

      const result = companies.map((c) => {
        let user = {};
        mapUsers.forEach(u => {
          if (u.companyId === c.id) {
            user = u;
          }
          return user;
        })

        return {
          id: c.id,
          company_name: c.company_name,
          company_owner: user
        }
      })
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async getCompany(id: string) {
    try {
      const company = await this.company.findByPk(id, {attributes: [
        "id",
        "company_name",
        "company_owner",
        "createdAt",
        "updatedAt"
      ]});

      return company;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error));
    }
  }
}

export default CompanyService;
