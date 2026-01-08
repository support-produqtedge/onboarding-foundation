import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utilities";
import dayjs from "dayjs";

interface CompanyUserTableProps {
  users: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    id: string,
    name: string,
    description: string
  }
  status: string;
  createdAt: Date;
  updatedAt: Date
}[];
}

export async function CompanyUserTable({ users }: CompanyUserTableProps) {
  return (
      <>
        <div className="rounded-[10px] bg-white shadow-1">
          {/* <div className="w-full flex justify-between items-center pb-7">
            <div>
              <input placeholder="Search" className="border"/>
            </div>
            <CreateUserButton token={token} companyId={companyId} />
          </div> */}
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-[#F7F9FC] [&>th]:py-4 [&>th]:text-base [&>th]:text-dark ">
                <TableHead className="min-w-38.75 xl:pl-7.5">Users</TableHead>
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
                    <div
                      className={cn(
                        "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                        item.status && "bg-[#219653]/8 text-[#219653]",
                        !item.status && "bg-[#D34053]/8 text-[#D34053]"

                      )}
                    >
                      {item.status ? "Active" : "Inactive"}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
}
