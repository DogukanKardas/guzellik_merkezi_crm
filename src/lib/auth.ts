import { cookies } from "next/headers";

export const SESSION_COOKIE = "demo_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function getDemoCredentials() {
  return {
    username: process.env.DEMO_USERNAME ?? "admin",
    password: process.env.DEMO_PASSWORD ?? "demo123",
  };
}

export function createSessionToken(): string {
  const secret = process.env.SESSION_SECRET ?? "demo-secret-key";
  const payload = `${Date.now()}:${secret}`;
  return Buffer.from(payload).toString("base64url");
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [timestamp, secret] = decoded.split(":");
    const expectedSecret = process.env.SESSION_SECRET ?? "demo-secret-key";
    if (secret !== expectedSecret) return false;
    const age = Date.now() - Number(timestamp);
    return age < SESSION_MAX_AGE * 1000;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE,
    path: "/",
  };
}
