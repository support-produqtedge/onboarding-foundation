import { RoleResponse } from "./model";

const apiUrl = "http://localhost:3008/api/v1";

export const getRoles = async (token: string): Promise<RoleResponse[]> => {
  try {
    const response = await fetch(`${apiUrl}/admin/superadmin/roles`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    throw new Error(String(error));
  }
}
