import z from "zod";
import { createSession, deleteSession } from "./lib/session";
import { redirect } from "next/navigation";

const adminLoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z.string().min(1, { message: "Invalid login credentials"})
});

const userLoginSchema = z.object({
  email: z.email({ message: "Invalid login credentials" }).trim(),
  password: z.string().min(1, { message: "Invalid login credentials"})
});

const registerUserSchema = z.object({
  firstName: z.string({ message: "Invalid credentials"}).trim(),
  lastName: z.string({ message: "Invalid credentials"}).trim(),
  email: z.email({ message: "Invalid email address" }).trim(),
  phone: z.string(),
  password: z.string()
});

const registerCompanySchema = z.object({
  name: z.string({ message: "Company name is required" }).min(1, {message: "Company name is required."}),
  cac: z.string({ message: "CAC is required" }).trim(),
  tin: z.string({ message: "TIN is required" }).trim()
})


export async function loginAdmin(prevState: unknown, formData: FormData) {
  const adminLoginData = adminLoginSchema.safeParse(Object.fromEntries(formData));

  if (!adminLoginData.success) {
    const { fieldErrors } = z.flattenError(adminLoginData.error);
    if (fieldErrors.email) {
      return {
        error: "Invalid login credentials"
      }
    }

    if (fieldErrors.password) {
      return {
        error: fieldErrors.password[0]
      }
    }
    return {
      error: "Invalid login credentials"
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
    return {
      error: "Invalid login credentials"
    }
  } else {

    const data = await response.json();
    await createSession(data.token);
    redirect("/dashboard");
  }

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

export async function registerUser(prevState: unknown, formData: FormData) {
  const registerData = registerUserSchema.safeParse(Object.fromEntries(formData));

  if (!registerData.success) {
    return {
      errors: registerData.error.flatten().fieldErrors
    }
  }
  const {firstName, lastName, email, phone, password} = registerData.data;

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ firstName, lastName, email, phone, password })
  });

  if (!response.ok) {
    return {
      error: "Email already used"
    }
  } else {
    redirect("/register-company");
  }
}

export async function registerCompany(prevState: unknown, formData: FormData) {
  const registerData = registerCompanySchema.safeParse(Object.fromEntries(formData));

  if (!registerData.success) {
    const {fieldErrors} = z.flattenError(registerData.error);
    if (fieldErrors.name) {
      return {
        error: fieldErrors.name[0]
      }
    }
    return {
      error: "Invalid credentials"
    }
  }
  const {name, cac, tin} = registerData.data;

  const response = await fetch("/api/auth/register-company", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, cac, tin })
  });

  if (!response.ok) {
    return {
      error: "Invalid credentials"
    }
  } else {
    redirect("/check-email");
  }
}



export async function logout() {
  await deleteSession();
  redirect("/login");
}
