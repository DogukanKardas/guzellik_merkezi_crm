import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { getServices } from "@/lib/actions";
import {
  ServiceFormDialog,
  DeleteServiceButton,
} from "@/components/services/service-form-dialog";
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
import { formatCurrency, formatMinutes } from "@/lib/format";
import { getLocale } from "@/lib/i18n/get-locale";
import { getTranslation } from "@/lib/i18n/translations";
import { panelClass } from "@/lib/ui-classes";

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = getTranslation(locale);
  const services = await getServices();

  return (
    <>
      <PageHeader />
      <main className="flex-1 space-y-4 p-4 lg:p-8">
        <div className="flex justify-end">
          <ServiceFormDialog>
            <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              {t.services.newService}
            </Button>
          </ServiceFormDialog>
        </div>

        <div className={panelClass}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.services.name}</TableHead>
                <TableHead>{t.services.category}</TableHead>
                <TableHead>{t.services.duration}</TableHead>
                <TableHead>{t.services.price}</TableHead>
                <TableHead>{t.services.status}</TableHead>
                <TableHead className="text-right">{t.services.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    {t.services.notFound}
                  </TableCell>
                </TableRow>
              ) : (
                services.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell>
                      {formatMinutes(s.duration_minutes, locale)}
                    </TableCell>
                    <TableCell>{formatCurrency(Number(s.price), locale)}</TableCell>
                    <TableCell>
                      <Badge variant={s.is_active ? "default" : "secondary"}>
                        {s.is_active ? t.common.active : t.common.inactive}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <ServiceFormDialog service={s}>
                          <Button variant="ghost" size="sm">
                            {t.common.edit}
                          </Button>
                        </ServiceFormDialog>
                        <DeleteServiceButton id={s.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
