"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPayment } from "@/lib/actions";
import type { Customer, PaymentMethod, PaymentStatus } from "@/lib/types";
import { useSettings } from "@/lib/i18n/settings-context";
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

export function PaymentFormDialog({
  children,
  customers,
}: {
  children: React.ReactNode;
  customers: Customer[];
}) {
  const router = useRouter();
  const { t } = useSettings();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [status, setStatus] = useState<PaymentStatus>("paid");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("customer_id", customerId);
    formData.set("method", method);
    formData.set("status", status);
    await createPayment(formData);
    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.payments.newPayment}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{t.payments.customer} *</Label>
            <Select value={customerId} onValueChange={setCustomerId} required>
              <SelectTrigger>
                <SelectValue placeholder={t.payments.selectCustomer} />
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
            <Label htmlFor="amount">{t.payments.amountLabel} *</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.payments.method}</Label>
              <Select
                value={method}
                onValueChange={(v) => setMethod(v as PaymentMethod)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.entries(t.status.paymentMethod) as [
                      PaymentMethod,
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
              <Label>{t.payments.status}</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as PaymentStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">{t.payments.paid}</SelectItem>
                  <SelectItem value="pending">{t.payments.pending}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">{t.common.notes}</Label>
            <Textarea id="notes" name="notes" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t.common.saving : t.payments.save}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
