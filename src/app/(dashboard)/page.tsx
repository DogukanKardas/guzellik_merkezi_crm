import { PageHeader } from "@/components/layout/page-header";
import { getDashboardStats } from "@/lib/actions";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getLocale } from "@/lib/i18n/get-locale";
import { getTranslation } from "@/lib/i18n/translations";
import { panelItemClass } from "@/lib/ui-classes";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Calendar,
  CreditCard,
  MessageSquare,
  TrendingUp,
  AtSign,
  MessageCircle,
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
import type { AppointmentStatus } from "@/lib/types";

export default async function DashboardPage() {
  const locale = await getLocale();
  const t = getTranslation(locale);
  const stats = await getDashboardStats();

  return (
    <>
      <PageHeader />
      <main className="flex-1 space-y-6 p-4 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title={t.dashboard.todayAppointments}
            value={stats.todayAppointments}
            icon={Calendar}
            color="rose"
          />
          <StatCard
            title={t.dashboard.pendingPayments}
            value={stats.pendingPayments}
            icon={CreditCard}
            color="amber"
          />
          <StatCard
            title={t.dashboard.unreadMessages}
            value={stats.unreadMessages}
            icon={MessageSquare}
            color="purple"
          />
          <StatCard
            title={t.dashboard.monthlyRevenue}
            value={formatCurrency(stats.monthlyRevenue, locale)}
            icon={TrendingUp}
            color="emerald"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">
                {t.dashboard.upcomingAppointments}
              </CardTitle>
              <CardDescription>{t.dashboard.upcomingDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.upcomingAppointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t.dashboard.noUpcoming}
                </p>
              ) : (
                stats.upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`flex items-center justify-between ${panelItemClass}`}
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
                        {formatDateTime(apt.starts_at, locale)}
                      </p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {
                          t.status.appointment[
                            apt.status as AppointmentStatus
                          ]
                        }
                      </Badge>
                    </div>
                  </div>
                ))
              )}
              <Link
                href="/randevular"
                className="block text-center text-sm text-rose-600 hover:underline dark:text-rose-400"
              >
                {t.dashboard.viewAllAppointments}
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">
                {t.dashboard.recentMessages}
              </CardTitle>
              <CardDescription>{t.dashboard.recentMessagesDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentThreads.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t.dashboard.noUnread}
                </p>
              ) : (
                stats.recentThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/mesajlar?thread=${thread.id}`}
                    className={`flex items-center gap-3 ${panelItemClass}`}
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
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {thread.contact_name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {thread.contact_handle}
                      </p>
                    </div>
                    <Badge className="bg-rose-500">{thread.unread_count}</Badge>
                  </Link>
                ))
              )}
              <Link
                href="/mesajlar"
                className="block text-center text-sm text-purple-600 hover:underline dark:text-purple-400"
              >
                {t.dashboard.viewInbox}
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
