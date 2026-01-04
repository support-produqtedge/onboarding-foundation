export interface IRole {
  id: string;
  name: string;
  description: string;
  company_id: string;
  assignedUserIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
