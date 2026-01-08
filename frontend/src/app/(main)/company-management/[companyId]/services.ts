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


const apiUrl = "http://localhost:3008/api/v1";

export const getUserByCompany = async (token: string, companyId: string): Promise<UserResponse[]> => {
  try {
    const response = await fetch(`${apiUrl}/admin/superadmin/users/${companyId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    throw new Error(String(error));
  }
}
