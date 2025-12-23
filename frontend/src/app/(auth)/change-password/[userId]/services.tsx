const apiUrl = "http://localhost:3008/api/v1";

export const verifyEmail = async (key: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/verifyEmail?key=${key}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    });
    return await response.json();
  } catch (error) {
    throw new Error(String(error));
  }
}
