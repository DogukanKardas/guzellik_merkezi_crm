export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type PaymentMethod = "cash" | "card" | "transfer";
export type PaymentStatus = "paid" | "pending" | "refunded";
export type MessageChannel = "instagram" | "whatsapp";
export type MessageDirection = "inbound" | "outbound";

export interface Customer {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  instagram_handle: string | null;
  notes: string | null;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string;
  service_id: string;
  staff_name: string;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  customers?: Customer;
  services?: Service;
}

export interface Payment {
  id: string;
  customer_id: string;
  appointment_id: string | null;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  customers?: Customer;
  appointments?: Appointment;
}

export interface MessageThread {
  id: string;
  channel: MessageChannel;
  customer_id: string | null;
  contact_name: string;
  contact_handle: string | null;
  last_message_at: string;
  unread_count: number;
  created_at: string;
  customers?: Customer;
}

export interface Message {
  id: string;
  thread_id: string;
  channel: MessageChannel;
  customer_id: string | null;
  sender_name: string;
  sender_handle: string | null;
  content: string;
  direction: MessageDirection;
  is_read: boolean;
  created_at: string;
}

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: "Bekliyor",
  confirmed: "Onaylandı",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: "Nakit",
  card: "Kart",
  transfer: "Havale",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: "Ödendi",
  pending: "Bekliyor",
  refunded: "İade",
};
