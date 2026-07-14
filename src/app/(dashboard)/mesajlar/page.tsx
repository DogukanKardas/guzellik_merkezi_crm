import { Suspense } from "react";
import { Header } from "@/components/layout/sidebar";
import { MessagesInbox } from "@/components/messages/messages-inbox";

export default function MessagesPage() {
  return (
    <>
      <Header title="Mesajlar" />
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
