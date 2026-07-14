import { NextResponse } from "next/server";
import {
  createSessionToken,
  getDemoCredentials,
  getSessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const creds = getDemoCredentials();

  if (username !== creds.username || password !== creds.password) {
    return NextResponse.json(
      { error: "Kullanıcı adı veya şifre hatalı" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    SESSION_COOKIE,
    createSessionToken(),
    getSessionCookieOptions()
  );
  return response;
}
