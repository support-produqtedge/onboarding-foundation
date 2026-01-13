import RegisterForm from "@/components/auth/registerForm";
import Image from "next/image";


const RegisterPage = () => {
  return (
    <div className="relative p-6 z-1">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col">
        <div className="lg:w-1/2 w-full">
          <div className="pb-5 w-[173.15px]">
            <Image
              src={"/logo.png"}
              alt="produqtedge logo"
              height={28.6}
              width={173.15}
              className="w-full h-full"
            />
          </div>
          <RegisterForm />
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
  )
}

export default RegisterPage;
