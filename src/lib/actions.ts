"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  AppointmentStatus,
  MessageChannel,
  PaymentMethod,
  PaymentStatus,
} from "@/lib/types";

function getDb() {
  return createAdminClient();
}

// --- Customers ---

export async function getCustomers(search?: string) {
  const supabase = getDb();
  let query = supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function getCustomer(id: string) {
  const supabase = getDb();
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createCustomer(formData: FormData) {
  const supabase = getDb();
  const { error } = await supabase.from("customers").insert({
    full_name: formData.get("full_name") as string,
    phone: (formData.get("phone") as string) || null,
    email: (formData.get("email") as string) || null,
    instagram_handle: (formData.get("instagram_handle") as string) || null,
    notes: (formData.get("notes") as string) || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/musteriler");
}

export async function updateCustomer(id: string, formData: FormData) {
  const supabase = getDb();
  const { error } = await supabase
    .from("customers")
    .update({
      full_name: formData.get("full_name") as string,
      phone: (formData.get("phone") as string) || null,
      email: (formData.get("email") as string) || null,
      instagram_handle: (formData.get("instagram_handle") as string) || null,
      notes: (formData.get("notes") as string) || null,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/musteriler");
  revalidatePath(`/musteriler/${id}`);
}

export async function deleteCustomer(id: string) {
  const supabase = getDb();
  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/musteriler");
}

// --- Services ---

export async function getServices(activeOnly = false) {
  const supabase = getDb();
  let query = supabase.from("services").select("*").order("name");
  if (activeOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function createService(formData: FormData) {
  const supabase = getDb();
  const { error } = await supabase.from("services").insert({
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    duration_minutes: Number(formData.get("duration_minutes")),
    price: Number(formData.get("price")),
    is_active: formData.get("is_active") === "true",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/hizmetler");
}

export async function updateService(id: string, formData: FormData) {
  const supabase = getDb();
  const { error } = await supabase
    .from("services")
    .update({
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      duration_minutes: Number(formData.get("duration_minutes")),
      price: Number(formData.get("price")),
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/hizmetler");
}

export async function deleteService(id: string) {
  const supabase = getDb();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/hizmetler");
}

// --- Appointments ---

export async function getAppointments(from?: string, to?: string) {
  const supabase = getDb();
  let query = supabase
    .from("appointments")
    .select("*, customers(*), services(*)")
    .order("starts_at", { ascending: true });

  if (from) query = query.gte("starts_at", from);
  if (to) query = query.lte("starts_at", to);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function createAppointment(formData: FormData) {
  const supabase = getDb();
  const startsAt = formData.get("starts_at") as string;
  const durationMinutes = Number(formData.get("duration_minutes") ?? 60);
  const starts = new Date(startsAt);
  const ends = new Date(starts.getTime() + durationMinutes * 60000);

  const { error } = await supabase.from("appointments").insert({
    customer_id: formData.get("customer_id") as string,
    service_id: formData.get("service_id") as string,
    staff_name: (formData.get("staff_name") as string) || "Personel",
    starts_at: starts.toISOString(),
    ends_at: ends.toISOString(),
    status: (formData.get("status") as AppointmentStatus) || "pending",
    notes: (formData.get("notes") as string) || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/randevular");
  revalidatePath("/");
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
) {
  const supabase = getDb();
  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/randevular");
  revalidatePath("/");
}

export async function deleteAppointment(id: string) {
  const supabase = getDb();
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/randevular");
  revalidatePath("/");
}

// --- Payments ---

export async function getPayments(status?: PaymentStatus) {
  const supabase = getDb();
  let query = supabase
    .from("payments")
    .select("*, customers(*), appointments(*, services(*))")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function createPayment(formData: FormData) {
  const supabase = getDb();
  const status = (formData.get("status") as PaymentStatus) || "pending";
  const { error } = await supabase.from("payments").insert({
    customer_id: formData.get("customer_id") as string,
    appointment_id: (formData.get("appointment_id") as string) || null,
    amount: Number(formData.get("amount")),
    method: (formData.get("method") as PaymentMethod) || "cash",
    status,
    paid_at: status === "paid" ? new Date().toISOString() : null,
    notes: (formData.get("notes") as string) || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/odemeler");
  revalidatePath("/");
}

export async function updatePaymentStatus(id: string, status: PaymentStatus) {
  const supabase = getDb();
  const { error } = await supabase
    .from("payments")
    .update({
      status,
      paid_at: status === "paid" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/odemeler");
  revalidatePath("/");
}

// --- Messages ---

export async function getMessageThreads(channel?: MessageChannel) {
  const supabase = getDb();
  let query = supabase
    .from("message_threads")
    .select("*, customers(*)")
    .order("last_message_at", { ascending: false });

  if (channel) query = query.eq("channel", channel);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function getThreadMessages(threadId: string) {
  const supabase = getDb();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function sendReply(threadId: string, content: string) {
  const supabase = getDb();

  const { data: thread, error: threadError } = await supabase
    .from("message_threads")
    .select("*")
    .eq("id", threadId)
    .single();
  if (threadError) throw new Error(threadError.message);

  const { error: msgError } = await supabase.from("messages").insert({
    thread_id: threadId,
    channel: thread.channel,
    customer_id: thread.customer_id,
    sender_name: "Güzellik Merkezi",
    sender_handle: thread.channel === "instagram" ? "@guzellikmerkezi" : "0532 000 0000",
    content,
    direction: "outbound",
    is_read: true,
  });
  if (msgError) throw new Error(msgError.message);

  await supabase
    .from("message_threads")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", threadId);

  // Mark inbound messages as read
  await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("thread_id", threadId)
    .eq("direction", "inbound");

  await supabase
    .from("message_threads")
    .update({ unread_count: 0 })
    .eq("id", threadId);

  revalidatePath("/mesajlar");
  revalidatePath("/");
}

export async function markThreadRead(threadId: string) {
  const supabase = getDb();
  await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("thread_id", threadId)
    .eq("direction", "inbound");
  await supabase
    .from("message_threads")
    .update({ unread_count: 0 })
    .eq("id", threadId);
  revalidatePath("/mesajlar");
}

// --- Dashboard stats ---

export async function getDashboardStats() {
  const supabase = getDb();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const [
    todayAppointments,
    pendingPayments,
    unreadMessages,
    monthlyRevenue,
    upcomingAppointments,
    recentThreads,
  ] = await Promise.all([
    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .gte("starts_at", today.toISOString())
      .lt("starts_at", tomorrow.toISOString())
      .neq("status", "cancelled"),
    supabase
      .from("payments")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("message_threads")
      .select("unread_count"),
    supabase
      .from("payments")
      .select("amount")
      .eq("status", "paid")
      .gte("paid_at", monthStart.toISOString()),
    supabase
      .from("appointments")
      .select("*, customers(*), services(*)")
      .gte("starts_at", new Date().toISOString())
      .neq("status", "cancelled")
      .order("starts_at", { ascending: true })
      .limit(5),
    supabase
      .from("message_threads")
      .select("*, customers(*)")
      .gt("unread_count", 0)
      .order("last_message_at", { ascending: false })
      .limit(5),
  ]);

  const revenue =
    monthlyRevenue.data?.reduce((sum, p) => sum + Number(p.amount), 0) ?? 0;
  const unread =
    unreadMessages.data?.reduce((sum, t) => sum + t.unread_count, 0) ?? 0;

  return {
    todayAppointments: todayAppointments.count ?? 0,
    pendingPayments: pendingPayments.count ?? 0,
    unreadMessages: unread,
    monthlyRevenue: revenue,
    upcomingAppointments: upcomingAppointments.data ?? [],
    recentThreads: recentThreads.data ?? [],
  };
}

export async function getCustomerDetails(id: string) {
  const supabase = getDb();
  const [customer, appointments, payments, threads] = await Promise.all([
    supabase.from("customers").select("*").eq("id", id).single(),
    supabase
      .from("appointments")
      .select("*, services(*)")
      .eq("customer_id", id)
      .order("starts_at", { ascending: false }),
    supabase
      .from("payments")
      .select("*")
      .eq("customer_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("message_threads")
      .select("*")
      .eq("customer_id", id)
      .order("last_message_at", { ascending: false }),
  ]);

  if (customer.error) throw new Error(customer.error.message);

  return {
    customer: customer.data,
    appointments: appointments.data ?? [],
    payments: payments.data ?? [],
    threads: threads.data ?? [],
  };
}
