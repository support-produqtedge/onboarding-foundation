interface AuditLogs {
  id: string;
  name: string;
  action: string;
  description: string;
  createdAt: string;
}

const apiUrl = "http://localhost:3008/api/v1";

export const getLogs = async (token: string): Promise<AuditLogs[]> => {
  const response = await fetch(`${apiUrl}/logs`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  return await response.json();
}
