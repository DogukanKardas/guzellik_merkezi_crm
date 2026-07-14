-- Demo seed data

INSERT INTO customers (id, full_name, phone, email, instagram_handle, notes) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Ayşe Yılmaz', '0532 111 2233', 'ayse.yilmaz@email.com', '@ayseyilmaz', 'Cilt bakımı düzenli müşteri'),
  ('11111111-1111-1111-1111-111111111102', 'Zeynep Kaya', '0533 222 3344', 'zeynep.kaya@email.com', '@zeynepkaya', 'Lazer epilasyon paketi'),
  ('11111111-1111-1111-1111-111111111103', 'Elif Demir', '0534 333 4455', 'elif.demir@email.com', '@elifdemir', NULL),
  ('11111111-1111-1111-1111-111111111104', 'Merve Aydın', '0535 444 5566', 'merve.aydin@email.com', '@merveaydin', 'Saç boyama tercih ediyor'),
  ('11111111-1111-1111-1111-111111111105', 'Selin Öztürk', '0536 555 6677', 'selin.ozturk@email.com', '@selinozturk', NULL),
  ('11111111-1111-1111-1111-111111111106', 'Buse Çelik', '0537 666 7788', 'buse.celik@email.com', '@busecelik', 'VIP müşteri'),
  ('11111111-1111-1111-1111-111111111107', 'Deniz Arslan', '0538 777 8899', 'deniz.arslan@email.com', '@denizarslan', NULL),
  ('11111111-1111-1111-1111-111111111108', 'Cansu Yıldız', '0539 888 9900', 'cansu.yildiz@email.com', '@cansuyildiz', 'Manikür düzenli'),
  ('11111111-1111-1111-1111-111111111109', 'Gizem Şahin', '0540 999 0011', 'gizem.sahin@email.com', '@gizemsahin', NULL),
  ('11111111-1111-1111-1111-111111111110', 'Esra Koç', '0541 100 1122', 'esra.koc@email.com', '@esrakoc', 'Botoks takibi yapılıyor'),
  ('11111111-1111-1111-1111-111111111111', 'Hande Polat', '0542 211 2233', 'hande.polat@email.com', '@handepolat', NULL),
  ('11111111-1111-1111-1111-111111111112', 'Tuğba Aksoy', '0543 322 3344', 'tugba.aksoy@email.com', '@tugbaaksoy', NULL),
  ('11111111-1111-1111-1111-111111111113', 'Pınar Güneş', '0544 433 4455', 'pinar.gunes@email.com', '@pinargunes', NULL),
  ('11111111-1111-1111-1111-111111111114', 'Seda Yurt', '0545 544 5566', 'seda.yurt@email.com', '@sedayurt', 'Peeling seansları'),
  ('11111111-1111-1111-1111-111111111115', 'Burcu Tan', '0546 655 6677', 'burcu.tan@email.com', '@burcutan', NULL);

INSERT INTO services (id, name, category, duration_minutes, price) VALUES
  ('22222222-2222-2222-2222-222222222201', 'Cilt Bakımı', 'Cilt Bakımı', 60, 1500.00),
  ('22222222-2222-2222-2222-222222222202', 'Hydrafacial', 'Cilt Bakımı', 45, 2000.00),
  ('22222222-2222-2222-2222-222222222203', 'Botoks Uygulaması', 'Estetik', 30, 3500.00),
  ('22222222-2222-2222-2222-222222222204', 'Dolgu Uygulaması', 'Estetik', 45, 4500.00),
  ('22222222-2222-2222-2222-222222222205', 'Saç Boyama', 'Saç', 120, 1800.00),
  ('22222222-2222-2222-2222-222222222206', 'Manikür', 'Tırnak', 45, 500.00),
  ('22222222-2222-2222-2222-222222222207', 'Pedikür', 'Tırnak', 60, 650.00),
  ('22222222-2222-2222-2222-222222222208', 'Lazer Epilasyon', 'Lazer', 30, 1200.00),
  ('22222222-2222-2222-2222-222222222209', 'Kaş Laminasyon', 'Kaş/Kirpik', 30, 800.00),
  ('22222222-2222-2222-2222-222222222210', 'Kirpik Lifting', 'Kaş/Kirpik', 45, 900.00);

