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
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/musteriler", label: "Müşteriler", icon: Users },
  { href: "/randevular", label: "Randevular", icon: Calendar },
  { href: "/odemeler", label: "Ödemeler", icon: CreditCard },
  { href: "/mesajlar", label: "Mesajlar", icon: MessageSquare },
  { href: "/hizmetler", label: "Hizmetler", icon: Scissors },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

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
                ? "bg-gradient-to-r from-rose-500/10 to-purple-500/10 text-rose-700"
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

export function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 flex-col border-r border-rose-100 bg-white lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-rose-100 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-purple-500 text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-bold text-rose-950">Güzellik Merkezi</p>
          <p className="text-xs text-muted-foreground">Müşteri Takip</p>
        </div>
      </div>
      <div className="flex-1 p-4">
        <NavLinks />
      </div>
      <div className="border-t border-rose-100 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-purple-500 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold">Güzellik Merkezi</p>
        </div>
        <div className="p-4">
          <NavLinks />
        </div>
        <Separator />
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header({ title }: { title: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-rose-100 bg-white/80 px-4 backdrop-blur-sm lg:px-8">
      <div className="flex items-center gap-3">
        <MobileNav />
        <h1 className="text-lg font-semibold text-rose-950 lg:text-xl">{title}</h1>
      </div>
      <div className="hidden items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs text-rose-600 sm:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        Demo Modu
      </div>
    </header>
  );
}
