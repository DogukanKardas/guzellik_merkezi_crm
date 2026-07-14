import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, CreditCard, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { getCustomerDetails } from "@/lib/actions";
import { CustomerFormDialog } from "@/components/customers/customer-form-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AppointmentStatus, PaymentMethod, PaymentStatus } from "@/lib/types";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/format";
import { getLocale } from "@/lib/i18n/get-locale";
import { getTranslation, interpolate } from "@/lib/i18n/translations";
import { panelItemClass } from "@/lib/ui-classes";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const t = getTranslation(locale);

  let data;
  try {
    data = await getCustomerDetails(id);
  } catch {
    notFound();
  }

  const { customer, appointments, payments, threads } = data;

  return (
    <>
      <PageHeader title={customer.full_name} />
      <main className="flex-1 space-y-6 p-4 lg:p-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/musteriler">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.common.back}
            </Link>
          </Button>
          <CustomerFormDialog customer={customer}>
            <Button variant="outline" size="sm">
              {t.common.edit}
            </Button>
          </CustomerFormDialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">{t.customers.contactInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">{t.customers.phone}</p>
                <p className="font-medium">{customer.phone ?? t.common.empty}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t.customers.email}</p>
                <p className="font-medium">{customer.email ?? t.common.empty}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t.customers.instagram}</p>
                <p className="font-medium">
                  {customer.instagram_handle ?? t.common.empty}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">{t.customers.registeredAt}</p>
                <p className="font-medium">
                  {formatDate(customer.created_at, locale)}
                </p>
              </div>
              {customer.notes && (
                <div>
                  <p className="text-muted-foreground">{t.common.notes}</p>
                  <p className="font-medium">{customer.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                {t.customers.appointmentHistory}
              </CardTitle>
              <CardDescription>
                {interpolate(t.customers.appointmentsCount, {
                  count: appointments.length,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {appointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t.customers.noAppointments}
                </p>
              ) : (
                appointments.slice(0, 5).map((apt) => (
                  <div
                    key={apt.id}
                    className={`flex items-center justify-between text-sm ${panelItemClass}`}
                  >
                    <div>
                      <p className="font-medium">{apt.services?.name}</p>
                      <p className="text-muted-foreground">
                        {formatDateTime(apt.starts_at, locale)}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {t.status.appointment[apt.status as AppointmentStatus]}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-4 w-4" />
                {t.customers.payments}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {payments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t.customers.noPayments}
                </p>
              ) : (
                payments.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between text-sm ${panelItemClass}`}
                  >
                    <div>
                      <p className="font-medium">
                        {formatCurrency(Number(p.amount), locale)}
                      </p>
                      <p className="text-muted-foreground">
                        {t.status.paymentMethod[p.method as PaymentMethod]}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {t.status.payment[p.status as PaymentStatus]}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" />
                {t.customers.messageThreads}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {threads.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t.customers.noThreads}
                </p>
              ) : (
                threads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/mesajlar?thread=${thread.id}`}
                    className={`flex items-center justify-between text-sm ${panelItemClass}`}
                  >
                    <div>
                      <p className="font-medium capitalize">{thread.channel}</p>
                      <p className="text-muted-foreground">{thread.contact_handle}</p>
                    </div>
                    {thread.unread_count > 0 && (
                      <Badge className="bg-rose-500">{thread.unread_count}</Badge>
                    )}
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
