"use client";

import Link from "next/link";
import InputGroup from "../ui/InputGroup";
import { ChangeEvent, useActionState, useState } from "react";
import { registerCompany } from "@/action";
import toast from "../ui/toast";

type RegisterCompanyProps = React.HTMLAttributes<HTMLDivElement>;

interface MonoCac {
  status: string;
  message: string;
  timestamp: string;
  data: {
    rc_number: string;
    approved_name: string;
  }
}

const fetchCac = async (cac: string) => {
  const response = await fetch("/api/verify-cac", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({cac})
  })
  const data = await response.json();
  return data;
}

const RegisterCompanyForm = ({ className, ...props }: RegisterCompanyProps) => {
  const [registerCred, setRegisterCred] = useState<{name: string; cac: string; tin: string}>({
    name: "",
    cac: "",
    tin: ''
  });
  const [state, registerCompanyAction, isPending] = useActionState(registerCompany, undefined);
  const [validateCac, setValidateCac] = useState<MonoCac>({
    status: "",
    message: "",
    timestamp: "",
    data: {
      rc_number: "",
      approved_name: ""
    }
  });
  const [loadingCacData, setLoadingCacData] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterCred({
      ...registerCred,
      [e.target.name]: e.target.value
    })
  }

  const validateKyc = (e: ChangeEvent<HTMLInputElement>) => {
      setLoadingCacData(true);
      fetchCac(registerCred.cac).then(res => {
        if ("error" in res) {
          toast({
            title: "Error",
            message: "error validating cac, try again",
            type: "error"
          })
        } else {
          setValidateCac({
            status: res.status,
            message: res.message,
            timestamp: res.timestamp,
            data: {
              rc_number: res.data[0].rc_number,
              approved_name: res.data[0].approved_name
            }
          });
          setLoadingCacData(false);
        }
      })
  }

  return (
    <div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
              Let's customise your platform
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Tailor Your Experience: Set Up Your Organization Seamlessly
            </p>
          </div>
        </div>
        <div className="flex w-full gap-1">
          <div className="bg-black h-1 w-1/2 rounded-2xl"></div>
          <div className="bg-black h-1 w-1/2 rounded-2xl"></div>
        </div>

        <form action={registerCompanyAction}>
          <div className="space-y-6">
            <div>
              <InputGroup
              label="Enter company name"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter company"
              type="text"
              name="name"
              handleChange={handleInputChange}
              />
              <div className="flex flex-col mb-5 [&_input]:py-[15px]">
                <InputGroup
                label="CAC"
                className=""
                placeholder="Enter CAC"
                type="text"
                name="cac"
                handleChange={handleInputChange}
                handleBlur={validateKyc}
                />
                <div>
                  {
                    loadingCacData ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent dark:border-primary dark:border-t-transparent" />
                    ) : validateCac.data.approved_name
                  }
                </div>
              </div>
              <InputGroup
              label="TIN"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter TIN"
              type="text"
              name="tin"
              handleChange={handleInputChange}
              />
            </div>
            {state && <p className="text-red-600 text-sm text-center -mt-2">Invalid Login Credentials</p>}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"
              disabled={isPending}
            >
              <span className="inline-block pr-2">Submit</span>
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

export default RegisterCompanyForm;
