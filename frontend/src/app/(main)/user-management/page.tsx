import { OverviewCardsGroup } from "@/components/user-management/overview-cards";
import { UserTable } from "@/components/user-management/user-table";
import { verifySession } from "@/dal";
import { getRoles, getUser } from "./services";

const UserManagementPage = async () => {
  const {token} = await verifySession();
  const users = await getUser(token!);
  const roles = await getRoles(token!);

  const noOfRoles = roles.length;
  const noOfUsers = users.length;
  const noOfActiveUsers = users.map(user => user.status).length

  return (
    <div>
      <OverviewCardsGroup noOfUsers={noOfUsers} noOfActiveUser={noOfActiveUsers} noOfRoles={noOfRoles} />
      <div className="mt-10">
        <h1 className="text-xl font-semibold">Users</h1>
        <UserTable users={users} />
      </div>
    </div>
  )
}

export default UserManagementPage;
