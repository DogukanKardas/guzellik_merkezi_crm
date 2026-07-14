import { Sidebar, Header } from "@/components/layout/sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50/50 via-background to-purple-50/30 dark:from-rose-950/20 dark:via-background dark:to-purple-950/20">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}

export { Header };
