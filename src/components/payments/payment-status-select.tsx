"use client";

import { useRouter } from "next/navigation";
import { updatePaymentStatus } from "@/lib/actions";
import type { PaymentStatus } from "@/lib/types";
import { useSettings } from "@/lib/i18n/settings-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PaymentStatusSelect({
  id,
  status,
}: {
  id: string;
  status: PaymentStatus;
}) {
  const router = useRouter();
  const { t } = useSettings();

  async function handleChange(value: string) {
    await updatePaymentStatus(id, value as PaymentStatus);
    router.refresh();
  }

  return (
    <Select defaultValue={status} onValueChange={handleChange}>
      <SelectTrigger className="h-8 w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(
          Object.entries(t.status.payment) as [PaymentStatus, string][]
        ).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
