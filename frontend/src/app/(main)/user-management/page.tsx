import { OverviewCardsGroup } from "@/components/user-management/overview-cards";
import { UserTable } from "@/components/user-management/user-table";
import { verifySession } from "@/dal";
import { getRoles, getRolesByCompany, getUser, getUserByCompany } from "./services";
import { getSignedUser } from "../services";

const UserManagementPage = async () => {
  const {token, companyId, id} = await verifySession();
  const users = await getUserByCompany(token!);
  const roles = await getRolesByCompany(token!, String(companyId));
  const noOfRoles = roles.length;
  const noOfUsers = users.length;
  const noOfActiveUsers = users.filter(user => user.status).length;
  const userLogged = await getSignedUser(String(token), String(id));

  return (
    <div>
      <OverviewCardsGroup noOfUsers={noOfUsers} noOfActiveUser={noOfActiveUsers} noOfRoles={noOfRoles} />
      <div className="mt-10">
        <h1 className="text-xl font-semibold">Users</h1>
        <UserTable users={users} token={String(token)} companyId={String(companyId)} userPermission={userLogged ? { permissions: userLogged.permissions } : { permissions: { user_management: { view: true, write: true, statusChange: true }, role_management: { view: true, write: true, statusChange: true } } }} />
      </div>
    </div>
  )
}

export default UserManagementPage;
