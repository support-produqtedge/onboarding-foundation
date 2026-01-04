import Link from "next/link";
import { verifyEmailKey } from "./service";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{key: string}>;
}

const VerifyEmailPage = async ({ searchParams }: Props) => {
  const { key } = await searchParams;

  const verifyEmail = await verifyEmailKey(String(key)).then((res) => {

    if ("error" in res) {

      return redirect("/login");

    } else {
      return (
        <div className="relative p-6 bg-white z-1">
          <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col">
            <div className="flex flex-col justify-center flex-1 lg:w-1/2 w-full">
              <div className="w-[80%]">
                <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto">
                  <div className="w-10 h-10 mb-4 flex justify-center items-center rounded border border-slate-300">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.75016 14L12.2502 17.5L19.2502 10.5M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" stroke="#414651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mb-5 sm:mb-8 text-center">
                    <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
                      Email Verified
                    </h1>
                    <p className="text-sm text-gray-500 my-2">
                      Your email has been successfully verified.
                    </p>

                    <Link href="/login" className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50">
                      Continue
                    </Link>
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
      )
    }
  });

  return verifyEmail
}

export default VerifyEmailPage;
