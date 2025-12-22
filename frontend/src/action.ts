import z from "zod";
import { createSession, deleteSession } from "./lib/session";
import { redirect } from "next/navigation";

const adminLoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z.string()
});

const userLoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
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
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    return (await response.json());
  }

  const data = await response.json();
  await createSession(data.token);
  redirect("/dashboard");
}

export async function loginUser(prevState: unknown, formData: FormData) {
  const userLoginData = userLoginSchema.safeParse(Object.fromEntries(formData));

  if (!userLoginData.success) {
    return {
      errors: userLoginData.error.flatten().fieldErrors
    }
  }

  const { email, password } = userLoginData.data;

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    return (await response.json());
  }

  const data = await response.json();

  await createSession(data.token);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
