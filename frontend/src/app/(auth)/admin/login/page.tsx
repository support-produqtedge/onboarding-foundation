import { AdminAuthForm } from "@/components/admin-auth-form";
import Image from "next/image";
import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-white/65 justify-center" suppressContentEditableWarning>
      <div className="px-15 py-8 bg-white rounded-[10px] shadow-2xl border border-slate-200">
        <div className="mx-auto flex w-87.5 flex-col justify-center space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="pb-5">
              <Image
                src={"/logo.png"}
                alt="produqtedge logo"
                height={28.6}
                width={173.15}
                className="w-auto h-auto"
              />
            </div>
            <h1 className="text-3xl text-black font-semibold pb-2">Log in to your account</h1>
            <p className="text-sm text-slate-500">
              Welcome back! Please enter your details.
            </p>
          </div>
          <AdminAuthForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
