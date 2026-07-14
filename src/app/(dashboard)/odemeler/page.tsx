import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { getPayments, getCustomers } from "@/lib/actions";
import { PaymentFormDialog } from "@/components/payments/payment-form-dialog";
import { PaymentStatusSelect } from "@/components/payments/payment-status-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getLocale } from "@/lib/i18n/get-locale";
import { getTranslation } from "@/lib/i18n/translations";
import { panelClass } from "@/lib/ui-classes";
import type { PaymentMethod, PaymentStatus } from "@/lib/types";

export default async function PaymentsPage() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  const [payments, customers] = await Promise.all([
    getPayments(),
    getCustomers(),
  ]);

  const paid = payments.filter((p) => p.status === "paid");
  const pending = payments.filter((p) => p.status === "pending");
  const totalPaid = paid.reduce((s, p) => s + Number(p.amount), 0);
  const totalPending = pending.reduce((s, p) => s + Number(p.amount), 0);

  function PaymentTable({ data }: { data: typeof payments }) {
    return (
      <div className={panelClass}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.payments.customer}</TableHead>
              <TableHead>{t.payments.amount}</TableHead>
              <TableHead>{t.payments.method}</TableHead>
              <TableHead>{t.payments.date}</TableHead>
              <TableHead>{t.payments.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  {t.payments.notFound}
                </TableCell>
              </TableRow>
            ) : (
              data.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {p.customers?.full_name}
                  </TableCell>
                  <TableCell>{formatCurrency(Number(p.amount), locale)}</TableCell>
                  <TableCell>
                    {t.status.paymentMethod[p.method as PaymentMethod]}
                  </TableCell>
                  <TableCell>
                    {p.paid_at
                      ? formatDateTime(p.paid_at, locale)
                      : formatDateTime(p.created_at, locale)}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusSelect
                      id={p.id}
                      status={p.status as PaymentStatus}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <PageHeader />
      <main className="flex-1 space-y-4 p-4 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-border bg-emerald-50/50 dark:bg-emerald-950/30">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">
                {t.payments.totalCollected}
              </p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(totalPaid, locale)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-amber-50/50 dark:bg-amber-950/30">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">
                {t.payments.pendingTotal}
              </p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                {formatCurrency(totalPending, locale)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <PaymentFormDialog customers={customers}>
            <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              {t.payments.newPayment}
            </Button>
          </PaymentFormDialog>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              {t.common.all} ({payments.length})
            </TabsTrigger>
            <TabsTrigger value="paid">
              {t.payments.paid} ({paid.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              {t.payments.pending} ({pending.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <PaymentTable data={payments} />
          </TabsContent>
          <TabsContent value="paid" className="mt-4">
            <PaymentTable data={paid} />
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <PaymentTable data={pending} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
