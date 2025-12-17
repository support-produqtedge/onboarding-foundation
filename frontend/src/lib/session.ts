"use server"

import { cookies } from "next/headers";
// import { jwtVerify, JWTPayload } from "jose";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

/* interface UserSession extends JWTPayload{
  id: string;
} */

interface UserSession {
  id: string;
  role: string;
  email: string;
  exp: number;
  iss: string;
}

/* const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey!); */

export async function createSession(token: string) {
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
  })
}

export async function deleteSession() {
  (await cookies()).delete("session")
}

export async function decrypt(session: string | undefined = '') {
  try {
    /* const {payload} = await jwtVerify<UserSession>(session, encodedKey, {
      algorithms: ["HS256"]
    }); */
    const payload = jwtDecode<UserSession>(session);
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      redirect('/admin/login')
    }
  }
}
