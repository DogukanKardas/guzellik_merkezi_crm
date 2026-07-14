import { format, formatDistanceToNow } from "date-fns";
import { enUS, tr } from "date-fns/locale";
import type { Locale } from "@/lib/i18n/translations";

function dateLocale(locale: Locale) {
  return locale === "en" ? enUS : tr;
}

export function formatDate(date: string | Date, locale: Locale = "tr") {
  return format(new Date(date), "d MMMM yyyy", { locale: dateLocale(locale) });
}

export function formatDateTime(date: string | Date, locale: Locale = "tr") {
  return format(new Date(date), "d MMM yyyy HH:mm", { locale: dateLocale(locale) });
}

export function formatTime(date: string | Date, locale: Locale = "tr") {
  return format(new Date(date), "HH:mm", { locale: dateLocale(locale) });
}

export function formatRelative(date: string | Date, locale: Locale = "tr") {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: dateLocale(locale),
  });
}

export function formatCurrency(amount: number, locale: Locale = "tr") {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatMinutes(minutes: number, locale: Locale = "tr") {
  return locale === "en" ? `${minutes} min` : `${minutes} dk`;
}
