import { Sidebar } from "@/components/sidebar/sidebar";
import { verifySession } from "@/dal";
import { redirect } from "next/navigation";
import { ReactNode, FC } from "react";
import { Providers } from "../providers";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";
import { getAdmin, getSignedUser } from "./services";

interface DashboardLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const session = await verifySession();
  let userLoggedin = session.role === "superAdmin" ? await getAdmin(String(session.token)) : await getSignedUser(String(session.token), String(session.id));

  if (!session) {
    redirect("/login");
  }

  return (
    <Providers>
      <NextTopLoader color="#F68E1E" showSpinner={false} />
      <div className="flex min-h-screen">
        <Sidebar name={`${userLoggedin.firstName} ${userLoggedin.lastName}`} email={userLoggedin.email} />

        <div className="w-full bg-gray-2">
          <Header name={`${userLoggedin.firstName} ${userLoggedin.lastName}`} />
          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  )
}

export default MainLayout;
