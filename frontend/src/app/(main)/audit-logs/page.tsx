import { AuditTable } from "@/components/user-management/audit-table";
import { getLogs } from "./services";
import { verifySession } from "@/dal";

const AuditLogsPage = async () => {
  const {token} = await verifySession();
  const logs = await getLogs(token!);
  return (
    <div>
      <h1 className="text-xl font-semibold">Logs</h1>
      <AuditTable logs={logs} />
    </div>
  )
}

export default AuditLogsPage;
