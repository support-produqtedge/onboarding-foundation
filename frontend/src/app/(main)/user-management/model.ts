export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    id: string;
    name: string;
    description: string;
  };
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
