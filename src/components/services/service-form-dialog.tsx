"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService, deleteService } from "@/lib/actions";
import type { Service } from "@/lib/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

const categories = [
  "Cilt Bakımı",
  "Estetik",
  "Saç",
  "Tırnak",
  "Lazer",
  "Kaş/Kirpik",
];

function ServiceForm({
  service,
  onDone,
}: {
  service?: Service;
  onDone: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(service?.category ?? categories[0]);
  const [isActive, setIsActive] = useState(service?.is_active ?? true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("category", category);
    formData.set("is_active", isActive ? "true" : "false");

    if (service) {
      await updateService(service.id, formData);
    } else {
      await createService(formData);
    }
    setLoading(false);
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Hizmet Adı *</Label>
        <Input id="name" name="name" defaultValue={service?.name} required />
      </div>
      <div className="space-y-2">
        <Label>Kategori *</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration_minutes">Süre (dk) *</Label>
          <Input
            id="duration_minutes"
            name="duration_minutes"
            type="number"
            min="15"
            step="15"
            defaultValue={service?.duration_minutes ?? 60}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Fiyat (₺) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={service?.price ?? 0}
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_active"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="h-4 w-4 rounded"
        />
        <Label htmlFor="is_active">Aktif</Label>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </Button>
    </form>
  );
}

export function ServiceFormDialog({
  children,
  service,
}: {
  children: React.ReactNode;
  service?: Service;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function handleDone() {
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{service ? "Hizmet Düzenle" : "Yeni Hizmet"}</DialogTitle>
        </DialogHeader>
        <ServiceForm service={service} onDone={handleDone} />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteServiceButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    await deleteService(id);
    setLoading(false);
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={loading}
      className="text-destructive hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
