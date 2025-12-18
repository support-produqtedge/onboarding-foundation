import { Sidebar } from "@/components/sidebar/sidebar";
import { verifySession } from "@/dal";
import { redirect } from "next/navigation";
import { ReactNode, FC } from "react";
import { Providers } from "../providers";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const session = await verifySession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <Providers>
      <NextTopLoader color="#F68E1E" showSpinner={false} />
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full bg-gray-2">
          <Header />
          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  )
}

export default MainLayout;