INSERT INTO appointments (id, customer_id, service_id, staff_name, starts_at, ends_at, status, notes) VALUES
  ('33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222201', 'Dr. Seda', now() + interval '2 hours', now() + interval '3 hours', 'confirmed', NULL),
  ('33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222208', 'Aylin', now() + interval '4 hours', now() + interval '4 hours 30 minutes', 'confirmed', 'Bacak bölgesi'),
  ('33333333-3333-3333-3333-333333333303', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222205', 'Merve H.', now() + interval '1 day', now() + interval '1 day 2 hours', 'pending', 'Karamel ton'),
  ('33333333-3333-3333-3333-333333333304', '11111111-1111-1111-1111-111111111106', '22222222-2222-2222-2222-222222222202', 'Dr. Seda', now() + interval '1 day 3 hours', now() + interval '1 day 3 hours 45 minutes', 'confirmed', NULL),
  ('33333333-3333-3333-3333-333333333305', '11111111-1111-1111-1111-111111111108', '22222222-2222-2222-2222-222222222206', 'Elif T.', now() + interval '2 days', now() + interval '2 days 45 minutes', 'pending', NULL),
  ('33333333-3333-3333-3333-333333333306', '11111111-1111-1111-1111-111111111110', '22222222-2222-2222-2222-222222222203', 'Dr. Seda', now() + interval '3 days', now() + interval '3 days 30 minutes', 'confirmed', 'Alın bölgesi'),
  ('33333333-3333-3333-3333-333333333307', '11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222209', 'Aylin', now() - interval '1 day', now() - interval '1 day' + interval '30 minutes', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333308', '11111111-1111-1111-1111-111111111105', '22222222-2222-2222-2222-222222222207', 'Elif T.', now() - interval '2 days', now() - interval '2 days' + interval '1 hour', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333309', '11111111-1111-1111-1111-111111111107', '22222222-2222-2222-2222-222222222210', 'Aylin', now() - interval '3 days', now() - interval '3 days' + interval '45 minutes', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333310', '11111111-1111-1111-1111-111111111109', '22222222-2222-2222-2222-222222222201', 'Dr. Seda', now() - interval '5 days', now() - interval '5 days' + interval '1 hour', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333311', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222204', 'Dr. Seda', now() + interval '5 days', now() + interval '5 days 45 minutes', 'pending', NULL),
  ('33333333-3333-3333-3333-333333333312', '11111111-1111-1111-1111-111111111112', '22222222-2222-2222-2222-222222222208', 'Aylin', now() + interval '6 days', now() + interval '6 days 30 minutes', 'confirmed', NULL),
  ('33333333-3333-3333-3333-333333333313', '11111111-1111-1111-1111-111111111113', '22222222-2222-2222-2222-222222222205', 'Merve H.', now() + interval '7 days', now() + interval '7 days 2 hours', 'pending', NULL),
  ('33333333-3333-3333-3333-333333333314', '11111111-1111-1111-1111-111111111114', '22222222-2222-2222-2222-222222222202', 'Dr. Seda', now() - interval '7 days', now() - interval '7 days' + interval '45 minutes', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333315', '11111111-1111-1111-1111-111111111115', '22222222-2222-2222-2222-222222222206', 'Elif T.', now() + interval '8 hours', now() + interval '8 hours 45 minutes', 'confirmed', NULL),
  ('33333333-3333-3333-3333-333333333316', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222208', 'Aylin', now() - interval '10 days', now() - interval '10 days' + interval '30 minutes', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333317', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222208', 'Aylin', now() - interval '14 days', now() - interval '14 days' + interval '30 minutes', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333318', '11111111-1111-1111-1111-111111111106', '22222222-2222-2222-2222-222222222203', 'Dr. Seda', now() - interval '20 days', now() - interval '20 days' + interval '30 minutes', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333319', '11111111-1111-1111-1111-111111111110', '22222222-2222-2222-2222-222222222203', 'Dr. Seda', now() - interval '30 days', now() - interval '30 days' + interval '30 minutes', 'completed', NULL),
  ('33333333-3333-3333-3333-333333333320', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222205', 'Merve H.', now() - interval '45 days', now() - interval '45 days' + interval '2 hours', 'cancelled', 'Müşteri iptal etti');

INSERT INTO payments (id, customer_id, appointment_id, amount, method, status, paid_at, notes) VALUES
  ('44444444-4444-4444-4444-444444444401', '11111111-1111-1111-1111-111111111103', '33333333-3333-3333-3333-333333333307', 800.00, 'card', 'paid', now() - interval '1 day', NULL),
  ('44444444-4444-4444-4444-444444444402', '11111111-1111-1111-1111-111111111105', '33333333-3333-3333-3333-333333333308', 650.00, 'cash', 'paid', now() - interval '2 days', NULL),
  ('44444444-4444-4444-4444-444444444403', '11111111-1111-1111-1111-111111111107', '33333333-3333-3333-3333-333333333309', 900.00, 'card', 'paid', now() - interval '3 days', NULL),
  ('44444444-4444-4444-4444-444444444404', '11111111-1111-1111-1111-111111111109', '33333333-3333-3333-3333-333333333310', 1500.00, 'transfer', 'paid', now() - interval '5 days', NULL),
  ('44444444-4444-4444-4444-444444444405', '11111111-1111-1111-1111-111111111114', '33333333-3333-3333-3333-333333333314', 2000.00, 'card', 'paid', now() - interval '7 days', NULL),
  ('44444444-4444-4444-4444-444444444406', '11111111-1111-1111-1111-111111111101', '33333333-3333-3333-3333-333333333316', 1200.00, 'card', 'paid', now() - interval '10 days', NULL),
  ('44444444-4444-4444-4444-444444444407', '11111111-1111-1111-1111-111111111102', '33333333-3333-3333-3333-333333333317', 1200.00, 'card', 'paid', now() - interval '14 days', NULL),
  ('44444444-4444-4444-4444-444444444408', '11111111-1111-1111-1111-111111111106', '33333333-3333-3333-3333-333333333318', 3500.00, 'card', 'paid', now() - interval '20 days', NULL),
  ('44444444-4444-4444-4444-444444444409', '11111111-1111-1111-1111-111111111110', '33333333-3333-3333-3333-333333333319', 3500.00, 'transfer', 'paid', now() - interval '30 days', NULL),
  ('44444444-4444-4444-4444-444444444410', '11111111-1111-1111-1111-111111111104', '33333333-3333-3333-3333-333333333303', 1800.00, 'card', 'pending', NULL, 'Randevu öncesi ödeme'),
  ('44444444-4444-4444-4444-444444444411', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333311', 4500.00, 'card', 'pending', NULL, NULL),
  ('44444444-4444-4444-4444-444444444412', '11111111-1111-1111-1111-111111111115', NULL, 500.00, 'cash', 'paid', now() - interval '1 hour', 'Ürün satışı');

INSERT INTO message_threads (id, channel, customer_id, contact_name, contact_handle, last_message_at, unread_count) VALUES
  ('55555555-5555-5555-5555-555555555501', 'instagram', '11111111-1111-1111-1111-111111111101', 'Ayşe Yılmaz', '@ayseyilmaz', now() - interval '30 minutes', 2),
  ('55555555-5555-5555-5555-555555555502', 'instagram', '11111111-1111-1111-1111-111111111104', 'Merve Aydın', '@merveaydin', now() - interval '2 hours', 1),
  ('55555555-5555-5555-5555-555555555503', 'instagram', '11111111-1111-1111-1111-111111111110', 'Esra Koç', '@esrakoc', now() - interval '5 hours', 0),
  ('55555555-5555-5555-5555-555555555504', 'instagram', NULL, 'Yeni Takipçi', '@guzellik_merakli', now() - interval '1 day', 1),
  ('55555555-5555-5555-5555-555555555505', 'instagram', '11111111-1111-1111-1111-111111111106', 'Buse Çelik', '@busecelik', now() - interval '2 days', 0),
  ('55555555-5555-5555-5555-555555555506', 'whatsapp', '11111111-1111-1111-1111-111111111102', 'Zeynep Kaya', '0533 222 3344', now() - interval '15 minutes', 1),
  ('55555555-5555-5555-5555-555555555507', 'whatsapp', '11111111-1111-1111-1111-111111111108', 'Cansu Yıldız', '0539 888 9900', now() - interval '3 hours', 0),
  ('55555555-5555-5555-5555-555555555508', 'whatsapp', NULL, 'Bilinmeyen Numara', '0544 999 8877', now() - interval '6 hours', 2),
  ('55555555-5555-5555-5555-555555555509', 'whatsapp', '11111111-1111-1111-1111-111111111113', 'Pınar Güneş', '0544 433 4455', now() - interval '1 day', 0),
  ('55555555-5555-5555-5555-555555555510', 'whatsapp', '11111111-1111-1111-1111-111111111105', 'Selin Öztürk', '0536 555 6677', now() - interval '3 days', 0);

INSERT INTO messages (thread_id, channel, customer_id, sender_name, sender_handle, content, direction, is_read, created_at) VALUES
  ('55555555-5555-5555-5555-555555555501', 'instagram', '11111111-1111-1111-1111-111111111101', 'Ayşe Yılmaz', '@ayseyilmaz', 'Merhaba, yarın randevum var mıydı?', 'inbound', false, now() - interval '2 hours'),
  ('55555555-5555-5555-5555-555555555501', 'instagram', '11111111-1111-1111-1111-111111111101', 'Güzellik Merkezi', '@guzellikmerkezi', 'Merhaba Ayşe Hanım! Evet, yarın saat 14:00''te cilt bakımı randevunuz mevcut.', 'outbound', true, now() - interval '1 hour 50 minutes'),
  ('55555555-5555-5555-5555-555555555501', 'instagram', '11111111-1111-1111-1111-111111111101', 'Ayşe Yılmaz', '@ayseyilmaz', 'Teşekkürler! Bir de hydrafacial fiyatını öğrenebilir miyim?', 'inbound', false, now() - interval '30 minutes'),
  ('55555555-5555-5555-5555-555555555502', 'instagram', '11111111-1111-1111-1111-111111111104', 'Merve Aydın', '@merveaydin', 'Saç boyama için karamel ton yapıyor musunuz?', 'inbound', false, now() - interval '2 hours'),
  ('55555555-5555-5555-5555-555555555503', 'instagram', '11111111-1111-1111-1111-111111111110', 'Esra Koç', '@esrakoc', 'Botoks sonrası ne zaman makyaj yapabilirim?', 'inbound', true, now() - interval '6 hours'),
  ('55555555-5555-5555-5555-555555555503', 'instagram', '11111111-1111-1111-1111-111111111110', 'Güzellik Merkezi', '@guzellikmerkezi', '24 saat sonra hafif makyaj yapabilirsiniz. Detaylı bilgi için arayabilirsiniz.', 'outbound', true, now() - interval '5 hours'),
  ('55555555-5555-5555-5555-555555555504', 'instagram', NULL, 'Yeni Takipçi', '@guzellik_merakli', 'Lazer epilasyon fiyat listenizi paylaşır mısınız?', 'inbound', false, now() - interval '1 day'),
  ('55555555-5555-5555-5555-555555555505', 'instagram', '11111111-1111-1111-1111-111111111106', 'Buse Çelik', '@busecelik', 'Harika bir deneyimdi, teşekkürler! 💕', 'inbound', true, now() - interval '2 days'),
  ('55555555-5555-5555-5555-555555555505', 'instagram', '11111111-1111-1111-1111-111111111106', 'Güzellik Merkezi', '@guzellikmerkezi', 'Teşekkür ederiz Buse Hanım! Sizi tekrar görmekten mutluluk duyarız.', 'outbound', true, now() - interval '2 days' + interval '10 minutes'),
  ('55555555-5555-5555-5555-555555555506', 'whatsapp', '11111111-1111-1111-1111-111111111102', 'Zeynep Kaya', '0533 222 3344', 'Merhaba, bu hafta lazer seansı için uygun gün var mı?', 'inbound', false, now() - interval '15 minutes'),
  ('55555555-5555-5555-5555-555555555507', 'whatsapp', '11111111-1111-1111-1111-111111111108', 'Cansu Yıldız', '0539 888 9900', 'Manikür randevumu Cuma''ya alabilir miyiz?', 'inbound', true, now() - interval '4 hours'),
  ('55555555-5555-5555-5555-555555555507', 'whatsapp', '11111111-1111-1111-1111-111111111108', 'Güzellik Merkezi', '0532 000 0000', 'Tabii Cansu Hanım, Cuma 15:00 uygun mu?', 'outbound', true, now() - interval '3 hours'),
  ('55555555-5555-5555-5555-555555555508', 'whatsapp', NULL, 'Bilinmeyen Numara', '0544 999 8877', 'Adresinizi ve çalışma saatlerinizi öğrenebilir miyim?', 'inbound', false, now() - interval '7 hours'),
  ('55555555-5555-5555-5555-555555555508', 'whatsapp', NULL, 'Bilinmeyen Numara', '0544 999 8877', 'Cumartesi açık mısınız?', 'inbound', false, now() - interval '6 hours'),
  ('55555555-5555-5555-5555-555555555509', 'whatsapp', '11111111-1111-1111-1111-111111111113', 'Pınar Güneş', '0544 433 4455', 'Saç boyama randevusu onaylandı mı?', 'inbound', true, now() - interval '1 day'),
  ('55555555-5555-5555-5555-555555555509', 'whatsapp', '11111111-1111-1111-1111-111111111113', 'Güzellik Merkezi', '0532 000 0000', 'Evet Pınar Hanım, randevunuz onaylandı. Görüşmek üzere!', 'outbound', true, now() - interval '1 day' + interval '30 minutes'),
  ('55555555-5555-5555-5555-555555555510', 'whatsapp', '11111111-1111-1111-1111-111111111105', 'Selin Öztürk', '0536 555 6677', 'Pedikür sonrası çok memnun kaldım, teşekkürler!', 'inbound', true, now() - interval '3 days');
