"use client";

import { useState } from "react";

interface ProfileFormProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: {
      name: string;
      description: string;
    },
    company: {
      id: string;
      company_name: string;
    }
  }
}

interface User {
  firstName: string;
  lastName: string;
  phone: string;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [userCred, setUserCred] = useState<User>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || ""
  })
  return (
    <>
      <div className="mt-15 w-full">
        <div className="w-[70%]">
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">First name:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full" defaultValue={userCred.firstName} />
          </div>
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">Last name:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full" defaultValue={userCred.lastName} />
          </div>
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">Email:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40" defaultValue={user.email} disabled />
          </div>
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">Phone:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full" defaultValue={userCred.phone} />
          </div>
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">Role:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled: opacity-40" defaultValue={user.role.name} disabled />
          </div>
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">Company:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full" defaultValue={user.company.company_name} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileForm;
