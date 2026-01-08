import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface CompanyTableProps {
  companies: {
    id: string;
    company_name: string;
    company_owner: {
      id: string;
      firstName: string;
      lastName: string;
    }
  }[]
}

export async function CompanyTable({companies}: CompanyTableProps) {
  return (
      <>
        <div className="rounded-[10px] bg-white shadow-1">
          <div className="w-full flex justify-between items-center pb-7">
            <div>
              <input placeholder="Search" className="border"/>
            </div>

          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-[#F7F9FC] [&>th]:py-4 [&>th]:text-base [&>th]:text-dark ">
                <TableHead>Company</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {
                companies.map((company) => (
                  <TableRow key={company.id} className="border-[#eee]">
                    <TableCell>
                      <h5 className="text-dark font-semibold">
                        <Link href={`/company-management/${company.id}`} className="text-blue-600">
                          {company.company_name}
                        </Link>
                      </h5>
                    </TableCell>
                    <TableCell>
                      <p className="text-dark">{`${company.company_owner.firstName} ${company.company_owner.lastName}`}</p>
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
