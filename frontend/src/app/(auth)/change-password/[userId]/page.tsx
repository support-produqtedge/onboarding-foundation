import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import Image from "next/image";
import { verifyEmail } from './services';
import { redirect } from "next/navigation";
import toast from "@/components/ui/toast";

interface Props {
  params: Promise<{userId: string}>;
  searchParams: Promise<{key: string}>;
}

const ChangePasswordPage = async ({searchParams, params}: Props) => {
  const {key} = await searchParams;
  const { userId } = await params;

  const verified = await verifyEmail(String(key)).then((res) => {
    if ("error" in res) {
      return redirect("/login")
    } else {
      return (
        <>
      <div className="relative p-6 bg-white z-1">
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col">
          <div className="flex flex-col items-center justify-center flex-1 lg:w-1/2 w-full border-r">
            <div className="pb-5">
              <Image
                src={"/logo.png"}
                alt="produqtedge logo"
                height={28.6}
                width={173.15}
                className="w-auto h-auto"
              />
            </div>
            <ChangePasswordForm id={String(userId)} />
          </div>
          <div className="lg:w-1/2 w-full h-full bg-brand-950 lg:grid items-center hidden">
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
  });

  return verified
}

export default ChangePasswordPage;
