"use client";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import { ViewUser } from "./view-user-modal";
import toast from "@/components/ui/toast";
import UserToggleStatusModal from "./user-status-modal";
import { CreateUserModal } from "./create-user-modal";

interface RoleMenuButtonProps {
  id: string;
  token: string;
  companyId: string;
  status: string;
  role?: {
    id: string,
    name: string
  }
  userPermission?: {
  permissions: {
    user_management: {view: boolean, write: boolean, statusChange: boolean},
    role_management: {view: boolean, write: boolean, statusChange: boolean},
  }
}
}

export const UserMenuButton = ({ id, token, companyId, status, role, userPermission }: RoleMenuButtonProps) => {
  const [viewUserModal, setViewUserModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);


  return (
    <>
      {viewUserModal && <ViewUser onClose={() => setViewUserModal(false)} id={id} token={token} />}
      {statusModal && <UserToggleStatusModal onClose={() => setStatusModal(false)} status={status} id={id} token={token} />}
      {editRoleModal && <CreateUserModal edit id={id} token={token} onClose={() => setEditRoleModal(false)} companyId={companyId} />}
      <Menu menuButton={
        <MenuButton>
          <div className="flex items-center justify-end gap-x-3.5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99996 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 9.99992C10.8333 9.53968 10.4602 9.16659 9.99996 9.16659C9.53972 9.16659 9.16663 9.53968 9.16663 9.99992C9.16663 10.4602 9.53972 10.8333 9.99996 10.8333Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.99996 4.99992C10.4602 4.99992 10.8333 4.62682 10.8333 4.16659C10.8333 3.70635 10.4602 3.33325 9.99996 3.33325C9.53972 3.33325 9.16663 3.70635 9.16663 4.16659C9.16663 4.62682 9.53972 4.99992 9.99996 4.99992Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.99996 16.6666C10.4602 16.6666 10.8333 16.2935 10.8333 15.8333C10.8333 15.373 10.4602 14.9999 9.99996 14.9999C9.53972 14.9999 9.16663 15.373 9.16663 15.8333C9.16663 16.2935 9.53972 16.6666 9.99996 16.6666Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </MenuButton>
      }>
        <MenuItem className="bg-white py-4 px-8 hover:bg-slate-300 hover:cursor-pointer" onClick={() => {
          setViewUserModal(true);
        }}>View</MenuItem>
        {
            userPermission?.permissions.user_management.write && (<MenuItem className="bg-white py-4 px-8 hover:bg-slate-300 hover:cursor-pointer" onClick={() => {
              setEditRoleModal(true);
            }}>Edit</MenuItem>)

        }
         {
           userPermission?.permissions.user_management.statusChange && role?.name !== "Owner" && (<MenuItem className="bg-white py-4 px-8 hover:bg-slate-300 hover:cursor-pointer" onClick={() => {
             setStatusModal(true);
           }}>{status ? 'Deactivate' : 'Activate'}</MenuItem>)

         }
      </Menu>
    </>
  )
}
