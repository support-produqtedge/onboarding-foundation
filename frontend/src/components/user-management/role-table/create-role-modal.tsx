import InputGroup from "@/components/ui/InputGroup";
import { InfoModal } from "@/components/ui/modal"
import { TextAreaGroup } from "@/components/ui/text-area";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from 'react';

interface CreateRoleProps {
  onClose: () => void;
  token: string;
  edit?: boolean;
  id?: string;
}

const addRole = async(token: string, request: {name: string, description: string}) => {
  try {
    const response = await fetch("/api/admin/superadmin/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });

    return await response.json()
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const editRole = async(token: string, id: string, request: {name: string, description: string}) => {
  try {
    const response = await fetch(`/api/admin/superadmin/roles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });

    return await response.json()
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export const CreateRoleModal = ({ onClose, token, edit, id }: CreateRoleProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [role, setRole] = useState<{name: string, description: string}>({
    name: "",
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const [roleCred, setRoleCred] = useState<{name: string, description: string}>({
    name: role.name || '',
    description: role.description || ''
  });

  useEffect(() => {
    setIsMounted(true)
  }, []);

  useEffect(() => {
    let ignore = false;
    if (edit) {
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
          console.log(res);
          setRole(res);
        })
      }
    }

    return () => {
      ignore = true;
    }
  }, [isMounted])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRoleCred({
      ...roleCred,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = () => {
    setIsLoading(true);

    if (!edit) {
      addRole(token, roleCred).then(res => {
        if ("error" in res) {
          console.log(res.error);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          onClose();
          router.refresh()
        }
      })
    } else {
      editRole(token, String(id), roleCred).then(res => {
        if ("error" in res) {
          console.log(res.error);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          onClose();
          router.refresh()
        }
      })
    }

  }

  return (
    <InfoModal
      title="Create Role"
      onModalClose={() => onClose()}
      actionName="Create Role"
      action={() => onSubmit()}
      isLoading={isLoading}
    >
      <form>
        <InputGroup
          label="Role"
          type="text"
          placeholder="Enter role"
          className="mb-4.5 [&_input]:py-3.75"
          name="name"
          handleChange={handleInputChange}
          defaultValue={edit ? role.name : roleCred.name}
        />
        <TextAreaGroup
          label="Description"
          name="description"
          placeholder="Enter Description"
          handleChange={handleInputChange}
          defaultValue={edit ? role.description : roleCred.description}
        />
      </form>
    </InfoModal>
  )
}
