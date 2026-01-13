"use client";

import Link from "next/link";
import InputGroup from "../ui/InputGroup";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

export const UserRegisterForm = ({ className, ...props }: UserRegisterFormProps) => {
  const handleInputChange = () => {
    console.log("changed");
  }
  return (
    <div className="w-[80%] pb-10">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
              Create Your Account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Already have an account? {" "}
              <Link href="/login" className="font-semibold text-blue-400">Login</Link>
            </p>
          </div>
        </div>
        {/* {error && <p className="text-red-600 text-sm text-center -mt-2">{error}</p>} */}
        <form>
          <div className="space-y-6 mt-2">
            <div>
              <InputGroup
                label="First Name"
                name="firstName"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter first name"
                type="text"
                handleChange={handleInputChange}
              />
              <InputGroup
                label="Last Name"
                name="lastName"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter last name"
                type="text"
                handleChange={handleInputChange}
              />
              <InputGroup
                label="Email"
                name="email"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter email"
                type="email"
                handleChange={handleInputChange}
              />
              <InputGroup
                label="Phone"
                name="phone"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter phone number"
                type="text"
                handleChange={handleInputChange}
              />
              <InputGroup
                label="NIN"
                name="nin"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter nin"
                type="text"
                handleChange={handleInputChange}
              />
              <InputGroup
                label="Password"
                name="password"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter password"
                type="password"
                handleChange={handleInputChange}
              />
              <InputGroup
                label="Confirm Password"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Confirm password"
                type="password"
                handleChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"
              disabled={true}
            >
              <span className="inline-block pr-2">Continue</span>
              {/* {isPending && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
