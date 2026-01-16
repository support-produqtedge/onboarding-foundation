export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: {
    id: string;
    name: string;
    description: string;
  };
  isEmailVerified: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date
}

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
  assignedUserIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalUsersResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status?: boolean;
  isEmailVerified: boolean;
  verification_status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
