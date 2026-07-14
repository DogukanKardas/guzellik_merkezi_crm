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
import { formatCurrency } from "@/lib/format";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader />
      <main className="flex-1 space-y-4 p-4 lg:p-8">
        <div className="flex justify-end">
          <ServiceFormDialog>
            <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Hizmet
            </Button>
          </ServiceFormDialog>
        </div>

        <div className="rounded-xl border border-rose-100 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hizmet</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Süre</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Hizmet bulunamadı.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell>{s.duration_minutes} dk</TableCell>
                    <TableCell>{formatCurrency(Number(s.price))}</TableCell>
                    <TableCell>
                      <Badge variant={s.is_active ? "default" : "secondary"}>
                        {s.is_active ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <ServiceFormDialog service={s}>
                          <Button variant="ghost" size="sm">
                            Düzenle
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
