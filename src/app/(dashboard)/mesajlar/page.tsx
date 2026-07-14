import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { MessagesInbox } from "@/components/messages/messages-inbox";

export default function MessagesPage() {
  return (
    <>
      <PageHeader />
      <main className="flex-1 p-4 lg:p-8">
        <Suspense
          fallback={
            <div className="h-[calc(100vh-8rem)] animate-pulse rounded-xl bg-muted" />
          }
        >
          <MessagesInbox />
        </Suspense>
      </main>
    </>
  );
}
