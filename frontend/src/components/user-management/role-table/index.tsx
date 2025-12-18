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
import { getInvoiceTableData } from "./data";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";
import InputGroup from "@/components/ui/InputGroup";
import { CreateRoleButton } from "./create-role-button";

interface RoleTableProps {
  roles: {
  id: string;
  name: string;
  description: string;
  assignedUserIds: string[];
  createdAt: Date;
  updatedAt: Date;
}[];
token: string
}

export async function RoleTable({ roles, token }: RoleTableProps) {
  const data = await getInvoiceTableData();

  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1">
        <div className="w-full flex justify-between items-center pb-7">
          <div>
            <input placeholder="Search" className="border"/>
          </div>
          <CreateRoleButton token={token} />
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
                  <div className="flex items-center justify-end gap-x-3.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99996 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 9.99992C10.8333 9.53968 10.4602 9.16659 9.99996 9.16659C9.53972 9.16659 9.16663 9.53968 9.16663 9.99992C9.16663 10.4602 9.53972 10.8333 9.99996 10.8333Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.99996 4.99992C10.4602 4.99992 10.8333 4.62682 10.8333 4.16659C10.8333 3.70635 10.4602 3.33325 9.99996 3.33325C9.53972 3.33325 9.16663 3.70635 9.16663 4.16659C9.16663 4.62682 9.53972 4.99992 9.99996 4.99992Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.99996 16.6666C10.4602 16.6666 10.8333 16.2935 10.8333 15.8333C10.8333 15.373 10.4602 14.9999 9.99996 14.9999C9.53972 14.9999 9.16663 15.373 9.16663 15.8333C9.16663 16.2935 9.53972 16.6666 9.99996 16.6666Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
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
