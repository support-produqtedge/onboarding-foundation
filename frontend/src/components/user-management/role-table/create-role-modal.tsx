import { Checkbox } from "@/components/ui/checkbox";
import InputGroup from "@/components/ui/InputGroup";
import { InfoModal } from "@/components/ui/modal"
import { TextAreaGroup } from "@/components/ui/text-area";
import toast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from 'react';

interface CreateRoleProps {
  onClose: () => void;
  token: string;
  edit?: boolean;
  id?: string;
  companyId: string;
}

const addRole = async(token: string, request: {name: string, companyId: string; description: string}) => {
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

const editRole = async(token: string, id: string, request: {name: string, companyId: string, description: string}) => {
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

export const CreateRoleModal = ({ onClose, token, edit, id, companyId }: CreateRoleProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [role, setRole] = useState<{name: string, description: string}>({
    name: "",
    description: '',
  });
  const [userMgtPermissions, setUserMgtPermissions] = useState<{view: boolean; write: boolean; status: boolean}>({
    view: false,
    write: false,
    status: false
  });
  const [roleMgtPermissions, setRoleMgtPermissions] = useState<{view: boolean; write: boolean; status: boolean}>({
    view: false,
    write: false,
    status: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const [roleCred, setRoleCred] = useState<{name: string, companyId: string, description: string;}>({
    name: role.name || '',
    description: role.description || '',
    companyId,
  });

  useEffect(() => {
    setIsMounted(true)
  }, []);

  useEffect(() => {
    let ignore = false;
    console.log(companyId);
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
    const roleCredentials = {
      name: roleCred.name,
      description: roleCred.description,
      companyId,
      userMgt: userMgtPermissions,
      roleMgt: roleMgtPermissions
    }

    setIsLoading(true);

    if (!edit) {
      addRole(token, roleCredentials).then(res => {
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
          setIsLoading(false);
          toast({
            message: res.error,
            type: "error"
          })
        } else {
          toast({
            message: "Role updated",
            type: "success"
          });
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
        <div className="py-3">
          <h1 className="font-semibold">Permissions</h1>
          <div className="px-5">
            <div className="py-3 border-b border-slate-300">
              <div>
                <div className="pb-2">User Management</div>
                <div className="flex flex-wrap gap-4">
                  <Checkbox label="View only" withIcon="check" onChange={(e) => {
                    if (e.target.checked) {
                      setUserMgtPermissions({...userMgtPermissions, view: true})
                    } else {
                      setUserMgtPermissions({...userMgtPermissions, view: false })
                    }
                  }}/>
                  <Checkbox label="View and Write" withIcon="check" onChange={(e) => {
                    if (e.target.checked) {
                      setUserMgtPermissions({...userMgtPermissions, write: true})
                    } else {
                      setUserMgtPermissions({...userMgtPermissions, write: false })
                    }
                  }}/>
                  <Checkbox label="Activate Status" withIcon="check" onChange={(e) => {
                    if (e.target.checked) {
                      setUserMgtPermissions({...userMgtPermissions, status: true})
                    } else {
                      setUserMgtPermissions({...userMgtPermissions, status: false })
                    }
                  }} />
                </div>
              </div>
            </div>
            <div className="py-3 border-b border-slate-300">
              <div>
                <div className="pb-2">Role Management</div>
                <div className="flex flex-wrap gap-4">
                  <Checkbox label="View only" withIcon="check" onChange={(e) => {
                    if (e.target.checked) {
                      setRoleMgtPermissions({...roleMgtPermissions, view: true})
                    } else {
                      setRoleMgtPermissions({...roleMgtPermissions, view: false })
                    }
                  }} />
                  <Checkbox label="View and Write" withIcon="check" onChange={(e) => {
                    if (e.target.checked) {
                      setRoleMgtPermissions({...roleMgtPermissions, write: true})
                    } else {
                      setRoleMgtPermissions({...roleMgtPermissions, write: false })
                    }
                  }}/>
                  <Checkbox label="Activate Status" withIcon="check" onChange={(e) => {
                    if (e.target.checked) {
                      setRoleMgtPermissions({...roleMgtPermissions, status: true})
                    } else {
                      setRoleMgtPermissions({...roleMgtPermissions, status: false })
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </InfoModal>
  )
}
