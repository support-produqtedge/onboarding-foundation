import { FC, ReactNode } from "react";

interface AdminAuthLayoutProps {
  children: ReactNode;
}

const AdminAuthLayout: FC<AdminAuthLayoutProps> = async ({ children }) => {
  return <div className="grid min-h-screen grid-cols-2">{children}</div>
}

export default AdminAuthLayout;
