"use client";

import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateUserModal } from "./create-user-modal";

interface CreateUserModalProps {
  token: string;
  companyId: string;
}

export const CreateUserButton = ({ token, companyId }: CreateUserModalProps) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <CreateUserModal token={token} companyId={companyId} onClose={() => setModal(false)} />}
      <Button
        label="Create User"
        variant="dark"
        size="small"
        shape="rounded"
        icon={<PlusIcon />}
        onClick={() => {
          setModal(true);
        }}
      />
    </>
  );
}
