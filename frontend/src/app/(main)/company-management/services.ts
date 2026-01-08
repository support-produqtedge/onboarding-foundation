interface CompanyResponse {
  id: string;
  company_name: string;
  company_owner: {
    id: string;
    firstName: string;
    lastName: string;
  }
}

const apiUrl = "http://localhost:3008/api/v1";

export const getCompanies = async (token: string): Promise<CompanyResponse[]> => {
  const response = await fetch(`${apiUrl}/admin/superadmin/companies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return await response.json();
}
