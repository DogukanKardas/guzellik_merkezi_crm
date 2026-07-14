import { cookies } from "next/headers";
import type { Locale } from "./translations";
import { LOCALE_COOKIE } from "./constants";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : "tr";
}
