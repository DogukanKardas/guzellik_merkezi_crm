"use client";

import { useRouter } from "next/navigation";
import { updatePaymentStatus } from "@/lib/actions";
import type { PaymentStatus } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAYMENT_STATUS_LABELS } from "@/lib/types";

export function PaymentStatusSelect({
  id,
  status,
}: {
  id: string;
  status: PaymentStatus;
}) {
  const router = useRouter();

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
        {Object.entries(PAYMENT_STATUS_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
