import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const styles = {
  rose: { icon: "text-rose-500", bg: "bg-rose-50" },
  amber: { icon: "text-amber-500", bg: "bg-amber-50" },
  purple: { icon: "text-purple-500", bg: "bg-purple-50" },
  emerald: { icon: "text-emerald-500", bg: "bg-emerald-50" },
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: keyof typeof styles;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const s = styles[color];

  return (
    <Card className="overflow-hidden border-rose-100">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold text-rose-950">{value}</p>
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              s.bg
            )}
          >
            <Icon className={cn("h-5 w-5", s.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
