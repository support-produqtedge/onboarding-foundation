"use client";

import { InfoModal } from "@/components/ui/modal";
import { useEffect, useState } from "react";

interface ViewUserProps {
  token: string;
  id: string;
  onClose: () => void;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date
}

export const ViewUser = ({id, token, onClose}: ViewUserProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setIsMounted(true)
  }, []);

  useEffect(() => {
    let ignore = false;
    async function fetchRole() {
      const response = await fetch(`/api/admin/superadmin/users/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return await response.json();
    }
    if (!ignore) {
      fetchRole().then(res => {
        console.log(res);
        setUser(res);
      })
    }

    return () => {
      ignore = true;
    }
  }, [isMounted])

  return (
    <InfoModal
      title="User Details"
      onModalClose={() => onClose()}
      actionName="Close"
      action={() => onClose()}
    >
      <div>
        <h1 className="font-semibold">First Name: </h1>
        <h5>{user?.firstName}</h5>
      </div>
      <div className="font-semibold">
        <h1 className="font-semibold">Last Name: </h1>
        <h5>{user?.lastName}</h5>
      </div>
      <div>
        <h1 className="font-semibold">Email: </h1>
        <h5>{user?.email}</h5>
      </div>
      <div>
        <h1 className="font-semibold">Role: </h1>
        <h5>{user?.roleId}</h5>
      </div>
      <div>
        <h1 className="font-semibold">Status: </h1>
        <h5>{user?.status ? "Active" : "Inactive"}</h5>
      </div>
    </InfoModal>
  )
}
