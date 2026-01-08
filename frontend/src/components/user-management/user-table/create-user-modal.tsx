import { ChevronUpIcon } from "@/components/icons";
import InputGroup from "@/components/ui/InputGroup";
import { InfoModal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import toast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useId } from 'react';

interface CreateUserProps {
  onClose: () => void;
  token: string;
  companyId: string;
  edit?: boolean;
  id?: string;
}

interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: string;
}

const addUser = async (token: string, request: UserRequest) => {
  const response = await fetch("/api/users", {
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

const editUser = async (token: string, id: string, request: UserRequest) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });
  return await response.json();
}


export const CreateUserModal = ({ onClose, token, companyId, edit, id }: CreateUserProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<{firstName: string; lastName: string; email: string; phone: string; role: {id: string; name: string}}>()
  const [userCred, setUserCred] = useState<{ firstName: string; lastName: string; email: string; phone: string, roleId: string;}>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    roleId: user?.role.id || '',
  });
  const [roles, setRoles] = useState<{ name: string, id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    let ignore = false;
    async function fetchRoles() {
      const response = await fetch(`/api/admin/superadmin/roles/rolebycompany/${companyId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setRoles(data);
    }

    async function fetchUser() {
      const response = await fetch(`/api/users/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return await response.json();
    }
    if (!ignore) {
      fetchRoles();
      if (edit) {
        fetchUser().then(res => {
          console.log(res);
          setUser({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phone: res.phone,
            role: {
              id: res.role.id,
              name: res.role.name
            }
          });

          setUserCred({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phone: res.phone,
            roleId: res.role.id
          })
        })
      }
    }

    return () => {
      ignore = true;
    }
  }, [isMounted])

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
      phone: userCred.phone,
      roleId: userCred.roleId,
    }

    // console.log(userCredentials);

    if(!edit) {
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
    } else {
      editUser(token, String(id), userCredentials).then(res => {
        if ("error" in res) {
          setIsLoading(false);
          toast({
            message: res.error,
            type: "error"
          })
        } else {
          toast({
            message: "User updated",
            type: "success"
          });
          setIsLoading(false);
          onClose();
          router.refresh();
        }
      })
    }
  }
  return (
    <InfoModal
      title="Create User"
      onModalClose={() => onClose()}
      actionName={edit ? "Edit User" : "Create User"}
      action={() => onSubmit()}
      isLoading={isLoading}
    >
      <form>
        <InputGroup
          label="First Name"
          type="text"
          placeholder="Enter first name"
          className="mb-4.5 [&_input]:py-3.75"
          name="firstName"
          handleChange={handleInputChange}
          defaultValue={edit ? user?.firstName : userCred.firstName}
          value={userCred.firstName}
        />
        <InputGroup
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          className="mb-4.5 [&_input]:py-3.75"
          name="lastName"
          handleChange={handleInputChange}
          defaultValue={edit ? user?.lastName : userCred.lastName}
        />
        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter email"
          className="mb-4.5 [&_input]:py-3.75 disabled:opacity-30"
          name="email"
          handleChange={handleInputChange}
          defaultValue={edit ?user?.email : userCred.email}
          disabled={edit}
        />
        <InputGroup
          label="Phone"
          type="text"
          placeholder="Enter phone"
          className="mb-4.5 [&_input]:py-3.75"
          name="phone"
          handleChange={handleInputChange}
          defaultValue={edit ? user?.phone : userCred.phone}
        />
        <div className="mb-4.5">
          <label
            htmlFor="roleId"
            className="block text-body-sm font-medium text-dark"
          >
            Role
          </label>
          <div className="relative">
            <select name="roleId" onChange={handleInputChange} defaultValue={edit ? user?.role.id : userCred.roleId} className="w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3.75 outline-none transition focus:border-primary active:border-primary [&>option]:text-dark-5">
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

        {/* <div>
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
        </div> */}
      </form>
    </InfoModal>
  )
}
