import { Suspense } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { getCustomers } from "@/lib/actions";
import { CustomerFormDialog } from "@/components/customers/customer-form-dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/i18n/get-locale";
import { getTranslation } from "@/lib/i18n/translations";
import { panelClass } from "@/lib/ui-classes";

async function CustomerList({
  search,
  locale,
}: {
  search?: string;
  locale: Awaited<ReturnType<typeof getLocale>>;
}) {
  const customers = await getCustomers(search);
  const t = getTranslation(locale);

  return (
    <div className={panelClass}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.customers.fullName}</TableHead>
            <TableHead>{t.customers.phone}</TableHead>
            <TableHead>{t.customers.email}</TableHead>
            <TableHead>{t.customers.instagram}</TableHead>
            <TableHead>{t.customers.registeredAt}</TableHead>
            <TableHead className="text-right">{t.customers.action}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                {t.customers.notFound}
              </TableCell>
            </TableRow>
          ) : (
            customers.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.full_name}</TableCell>
                <TableCell>{c.phone ?? t.common.empty}</TableCell>
                <TableCell>{c.email ?? t.common.empty}</TableCell>
                <TableCell>{c.instagram_handle ?? t.common.empty}</TableCell>
                <TableCell>{formatDate(c.created_at, locale)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/musteriler/${c.id}`}>{t.common.detail}</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const locale = await getLocale();
  const t = getTranslation(locale);

  return (
    <>
      <PageHeader />
      <main className="flex-1 space-y-4 p-4 lg:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <form method="get" className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={q}
              placeholder={t.customers.searchPlaceholder}
              className="pl-9"
            />
          </form>
          <CustomerFormDialog>
            <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              {t.customers.newCustomer}
            </Button>
          </CustomerFormDialog>
        </div>
        <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
          <CustomerList search={q} locale={locale} />
        </Suspense>
      </main>
    </>
  );
}
