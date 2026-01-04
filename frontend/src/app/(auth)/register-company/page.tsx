import RegisterCompanyForm from "@/components/auth/registerCompanyForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterCompanyPage = async () => {
  const cookieStore = (await cookies()).get("user");
  const user = cookieStore?.value;

  if (!user) {
    redirect("/login");
  }

  return (
      <div className="relative p-6 bg-white z-1">
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col">
          <div className="lg:w-1/2 w-full h-full bg-gray-300 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              <div className="flex flex-col items-center max-w-xs">
                <p className="text-center text-gray-400">Onboarding Foundation Project</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 lg:w-1/2 w-full">
            <div className="pb-5">
              <RegisterCompanyForm />
            </div>
          </div>
        </div>
      </div>
    )
}

export default RegisterCompanyPage;
