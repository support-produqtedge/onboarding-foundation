import { RoleTable } from "@/components/user-management/role-table";
import { verifySession } from "@/dal";
import { getRolesByCompany } from "./services";
import { getSignedUser } from "../services";

const RoleManagementPage = async () => {
  const { token, companyId, role, id } = await verifySession();
  const roles = await getRolesByCompany(token!, companyId!);
  let userLogged = await getSignedUser(String(token), String(id));

  return (
    <div>
      <h1 className="text-xl font-semibold">Role</h1>
      <RoleTable roles={roles} token={String(token)} companyId={String(companyId)} userPermission={userLogged ? { permissions: userLogged.permissions } : { permissions: { user_management: { view: true, write: true, statusChange: true }, role_management: { view: true, write: true, statusChange: true } } }}/>
    </div>
  )
}

export default RoleManagementPage;
