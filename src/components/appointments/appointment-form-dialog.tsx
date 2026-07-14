"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/lib/actions";
import type { Customer, Service, AppointmentStatus } from "@/lib/types";
import { useSettings } from "@/lib/i18n/settings-context";
import { formatMinutes } from "@/lib/format";
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
  const { locale, t } = useSettings();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [status, setStatus] = useState<AppointmentStatus>("pending");

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
          <DialogTitle>{t.appointments.newAppointment}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{t.appointments.customer} *</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer} required>
              <SelectTrigger>
                <SelectValue placeholder={t.appointments.selectCustomer} />
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
            <Label>{t.appointments.service} *</Label>
            <Select
              value={selectedService}
              onValueChange={setSelectedService}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={t.appointments.selectService} />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({formatMinutes(s.duration_minutes, locale)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="starts_at">{t.appointments.dateTime} *</Label>
            <Input
              id="starts_at"
              name="starts_at"
              type="datetime-local"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff_name">{t.appointments.staff}</Label>
            <Input
              id="staff_name"
              name="staff_name"
              defaultValue={t.common.staff}
            />
          </div>
          <div className="space-y-2">
            <Label>{t.appointments.status}</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as AppointmentStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(t.status.appointment) as [
                    AppointmentStatus,
                    string,
                  ][]
                ).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">{t.common.notes}</Label>
            <Textarea id="notes" name="notes" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t.common.saving : t.appointments.create}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
