"use client";

import { InfoModal } from "@/components/ui/modal"
import toast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserToggleStatusProps {
  onClose: () => void;
  status: string;
  id: string;
  token: string;
}

const toggleStatus = async (token: string, id: string) => {
  try {
    const response = await fetch(`/api/users/activestatus/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return await response.json();

  } catch (error) {
    throw new Error(String(error))
  }
}

const UserToggleStatusModal = ({onClose, status, id, token}: UserToggleStatusProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);

    toggleStatus(token, id).then((res) => {
      if ("error" in res) {
        toast({
          message: res.error,
          type: 'error'
        });
        setIsLoading(false);
        onClose();
      } else {
        toast({
          message: `${status ? "User deactivated" : "User activated"}`,
          type: "success"
        });
        setIsLoading(false);
        onClose();
        router.refresh();
      }
    })
  }

  return (
    <>
      <InfoModal
        title=""
        onModalClose={() => onClose()}
        action={() => {onSubmit()}}
        actionName={status ? "Deactivate" : "Activate"}
        isLoading={isLoading}
      >
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-5">
          {status ? "Deactivate User" : "Activate User"}
        </h1>
        <p className="text-sm mt-1">
          Are you sure you want to {status ? "deactivate" : "activate"} this
          user?
        </p>
      </div>
        </div>
      </InfoModal>
    </>
  )
}

export default UserToggleStatusModal;
