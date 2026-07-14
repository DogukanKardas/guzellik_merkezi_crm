"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/lib/actions";
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

export function CustomerFormDialog({
  children,
  customer,
}: {
  children: React.ReactNode;
  customer?: {
    id: string;
    full_name: string;
    phone: string | null;
    email: string | null;
    instagram_handle: string | null;
    notes: string | null;
  };
}) {
  const router = useRouter();
  const { t } = useSettings();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    if (customer) {
      const { updateCustomer } = await import("@/lib/actions");
      await updateCustomer(customer.id, formData);
    } else {
      await createCustomer(formData);
    }

    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {customer ? t.customers.editCustomer : t.customers.newCustomer}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">{t.customers.fullName} *</Label>
            <Input
              id="full_name"
              name="full_name"
              defaultValue={customer?.full_name}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t.customers.phone}</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={customer?.phone ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.customers.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={customer?.email ?? ""}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram_handle">{t.customers.instagram}</Label>
            <Input
              id="instagram_handle"
              name="instagram_handle"
              placeholder="@user"
              defaultValue={customer?.instagram_handle ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">{t.common.notes}</Label>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={customer?.notes ?? ""}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t.common.saving : t.common.save}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
