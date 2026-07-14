"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/lib/actions";
import type { Customer, Service } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AppointmentFormDialog({
  children,
  customers,
  services,
}: {
  children: React.ReactNode;
  customers: Customer[];
  services: Service[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [status, setStatus] = useState("pending");

  const service = services.find((s) => s.id === selectedService);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("customer_id", selectedCustomer);
    formData.set("service_id", selectedService);
    formData.set("status", status);
    if (service) {
      formData.set("duration_minutes", String(service.duration_minutes));
    }
    await createAppointment(formData);
    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Yeni Randevu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Müşteri *</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer} required>
              <SelectTrigger>
                <SelectValue placeholder="Müşteri seçin" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Hizmet *</Label>
            <Select
              value={selectedService}
              onValueChange={setSelectedService}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Hizmet seçin" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({s.duration_minutes} dk)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="starts_at">Tarih ve Saat *</Label>
            <Input
              id="starts_at"
              name="starts_at"
              type="datetime-local"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff_name">Personel</Label>
            <Input id="staff_name" name="staff_name" defaultValue="Personel" />
          </div>
          <div className="space-y-2">
            <Label>Durum</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Bekliyor</SelectItem>
                <SelectItem value="confirmed">Onaylandı</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="cancelled">İptal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notlar</Label>
            <Textarea id="notes" name="notes" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Kaydediliyor..." : "Randevu Oluştur"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
