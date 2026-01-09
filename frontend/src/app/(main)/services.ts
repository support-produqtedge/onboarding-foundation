interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: {
    name: string;
    description: string;
  },
  permissions: {
    user_management: {view: boolean, write: boolean, statusChange: boolean};
    role_management: {view: boolean, write: boolean, statusChange: boolean}
  },
  company: {
    id: string;
    company_name: string;
  }
}

const apiUrl = "http://localhost:3008/api/v1";

export const getAdmin = async (token: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${apiUrl}/admin/superadmin`, {
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

export const getSignedUser = async (token: string, id: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
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
