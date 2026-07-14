"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { SettingsProvider } from "@/lib/i18n/settings-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );
}
