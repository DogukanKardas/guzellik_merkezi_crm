import { Header } from "@/components/layout/sidebar";
import { getDashboardStats } from "@/lib/actions";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { APPOINTMENT_STATUS_LABELS, type AppointmentStatus } from "@/lib/types";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Calendar,
  CreditCard,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AtSign, MessageCircle } from "lucide-react";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Bugünkü Randevular"
            value={stats.todayAppointments}
            icon={Calendar}
            color="rose"
          />
          <StatCard
            title="Bekleyen Ödemeler"
            value={stats.pendingPayments}
            icon={CreditCard}
            color="amber"
          />
          <StatCard
            title="Okunmamış Mesajlar"
            value={stats.unreadMessages}
            icon={MessageSquare}
            color="purple"
          />
          <StatCard
            title="Aylık Gelir"
            value={formatCurrency(stats.monthlyRevenue)}
            icon={TrendingUp}
            color="emerald"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-rose-100">
            <CardHeader>
              <CardTitle className="text-base">Yaklaşan Randevular</CardTitle>
              <CardDescription>En yakın 5 randevu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.upcomingAppointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Yaklaşan randevu bulunmuyor.
                </p>
              ) : (
                stats.upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-lg border border-rose-50 bg-rose-50/30 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {apt.customers?.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {apt.services?.name} · {apt.staff_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">
                        {formatDateTime(apt.starts_at)}
                      </p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {APPOINTMENT_STATUS_LABELS[apt.status as AppointmentStatus]}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
              <Link
                href="/randevular"
                className="block text-center text-sm text-rose-600 hover:underline"
              >
                Tüm randevular →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-rose-100">
            <CardHeader>
              <CardTitle className="text-base">Son Mesajlar</CardTitle>
              <CardDescription>Okunmamış konuşmalar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentThreads.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Okunmamış mesaj yok.
                </p>
              ) : (
                stats.recentThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/mesajlar?thread=${thread.id}`}
                    className="flex items-center gap-3 rounded-lg border border-purple-50 bg-purple-50/30 p-3 transition-colors hover:bg-purple-50/60"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        thread.channel === "instagram"
                          ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white"
                          : "bg-emerald-500 text-white"
                      }`}
                    >
                      {thread.channel === "instagram" ? (
                        <AtSign className="h-4 w-4" />
                      ) : (
                        <MessageCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {thread.contact_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {thread.contact_handle}
                      </p>
                    </div>
                    <Badge className="bg-rose-500">{thread.unread_count}</Badge>
                  </Link>
                ))
              )}
              <Link
                href="/mesajlar"
                className="block text-center text-sm text-purple-600 hover:underline"
              >
                Mesaj kutusuna git →
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
