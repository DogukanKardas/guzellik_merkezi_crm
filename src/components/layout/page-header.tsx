"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/sidebar";
import { useSettings } from "@/lib/i18n/settings-context";

const pathTitles = {
  "/": "dashboard",
  "/musteriler": "customers",
  "/randevular": "appointments",
  "/odemeler": "payments",
  "/mesajlar": "messages",
  "/hizmetler": "services",
  "/ayarlar": "settings",
} as const;

export function PageHeader({ title }: { title?: string }) {
  const pathname = usePathname();
  const { t } = useSettings();

  const key = pathTitles[pathname as keyof typeof pathTitles];
  const resolvedTitle =
    title ??
    (key === "settings"
      ? t.settings.title
      : key
        ? t.pages[key]
        : t.nav.dashboard);

  return <Header title={resolvedTitle} />;
}
