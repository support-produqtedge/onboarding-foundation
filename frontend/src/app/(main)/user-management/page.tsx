import { OverviewCardsGroup } from "@/components/user-management/overview-cards";
import { UserTable } from "@/components/user-management/user-table";
import { verifySession } from "@/dal";
import { getRoles, getRolesByCompany, getUser, getUserByCompany } from "./services";

const UserManagementPage = async () => {
  const {token, companyId} = await verifySession();
  const users = await getUserByCompany(token!);
  const roles = await getRolesByCompany(token!, String(companyId));
  const noOfRoles = roles.length;
  const noOfUsers = users.length;
  const noOfActiveUsers = users.filter(user => user.status).length

  return (
    <div>
      <OverviewCardsGroup noOfUsers={noOfUsers} noOfActiveUser={noOfActiveUsers} noOfRoles={noOfRoles} />
      <div className="mt-10">
        <h1 className="text-xl font-semibold">Users</h1>
        <UserTable users={users} token={String(token)} companyId={String(companyId)} />
      </div>
    </div>
  )
}

export default UserManagementPage;
