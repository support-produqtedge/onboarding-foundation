import { RegisterTypeForm } from "@/components/auth/registerTypeForm";
import Link from "next/link";

const RegisterTypePage = () => {
  return (
    <>
      {/* <div>
        <div>
          <Link href="/register-user" className="">Single User</Link>
        </div>
        <div>
          <Link href="/register">Company</Link>
        </div>
      </div> */}
      <div className="relative p-6 bg-white z-1">
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col">
          <div className="flex flex-col justify-center flex-1 lg:w-1/2 w-full">
            <div className="w-[80%]">
              <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                  <div className="mb-5 sm:mb-8">
                    <h1 className="mb-2 font-semibold text-gray-800 text-3xl">
                      Welcome to Produqtedge
                    </h1>
                    <p className="text-sm text-gray-500 my-2">
                      Let's get you set up. First, Please choose the account type that best fits your needs.
                    </p>
                    <RegisterTypeForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-full bg-gray-300 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              <div className="flex flex-col items-center max-w-xs">
                <p className="text-center text-gray-400">Onboarding Foundation Project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterTypePage;
