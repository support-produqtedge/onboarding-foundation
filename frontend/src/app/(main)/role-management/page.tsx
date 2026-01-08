import { RoleTable } from "@/components/user-management/role-table";
import { verifySession } from "@/dal";
import { getRoles, getRolesByCompany } from "./services";
import { getAdmin, getSignedUser } from "../services";

const RoleManagementPage = async () => {
  const { token, companyId } = await verifySession();
  const roles = await getRolesByCompany(token!, companyId!);

  return (
    <div>
      <h1 className="text-xl font-semibold">Role</h1>
      <RoleTable roles={roles} token={String(token)} companyId={String(companyId)} />
    </div>
  )
}

export default RoleManagementPage;
