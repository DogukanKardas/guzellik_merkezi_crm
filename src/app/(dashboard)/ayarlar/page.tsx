"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useSettings } from "@/lib/i18n/settings-context";
import type { Locale } from "@/lib/i18n/translations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { locale, setLocale, t } = useSettings();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("crm-email-notifications");
    if (stored !== null) {
      setEmailNotifications(stored === "true");
    }
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  function handleDarkMode(checked: boolean) {
    setTheme(checked ? "dark" : "light");
  }

  function handleLocale(value: string) {
    setLocale(value as Locale);
  }

  function handleEmailNotifications(checked: boolean) {
    setEmailNotifications(checked);
    localStorage.setItem("crm-email-notifications", String(checked));
  }

  return (
    <>
      <PageHeader />
      <main className="flex-1 space-y-6 p-4 lg:p-8">
        <div>
          <p className="text-sm text-muted-foreground">{t.settings.subtitle}</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              {isDark ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              {t.settings.appearance}
            </CardTitle>
            <CardDescription>{t.settings.appearanceDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">{t.settings.darkMode}</Label>
                <p className="text-sm text-muted-foreground">
                  {t.settings.darkModeDesc}
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={isDark}
                onCheckedChange={handleDarkMode}
                disabled={!mounted}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="language" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t.settings.language}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t.settings.languageDesc}
                </p>
              </div>
              <Select value={locale} onValueChange={handleLocale}>
                <SelectTrigger id="language" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">{t.settings.languageTr}</SelectItem>
                  <SelectItem value="en">{t.settings.languageEn}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">{t.settings.notifications}</CardTitle>
            <CardDescription>{t.settings.notificationsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">
                  {t.settings.emailNotifications}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t.settings.emailNotificationsDesc}
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={handleEmailNotifications}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
