"use client";

import { ChangeEvent, useActionState, useState } from "react";
import InputGroup from "../ui/InputGroup";
import { loginUser } from "@/action";

type SignInFormProps = React.HTMLAttributes<HTMLDivElement>;

const SignInForm = ({ className, ...props}: SignInFormProps) => {
  const [loginData, setLoginData] = useState<{email: string; password: string}>({
    email: '',
    password: ''
  });

  const [state, userLoginAction, isPending] = useActionState(loginUser, undefined);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className="w-[80%]">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
              Log In
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back! Please enter your details
            </p>
          </div>
        </div>

        <form action={userLoginAction}>
          <div className="space-y-6">
            <div>
              <InputGroup
              label="Email"
              name="email"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter email"
              type="text"
              value={loginData.email}
              handleChange={handleInputChange}
              />
              <InputGroup
                label="Password"
                name="password"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter Password"
                type="password"
                value={loginData.password}
                handleChange={handleInputChange}
              />
            </div>
            {state && <p className="text-red-600 text-sm text-center -mt-2">Invalid Login Credentials</p>}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"
              disabled={isPending}
            >
              <span className="inline-block pr-2">
                Sign in
              </span>
              {isPending && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInForm;
