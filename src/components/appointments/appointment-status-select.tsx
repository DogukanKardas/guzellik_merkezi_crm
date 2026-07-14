"use client";

import { useRouter } from "next/navigation";
import { updateAppointmentStatus } from "@/lib/actions";
import type { AppointmentStatus } from "@/lib/types";
import { useSettings } from "@/lib/i18n/settings-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AppointmentStatusSelect({
  id,
  status,
}: {
  id: string;
  status: AppointmentStatus;
}) {
  const router = useRouter();
  const { t } = useSettings();

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
        {(
          Object.entries(t.status.appointment) as [AppointmentStatus, string][]
        ).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
