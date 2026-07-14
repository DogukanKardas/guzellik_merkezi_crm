# Güzellik Merkezi — Müşteri Takip Sistemi

Demo amaçlı güzellik merkezi CRM paneli. Next.js + Supabase + Vercel.

## Özellikler

- Gömülü giriş (admin / demo123)
- Dashboard: randevu, ödeme, mesaj özeti
- Müşteri yönetimi (CRUD, arama, detay)
- Randevu takibi (liste, durum güncelleme, yeni randevu)
- Ödeme takibi (tahsilat özeti, durum güncelleme)
- Hizmet kataloğu
- Simüle Instagram / WhatsApp mesaj kutusu

## Kurulum

### 1. Bağımlılıklar

```bash
npm install
```

### 2. Supabase

1. [Supabase](https://supabase.com) projesi oluşturun
2. SQL Editor'de sırayla çalıştırın:
   - `supabase/migrations/20260314100000_initial_schema.sql`
   - `supabase/migrations/20260314100001_seed_data.sql`

### 3. Ortam değişkenleri

`.env.local` dosyası oluşturun (`.env.local.example` referans alın):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DEMO_USERNAME=admin
DEMO_PASSWORD=demo123
SESSION_SECRET=random-secret-string
```

### 4. Geliştirme

```bash
npm run dev
```

Tarayıcıda: http://localhost:3000/login

## Vercel Deploy

1. Repoyu GitHub'a push edin
2. Vercel'de yeni proje oluşturun
3. Environment Variables ekleyin (yukarıdaki tüm değişkenler)
4. Deploy

## Demo Giriş

| Alan | Değer |
|------|-------|
| Kullanıcı | admin |
| Şifre | demo123 |

## Teknolojiler

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL)
- Vercel
