"use client";

import { useRouter } from "next/navigation";
import { updateAppointmentStatus } from "@/lib/actions";
import type { AppointmentStatus } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APPOINTMENT_STATUS_LABELS } from "@/lib/types";

export function AppointmentStatusSelect({
  id,
  status,
}: {
  id: string;
  status: AppointmentStatus;
}) {
  const router = useRouter();

  async function handleChange(value: string) {
    await updateAppointmentStatus(id, value as AppointmentStatus);
    router.refresh();
  }

  return (
    <Select defaultValue={status} onValueChange={handleChange}>
      <SelectTrigger className="h-8 w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(APPOINTMENT_STATUS_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
