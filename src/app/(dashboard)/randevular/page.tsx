import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import {
  getAppointments,
  getCustomers,
  getServices,
} from "@/lib/actions";
import { AppointmentFormDialog } from "@/components/appointments/appointment-form-dialog";
import { AppointmentStatusSelect } from "@/components/appointments/appointment-status-select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateTime, formatCurrency } from "@/lib/format";
import { getLocale } from "@/lib/i18n/get-locale";
import { getTranslation, interpolate } from "@/lib/i18n/translations";
import { panelClass } from "@/lib/ui-classes";
import type { AppointmentStatus } from "@/lib/types";

export default async function AppointmentsPage() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  const [appointments, customers, services] = await Promise.all([
    getAppointments(),
    getCustomers(),
    getServices(true),
  ]);

  const now = new Date();
  const upcoming = appointments.filter(
    (a) => new Date(a.starts_at) >= now && a.status !== "cancelled"
  );
  const past = appointments.filter(
    (a) => new Date(a.starts_at) < now || a.status === "cancelled"
  );

  function AppointmentTable({ data }: { data: typeof appointments }) {
    return (
      <div className={panelClass}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.appointments.customer}</TableHead>
              <TableHead>{t.appointments.service}</TableHead>
              <TableHead>{t.appointments.staff}</TableHead>
              <TableHead>{t.appointments.date}</TableHead>
              <TableHead>{t.appointments.price}</TableHead>
              <TableHead>{t.appointments.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  {t.appointments.notFound}
                </TableCell>
              </TableRow>
            ) : (
              data.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">
                    {apt.customers?.full_name}
                  </TableCell>
                  <TableCell>{apt.services?.name}</TableCell>
                  <TableCell>{apt.staff_name}</TableCell>
                  <TableCell>{formatDateTime(apt.starts_at, locale)}</TableCell>
                  <TableCell>
                    {formatCurrency(Number(apt.services?.price ?? 0), locale)}
                  </TableCell>
                  <TableCell>
                    <AppointmentStatusSelect
                      id={apt.id}
                      status={apt.status as AppointmentStatus}
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
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="secondary">
              {interpolate(t.appointments.upcomingCount, { count: upcoming.length })}
            </Badge>
            <Badge variant="outline">
              {interpolate(t.appointments.pastCount, { count: past.length })}
            </Badge>
          </div>
          <AppointmentFormDialog customers={customers} services={services}>
            <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              {t.appointments.newAppointment}
            </Button>
          </AppointmentFormDialog>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">{t.appointments.upcoming}</TabsTrigger>
            <TabsTrigger value="past">{t.appointments.past}</TabsTrigger>
            <TabsTrigger value="all">{t.common.all}</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
            <AppointmentTable data={upcoming} />
          </TabsContent>
          <TabsContent value="past" className="mt-4">
            <AppointmentTable data={past} />
          </TabsContent>
          <TabsContent value="all" className="mt-4">
            <AppointmentTable data={appointments} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
