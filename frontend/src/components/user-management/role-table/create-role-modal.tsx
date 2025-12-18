import InputGroup from "@/components/ui/InputGroup";
import { InfoModal } from "@/components/ui/modal"
import { TextAreaGroup } from "@/components/ui/text-area";
import { useState, ChangeEvent } from 'react';

interface CreateRoleProps {
  onClose: () => void;
  token: string;
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

export const CreateRoleModal = ({ onClose, token }: CreateRoleProps) => {
  const [roleCred, setRoleCred] = useState<{name: string, description: string}>({
    name: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRoleCred({
      ...roleCred,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = () => {
    setIsLoading(true);

    addRole(token, roleCred).then(res => {
      if ("error" in res) {
        console.log(res.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onClose();
      }
    })
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
        />
        <TextAreaGroup
          label="Description"
          name="description"
          placeholder="Enter Description"
          handleChange={handleInputChange}
        />
      </form>
    </InfoModal>
  )
}
