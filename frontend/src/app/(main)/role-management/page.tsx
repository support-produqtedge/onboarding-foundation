import { RoleTable } from "@/components/user-management/role-table";
import { verifySession } from "@/dal";
import { getRoles } from "./services";

const RoleManagementPage = async () => {
  const { token } = await verifySession();
  const roles = await getRoles(token!);

  return (
    <div>
      <h1 className="text-xl font-semibold">Role</h1>
      <RoleTable roles={roles} token={String(token)} />
    </div>
  )
}

export default RoleManagementPage;
