import { cn } from "@/lib/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvoiceTableData } from "./data";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";

interface AuditLogsProps {
  logs: {
    name: string;
    action: string;
    description: string;
    createdAt: string;
  }[]
}

export async function AuditTable({ logs }: AuditLogsProps) {

  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1">
        <div className="w-full flex justify-between items-center pb-7">
          <div>
            <input placeholder="Search" className="border" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] [&>th]:py-4 [&>th]:text-base [&>th]:text-dark ">
              <TableHead className="min-w-[155px] xl:pl-7.5">Date and Time</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="min-w-[155px] xl:pl-7.5">Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              logs.map((item, index) => (
                <TableRow key={index} className="border-[#eee]">
                  <TableCell>
                    <p className="text-dark">
                      {dayjs(item.createdAt).format("MMM DD, YYYY h:mm A")}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-dark">{item.name}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-dark">{item.action}</p>
                  </TableCell>
                  <TableCell className="min-w-[155px] xl:pl-7.5">
                    <p className="text-dark">
                      {item.description}
                    </p>
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
