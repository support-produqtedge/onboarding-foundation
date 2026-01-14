"use client";
import { ChangeEvent, useState } from "react";
import InputGroup from "../ui/InputGroup";
import toast from "../ui/toast";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";


interface ChangePasswordProps {
  id: string;
}

const changePassword = async (id: string, password: string) => {
  await deleteSession();
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
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateConfirmPassword = () => {
    if (passwordChange.confirmPassword && passwordChange.password !== passwordChange.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPasswordChange({
      ...passwordChange,
      [event.target.name]: event.target.value
    });

    // Validate confirm password when either field changes
    if (event.target.name === 'confirmPassword' || event.target.name === 'password') {
      setTimeout(validateConfirmPassword, 0); // Delay to allow state update
    }
  };

  const handleConfirmPasswordBlur = () => {
    validateConfirmPassword();
  };

  const submitChangePassword = () => {
    if (passwordChange.password !== passwordChange.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    changePassword(id, passwordChange.password).then(res => {
      if ("error" in res) {
        toast({
          title: "Change Password",
          message: "Something went wrong",
          type: "error"
        });
        setIsLoading(false)
      } else {
        toast({
          title: "Change Password",
          message: "Password Changed Successfully",
          type: "success"
        });
        setIsLoading(false);
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
              Reset Password
            </h1>
            <p className="text-sm text-gray-500">
              Reset New Password
            </p>
          </div>
        </div>


          <div className="space-y-6">
            <div>
              <InputGroup
              label="Password"
              name="password"
              className="mb-5 [&_input]:py-3.75"
              placeholder="Enter password"
              type="password"
              handleChange={handlePasswordChange}

              />
              <InputGroup
                label="Confirm Password"
                name="confirmPassword"
                className="mb-5 [&_input]:py-3.75"
                placeholder="Enter Password"
                type="password"
                handleChange={handlePasswordChange}
                handleBlur={handleConfirmPasswordBlur}
              />
              {confirmPasswordError && <p className="text-red-600 text-sm -mt-4 mb-2">{confirmPasswordError}</p>}
            </div>
            <button
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-3.75 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"
              onClick={(e) => {
                e.preventDefault();
                submitChangePassword();
              }}
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
