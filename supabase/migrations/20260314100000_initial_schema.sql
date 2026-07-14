-- Güzellik Merkezi CRM - Initial Schema

CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'transfer');
CREATE TYPE payment_status AS ENUM ('paid', 'pending', 'refunded');
CREATE TYPE message_channel AS ENUM ('instagram', 'whatsapp');
CREATE TYPE message_direction AS ENUM ('inbound', 'outbound');

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  instagram_handle TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  staff_name TEXT NOT NULL DEFAULT 'Personel',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  status appointment_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  amount NUMERIC(10, 2) NOT NULL,
  method payment_method NOT NULL DEFAULT 'cash',
  status payment_status NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel message_channel NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_handle TEXT,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unread_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  channel message_channel NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_handle TEXT,
  content TEXT NOT NULL,
  direction message_direction NOT NULL DEFAULT 'inbound',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointments_starts_at ON appointments(starts_at);
CREATE INDEX idx_appointments_customer ON appointments(customer_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_messages_thread ON messages(thread_id);
CREATE INDEX idx_message_threads_channel ON message_threads(channel);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for demo" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON appointments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON message_threads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for demo" ON messages FOR ALL USING (true) WITH CHECK (true);
