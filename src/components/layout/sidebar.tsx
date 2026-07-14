"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Scissors,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/lib/i18n/settings-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { t } = useSettings();

  const navItems = [
    { href: "/", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/musteriler", label: t.nav.customers, icon: Users },
    { href: "/randevular", label: t.nav.appointments, icon: Calendar },
    { href: "/odemeler", label: t.nav.payments, icon: CreditCard },
    { href: "/mesajlar", label: t.nav.messages, icon: MessageSquare },
    { href: "/hizmetler", label: t.nav.services, icon: Scissors },
    { href: "/ayarlar", label: t.nav.settings, icon: Settings },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-gradient-to-r from-rose-500/10 to-purple-500/10 text-rose-700 dark:text-rose-300"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className={cn("h-4 w-4", active && "text-rose-500")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBrand() {
  const { t } = useSettings();

  return (
    <div className="flex h-16 items-center gap-2 border-b border-border px-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-purple-500 text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">{t.app.name}</p>
        <p className="text-xs text-muted-foreground">{t.app.subtitle}</p>
      </div>
    </div>
  );
}

function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const { t } = useSettings();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start gap-2 text-muted-foreground", className)}
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      {t.nav.logout}
    </Button>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-background lg:flex">
      <SidebarBrand />
      <div className="flex-1 p-4">
        <NavLinks />
      </div>
      <div className="border-t border-border p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarBrand />
        <div className="p-4">
          <NavLinks />
        </div>
        <Separator />
        <div className="p-4">
          <LogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header({ title }: { title: string }) {
  const { t } = useSettings();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm lg:px-8">
      <div className="flex items-center gap-3">
        <MobileNav />
        <h1 className="text-lg font-semibold text-foreground lg:text-xl">
          {title}
        </h1>
      </div>
      <div className="hidden items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs text-rose-600 dark:bg-rose-950/50 dark:text-rose-300 sm:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        {t.app.demoMode}
      </div>
    </header>
  );
}
