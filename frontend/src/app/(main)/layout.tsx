import { verifySession } from "@/dal";
import { redirect } from "next/navigation";
import { ReactNode, FC } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<DashboardLayoutProps> = async ({children}) => {
  const session = await verifySession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div>
      User logged in
      {children}
    </div>
  )
}

export default MainLayout;
