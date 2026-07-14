import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, CreditCard, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/sidebar";
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
import {
  APPOINTMENT_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  type AppointmentStatus,
  type PaymentMethod,
  type PaymentStatus,
} from "@/lib/types";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/format";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data;
  try {
    data = await getCustomerDetails(id);
  } catch {
    notFound();
  }

  const { customer, appointments, payments, threads } = data;

  return (
    <>
      <Header title={customer.full_name} />
      <main className="flex-1 space-y-6 p-4 lg:p-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/musteriler">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Link>
          </Button>
          <CustomerFormDialog customer={customer}>
            <Button variant="outline" size="sm">
              Düzenle
            </Button>
          </CustomerFormDialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-rose-100 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Telefon</p>
                <p className="font-medium">{customer.phone ?? "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">E-posta</p>
                <p className="font-medium">{customer.email ?? "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Instagram</p>
                <p className="font-medium">{customer.instagram_handle ?? "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Kayıt Tarihi</p>
                <p className="font-medium">{formatDate(customer.created_at)}</p>
              </div>
              {customer.notes && (
                <div>
                  <p className="text-muted-foreground">Notlar</p>
                  <p className="font-medium">{customer.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-rose-100 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Randevu Geçmişi
              </CardTitle>
              <CardDescription>{appointments.length} randevu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {appointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">Randevu yok.</p>
              ) : (
                appointments.slice(0, 5).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{apt.services?.name}</p>
                      <p className="text-muted-foreground">
                        {formatDateTime(apt.starts_at)}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {APPOINTMENT_STATUS_LABELS[apt.status as AppointmentStatus]}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-rose-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-4 w-4" />
                Ödemeler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {payments.length === 0 ? (
                <p className="text-sm text-muted-foreground">Ödeme yok.</p>
              ) : (
                payments.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{formatCurrency(Number(p.amount))}</p>
                      <p className="text-muted-foreground">
                        {PAYMENT_METHOD_LABELS[p.method as PaymentMethod]}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {PAYMENT_STATUS_LABELS[p.status as PaymentStatus]}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-rose-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" />
                Mesaj Konuşmaları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {threads.length === 0 ? (
                <p className="text-sm text-muted-foreground">Konuşma yok.</p>
              ) : (
                threads.map((t) => (
                  <Link
                    key={t.id}
                    href={`/mesajlar?thread=${t.id}`}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium capitalize">{t.channel}</p>
                      <p className="text-muted-foreground">{t.contact_handle}</p>
                    </div>
                    {t.unread_count > 0 && (
                      <Badge className="bg-rose-500">{t.unread_count}</Badge>
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
