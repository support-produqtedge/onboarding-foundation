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
import { CreateRoleButton } from "./create-role-button";
import { RoleMenuButton } from "./role-menu-button";

interface RoleTableProps {
  roles: {
  id: string;
  name: string;
  description: string;
  assignedUserIds: string[];
  createdAt: Date;
  updatedAt: Date;
}[];
token: string;
companyId: string;
userPermission: {
  permissions: {
    user_management: {view: boolean, write: boolean, statusChange: boolean},
    role_management: {view: boolean, write: boolean, statusChange: boolean},
  }
}
}

export async function RoleTable({ roles, token, companyId, userPermission }: RoleTableProps) {

  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1">
        <div className="w-full flex justify-between items-center pb-7">
          <div>
            <input placeholder="Search" className="border"/>
          </div>
          {
            userPermission.permissions.role_management.write && (<CreateRoleButton token={token} companyId={companyId} />)
          }
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] [&>th]:py-4 [&>th]:text-base [&>th]:text-dark ">
              <TableHead>Role</TableHead>
              <TableHead className="min-w-38.75 xl:pl-7.5">Description</TableHead>
              <TableHead>Assigned Users</TableHead>
              <TableHead>Created Role</TableHead>
              <TableHead className="text-right xl:pr-7.5"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              roles.map((item, index) => (
                <TableRow key={item.id} className="border-[#eee]">
                  <TableCell>
                    <h5 className="text-dark font-semibold">{item.name}</h5>
                  </TableCell>
                  <TableCell className="min-w-38.75 xl:pl-7.5">
                    <p className="text-dark">{item.description}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-dark">{item.assignedUserIds.length}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-dark">
                      {dayjs(item.createdAt).format("MMM DD, YYYY h:mm A")}
                    </p>
                  </TableCell>
                  <TableCell className="xl:pr-7.5">
                    <RoleMenuButton companyId={companyId} id={item.id} token={token} userPermission={userPermission} />
                </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </>
  );
}
