import { cn } from "@/lib/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { CreateUserButton } from "./add-user-button";
import { UserMenuButton } from "./user-menu-button";

interface UserTableProps {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: {
      id: string,
      name: string,
      description: string
    },
    isEmailVerified: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date
  }[];
  token: string;
  companyId: string;
  userPermission: {
    permissions: {
      user_management: { view: boolean, write: boolean, statusChange: boolean },
      role_management: { view: boolean, write: boolean, statusChange: boolean },
    }
  }
}

export async function UserTable({ users, token, companyId, userPermission }: UserTableProps) {

  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1">
        <div className="w-full flex justify-between items-center pb-7">
          <div>
            <input
              type="text"
              className="mt-4.5 [&_input]:py-3.75 border border-slate-500 rounded-lg pl-4"
              placeholder="Search"
            />
          </div>
          {
            userPermission.permissions?.user_management.write && (<CreateUserButton token={token} companyId={companyId} />)
          }
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] [&>th]:py-4 [&>th]:text-base [&>th]:text-dark ">
              <TableHead className="min-w-38.75 xl:pl-7.5">Users</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right xl:pr-7.5"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((item, index) => (
              <TableRow key={item.id} className="border-[#eee]">
                <TableCell className="min-w-38.75 xl:pl-7.5">
                  <h5 className="text-dark">{`${item.firstName} ${item.lastName}`}</h5>
                  <p className="mt-0.75 text-body-sm font-medium">
                    {item.email}
                  </p>
                </TableCell>

                <TableCell>
                  <div>
                    {item.phone ? item.phone : "-"}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      !item.isEmailVerified && "bg-red-800",
                      item.status && "bg-[#219653]/8 text-[#219653]",
                      !item.status && "bg-[#D34053]/8 text-[#D34053]"

                    )}
                  >
                    {!item.isEmailVerified ? "Inactive" : (item.status ? "Active" : "Deactivated")}
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    {
                      item.role.name
                    }
                  </div>
                </TableCell>

                <TableCell>
                  <p className="text-dark">
                    {dayjs(item.createdAt).format("MMM DD, YYYY")}
                  </p>
                </TableCell>


                <TableCell className="xl:pr-7.5">
                  <UserMenuButton role={item.role} token={token} id={item.id} companyId={companyId} status={item.status} userPermission={userPermission} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
