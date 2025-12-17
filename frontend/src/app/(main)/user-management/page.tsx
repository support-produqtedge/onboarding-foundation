import { OverviewCardsGroup } from "@/components/user-management/overview-cards";
import { UserTable } from "@/components/user-management/user-table";

const UserManagementPage = () => {
  return (
    <div>
      <OverviewCardsGroup />
      <div className="mt-10">
        <h1 className="text-xl font-semibold">Users</h1>
        <UserTable />
      </div>
    </div>
  )
}

export default UserManagementPage;
