import { format, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export function formatDate(date: string | Date) {
  return format(new Date(date), "d MMMM yyyy", { locale: tr });
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), "d MMM yyyy HH:mm", { locale: tr });
}

export function formatTime(date: string | Date) {
  return format(new Date(date), "HH:mm", { locale: tr });
}

export function formatRelative(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: tr });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(amount);
}
