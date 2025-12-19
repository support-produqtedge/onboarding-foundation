"use client";

import { InfoModal } from "@/components/ui/modal";
import { useEffect, useState } from "react";

interface ViewRoleProps {
  token: string;
  id: string;
  onClose: () => void;
}

export const ViewRole = ({id, token, onClose}: ViewRoleProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [role, setRole] = useState<{name: string, description: string; id: string; createdAt: Date, updatedAt: Date}>()
  useEffect(() => {
    setIsMounted(true)
  }, []);

  useEffect(() => {
    let ignore = false;
    async function fetchRole() {
      const response = await fetch(`/api/admin/superadmin/roles/${id}`, {
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
        setRole(res);
      })
    }

    return () => {
      ignore = true;
    }
  }, [isMounted])

  return (
    <InfoModal
      title="Role Details"
      onModalClose={() => onClose()}
      actionName="Close"
      action={() => onClose()}
    >
      <div>
        <h1>Role Name</h1>
        <h5>{role?.name}</h5>
      </div>
      <div>
        <h1>Description</h1>
        <h5>{role?.description}</h5>
      </div>
    </InfoModal>
  )
}
