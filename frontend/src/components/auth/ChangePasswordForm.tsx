"use client";
import { ChangeEvent, useState } from "react";
import InputGroup from "../ui/InputGroup";
import toast from "../ui/toast";
import { redirect } from "next/navigation";


interface ChangePasswordProps {
  id: string;
}

const changePassword = async (id: string, password: string) => {
  const response = await fetch(`/api/auth/change-password/${id}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password})
  });

  return await response.json();
}

export const ChangePasswordForm = ({id}: ChangePasswordProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChange, setPasswordChange] = useState<{password: string; confirmPassword: string}>({
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState("");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPasswordChange({
      ...passwordChange,
      [event.target.name]: event.target.value
    })
  };

  const submitChangePassword = () => {
    setIsLoading(true);

    changePassword(id, passwordChange.password).then(res => {
      if ("error" in res) {
        toast({
          title: "Change Password",
          message: "Something went wrong",
          type: "error"
        })
      } else {
        toast({
          title: "Change Password",
          message: "Password Changed Successfully",
          type: "success"
        });
        redirect('/');
      }
    })
  }

  return (
    <>
      <div className="w-[80%]">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
              Set Password
            </h1>
            <p className="text-sm text-gray-500">
              Set New Password
            </p>
          </div>
        </div>


          <div className="space-y-6">
            <div>
              <InputGroup
              label="Password"
              name="password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter email"
              type="text"
              handleChange={handlePasswordChange}

              />
              <InputGroup
                label="Confirm Password"
                name="confirmPassword"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter Password"
                type="password"
                handleChange={handlePasswordChange}
              />
            </div>
            <button
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"
              onClick={(e) => {
                e.preventDefault();
                submitChangePassword();
              }}
            >
              <span className="inline-block pr-2">
                Submit
              </span>
            </button>
          </div>
      </div>
    </div>
    </>
  )
}
