"use client";
import { ChangeEvent, useState } from "react";
import InputGroup from "../ui/InputGroup";
import toast from "../ui/toast";
import { useRouter } from "next/navigation";


const forgotPassword = async (email: string) => {
  const response = await fetch(`/api/auth/reset-password`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email})
  });
  return await response.json();
}

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const submitForgotPassword = () => {
    setIsLoading(true);

    forgotPassword(email).then(res => {
      if ("error" in res) {
        toast({
          title: "Reset Password",
          message: res.error,
          type: "error"
        });
        setIsLoading(false);
      } else {
        router.push("/check-email");
      }
    })
  }

  return (
    <>
      <div className="w-[80%]">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
                Forgot Password
              </h1>
              <p>Enter your email to retrieve your password</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <InputGroup
                label="Email"
                placeholder="Enter Email"
                className="mb-5 [&_input]:py-3.75"
                type="email"
                handleChange={handleInputChange}
              />
            </div>
            <button
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-3.75 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"
              onClick={(e) => {
                e.preventDefault();
                submitForgotPassword();
              }}
              disabled={isLoading}
            >
              <span className="inline-block pr-2">Submit</span>
              {isLoading && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordForm;
