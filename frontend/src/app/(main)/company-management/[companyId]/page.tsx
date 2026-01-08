import { verifySession } from "@/dal";
import { getUserByCompany } from "./services";
import { CompanyUserTable } from "@/components/company-management/user-table";

interface Props {
  params: Promise<{companyId: string}>
}

const UsersPage = async ({ params }: Props) => {
  const { companyId } = await params;
  const { token } = await verifySession();
  const users = await getUserByCompany(token!, companyId);

  return (
    <div>
      <CompanyUserTable users={users} />
    </div>
  );
}

export default UsersPage;
