import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { getPayments, getCustomers } from "@/lib/actions";
import { PaymentFormDialog } from "@/components/payments/payment-form-dialog";
import { PaymentStatusSelect } from "@/components/payments/payment-status-select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
import { PAYMENT_METHOD_LABELS, type PaymentMethod, type PaymentStatus } from "@/lib/types";

export default async function PaymentsPage() {
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
      <div className="rounded-xl border border-rose-100 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Müşteri</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead>Yöntem</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Durum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Ödeme bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              data.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {p.customers?.full_name}
                  </TableCell>
                  <TableCell>{formatCurrency(Number(p.amount))}</TableCell>
                  <TableCell>{PAYMENT_METHOD_LABELS[p.method as PaymentMethod]}</TableCell>
                  <TableCell>
                    {p.paid_at
                      ? formatDateTime(p.paid_at)
                      : formatDateTime(p.created_at)}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusSelect id={p.id} status={p.status as PaymentStatus} />
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
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Toplam Tahsilat</p>
              <p className="text-2xl font-bold text-emerald-700">
                {formatCurrency(totalPaid)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Bekleyen Ödemeler</p>
              <p className="text-2xl font-bold text-amber-700">
                {formatCurrency(totalPending)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <PaymentFormDialog customers={customers}>
            <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Ödeme
            </Button>
          </PaymentFormDialog>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tümü ({payments.length})</TabsTrigger>
            <TabsTrigger value="paid">Ödendi ({paid.length})</TabsTrigger>
            <TabsTrigger value="pending">Bekliyor ({pending.length})</TabsTrigger>
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
