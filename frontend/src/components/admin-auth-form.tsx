"use client";

import { cn } from "@/lib/utilities";
import InputGroup from './ui/InputGroup';
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { loginAdmin } from "@/action";
import { boolean } from "zod";

type AdminAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function AdminAuthForm({ className, ...props }: AdminAuthFormProps) {
  const [loginData, setLoginData] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  })
  const [state, adminLoginAction, isPending] = useActionState(loginAdmin, undefined);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form action={adminLoginAction}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <InputGroup
                type="email"
                label="Email"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="Enter email"
                name="email"
                value={loginData.email}
                handleChange={handleInputChange}
              />

              <InputGroup
                type="password"
                label="Password"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter password"
                name="password"
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
    </>
  )
}
