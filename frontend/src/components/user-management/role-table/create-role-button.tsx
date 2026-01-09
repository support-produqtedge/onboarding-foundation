"use client";

import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateRoleModal } from "./create-role-modal";

interface CreateRoleModalProps {
  token: string;
  companyId: string
}

export const CreateRoleButton = ({ token, companyId }: CreateRoleModalProps) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <CreateRoleModal token={token} companyId={companyId} onClose={() => setModal(false)} />}
      <Button
        label="Create Role"
        variant="dark"
        size="small"
        shape="rounded"
        icon={<PlusIcon />}
        onClick={() => {
          setModal(true);
        }}
      />
    </>
  )
}
