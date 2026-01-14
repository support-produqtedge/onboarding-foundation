export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  companyId: string;
  nin: string;
  role_id: string;
  verification_status: boolean;
  password: string;
  password_digest: string;
  createdAt?: Date;
  updatedAt?: Date;
}
