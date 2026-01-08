import { verifySession } from "@/dal";
import { getCompanies } from "./services";
import { CompanyTable } from "@/components/company-management";

const CompanyManagementPage = async () => {
  const {token} = await verifySession();
  const companies = await getCompanies(token!);

  return (
    <div>
      <h1 className="text-xl font-semibold">Companies</h1>
      <CompanyTable companies={companies} />
    </div>
  )
}

export default CompanyManagementPage;
