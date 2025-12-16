import z from "zod";

const adminLoginSchema = z.object({
  email: z.email({ message: "Invalid email address"}).trim(),
  password: z.string()
});

export async function loginAdmin(prevState: unknown, formData: FormData) {
  const adminLoginData = adminLoginSchema.safeParse(Object.fromEntries(formData));

  if (!adminLoginData.success) {
    return {
      errors: adminLoginData.error.flatten().fieldErrors
    }
  }

  const { email, password } = adminLoginData.data;

  const response = await fetch("/api/admin/auth/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  });
  const data = await response.json();
  console.log(data)

  return adminLoginData.success
}
