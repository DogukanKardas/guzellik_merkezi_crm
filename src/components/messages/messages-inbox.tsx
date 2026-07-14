"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AtSign, MessageCircle, Send } from "lucide-react";
import {
  getMessageThreads,
  getThreadMessages,
  sendReply,
  markThreadRead,
} from "@/lib/actions";
import type { Message, MessageChannel, MessageThread } from "@/lib/types";
import { useSettings } from "@/lib/i18n/settings-context";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatRelative, formatTime } from "@/lib/format";
import { panelClass } from "@/lib/ui-classes";

export function MessagesInbox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, t } = useSettings();
  const [channel, setChannel] = useState<MessageChannel | "all">("all");
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(
    searchParams.get("thread")
  );
  const [reply, setReply] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getMessageThreads(
        channel === "all" ? undefined : channel
      );
      setThreads(data);
    });
  }, [channel]);

  useEffect(() => {
    if (!selectedThread) {
      setMessages([]);
      return;
    }
    startTransition(async () => {
      await markThreadRead(selectedThread);
      const data = await getThreadMessages(selectedThread);
      setMessages(data);
      router.refresh();
    });
  }, [selectedThread, router]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedThread || !reply.trim()) return;
    await sendReply(selectedThread, reply.trim());
    setReply("");
    const data = await getThreadMessages(selectedThread);
    setMessages(data);
    const updatedThreads = await getMessageThreads(
      channel === "all" ? undefined : channel
    );
    setThreads(updatedThreads);
    router.refresh();
  }

  const activeThread = threads.find((th) => th.id === selectedThread);

  return (
    <div
      className={cn(
        panelClass,
        "flex h-[calc(100vh-8rem)] overflow-hidden"
      )}
    >
      <div className="flex w-full flex-col border-r border-border sm:w-80 lg:w-96">
        <div className="border-b border-border p-3">
          <Tabs
            value={channel}
            onValueChange={(v) => setChannel(v as MessageChannel | "all")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                {t.messages.all}
              </TabsTrigger>
              <TabsTrigger value="instagram" className="flex-1 gap-1">
                <AtSign className="h-3 w-3" />
                IG
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex-1 gap-1">
                <MessageCircle className="h-3 w-3" />
                WA
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ScrollArea className="flex-1">
          {threads.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              {t.messages.noThreads}
            </p>
          ) : (
            threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-muted/50",
                  selectedThread === thread.id && "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
                    thread.channel === "instagram"
                      ? "bg-gradient-to-br from-pink-500 to-purple-600"
                      : "bg-emerald-500"
                  )}
                >
                  {thread.channel === "instagram" ? (
                    <AtSign className="h-4 w-4" />
                  ) : (
                    <MessageCircle className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {thread.contact_name}
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatRelative(thread.last_message_at, locale)}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {thread.contact_handle}
                  </p>
                </div>
                {thread.unread_count > 0 && (
                  <Badge className="shrink-0 bg-rose-500">
                    {thread.unread_count}
                  </Badge>
                )}
              </button>
            ))
          )}
        </ScrollArea>
      </div>

      <div className="hidden flex-1 flex-col sm:flex">
        {!activeThread ? (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageCircle className="mx-auto mb-3 h-12 w-12 opacity-30" />
              <p className="text-sm">{t.messages.selectConversation}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-border p-4">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-white",
                  activeThread.channel === "instagram"
                    ? "bg-gradient-to-br from-pink-500 to-purple-600"
                    : "bg-emerald-500"
                )}
              >
                {activeThread.channel === "instagram" ? (
                  <AtSign className="h-4 w-4" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="font-medium">{activeThread.contact_name}</p>
                <p className="text-xs text-muted-foreground">
                  {activeThread.channel === "instagram"
                    ? t.messages.instagramDirect
                    : t.messages.whatsappBusiness}
                  {activeThread.contact_handle &&
                    ` · ${activeThread.contact_handle}`}
                </p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.direction === "outbound"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                        msg.direction === "outbound"
                          ? "rounded-br-sm bg-gradient-to-r from-rose-500 to-purple-500 text-white"
                          : "rounded-bl-sm bg-muted text-foreground"
                      )}
                    >
                      {msg.direction === "inbound" && (
                        <p className="mb-0.5 text-xs font-medium opacity-70">
                          {msg.sender_name}
                        </p>
                      )}
                      <p>{msg.content}</p>
                      <p
                        className={cn(
                          "mt-1 text-right text-xs",
                          msg.direction === "outbound"
                            ? "text-white/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {formatTime(msg.created_at, locale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSend}
              className="flex gap-2 border-t border-border p-4"
            >
              <Input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={t.messages.placeholder}
                disabled={isPending}
              />
              <Button
                type="submit"
                disabled={isPending || !reply.trim()}
                className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
