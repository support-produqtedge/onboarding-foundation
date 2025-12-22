import { ChevronUpIcon } from "@/components/icons";
import InputGroup from "@/components/ui/InputGroup";
import { InfoModal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useId } from 'react';

interface CreateUserProps {
  onClose: () => void;
  token: string;
}

interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  status: boolean;
}

const addUser = async (token: string, request: UserRequest) => {
  const response = await fetch("/api/admin/superadmin/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  return await response.json();
}


export const CreateUserModal = ({ onClose, token }: CreateUserProps) => {
  const [userCred, setUserCred] = useState<{ firstName: string; lastName: string; email: string; roleId: string; status: string }>({
    firstName: '',
    lastName: '',
    email: '',
    roleId: '',
    status: "Inactive"
  });
  const [roles, setRoles] = useState<{ name: string, id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let ignore = false;
    async function fetchRoles() {
      const response = await fetch("/api/admin/superadmin/roles", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data);
      setRoles(data);
    }

    fetchRoles();

    return () => {
      ignore = true;
    }
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserCred({
      ...userCred,
      [event.target.name]: event.target.value
    });
  }

  const onSubmit = () => {
    setIsLoading(true);
    const userCredentials = {
      firstName: userCred.firstName,
      lastName: userCred.lastName,
      email: userCred.email,
      roleId: userCred.roleId,
      status: userCred.status === "active" ? true : false
    }

    addUser(token, userCredentials).then(res => {
      if ("error" in res) {
        console.log(res.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onClose();
        router.refresh();
      }
    })
  }
  return (
    <InfoModal
      title="Create User"
      onModalClose={() => onClose()}
      actionName="Create user"
      action={() => onSubmit()}
      isLoading={isLoading}
    >
      <form>
        <InputGroup
          label="First Name"
          type="text"
          placeholder="Enter first name"
          className="mb-4.5 [&_input]:py-1.75"
          name="firstName"
          handleChange={handleInputChange}
        />
        <InputGroup
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          className="mb-4.5 [&_input]:py-1.75"
          name="lastName"
          handleChange={handleInputChange}
        />
        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter email"
          className="mb-4.5 [&_input]:py-1.75"
          name="email"
          handleChange={handleInputChange}
        />
        <div className="mb-4.5">
          <label
            htmlFor="roleId"
            className="block text-body-sm font-medium text-dark"
          >
            Role
          </label>
          <div className="relative">
            <select name="roleId" onChange={handleInputChange} defaultValue={userCred.roleId} className="w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-1 outline-none transition focus:border-primary active:border-primary [&>option]:text-dark-5">
              <option value="" disabled hidden>
                Select Role
              </option>
              {
                roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))
              }
            </select>
            <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
          </div>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-body-sm font-medium text-dark"
          >
            Status
          </label>
          <div className="relative">
            <select name="status" onChange={handleInputChange} defaultValue={userCred.status} className="w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-1 outline-none transition focus:border-primary active:border-primary [&>option]:text-dark-5">
              <option value="" disabled hidden>
                Select Status
              </option>
              <option value="active">
                Active
              </option>
              <option value="Inactive">
                Inactive
              </option>
            </select>
            <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
          </div>
        </div>
      </form>
    </InfoModal>
  )
}
