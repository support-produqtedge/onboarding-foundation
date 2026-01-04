export interface IAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verification_status: boolean;
  status: boolean;
  password: string;
  password_digest: string;
  createdAt?: Date;
  updatedAt?: Date
};
