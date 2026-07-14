export type Locale = "tr" | "en";

export const translations = {
  tr: {
    app: {
      name: "Güzellik Merkezi",
      subtitle: "Müşteri Takip",
      demoMode: "Demo Modu",
    },
    nav: {
      dashboard: "Dashboard",
      customers: "Müşteriler",
      appointments: "Randevular",
      payments: "Ödemeler",
      messages: "Mesajlar",
      services: "Hizmetler",
      settings: "Ayarlar",
      logout: "Çıkış Yap",
    },
    settings: {
      title: "Ayarlar",
      subtitle: "Uygulama tercihlerinizi yönetin",
      appearance: "Görünüm",
      appearanceDesc: "Tema ve dil ayarlarını özelleştirin",
      darkMode: "Karanlık Mod",
      darkModeDesc: "Arayüzü koyu renk temasına geçirir",
      language: "Dil",
      languageDesc: "Arayüz dilini seçin",
      languageTr: "Türkçe",
      languageEn: "English",
      notifications: "Bildirimler",
      notificationsDesc: "Demo bildirim tercihleri",
      emailNotifications: "E-posta Bildirimleri",
      emailNotificationsDesc: "Randevu hatırlatmaları için e-posta al",
      saved: "Ayarlar kaydedildi",
    },
    pages: {
      dashboard: "Dashboard",
      customers: "Müşteriler",
      appointments: "Randevular",
      payments: "Ödemeler",
      messages: "Mesajlar",
      services: "Hizmetler",
    },
  },
  en: {
    app: {
      name: "Beauty Center",
      subtitle: "Customer Tracking",
      demoMode: "Demo Mode",
    },
    nav: {
      dashboard: "Dashboard",
      customers: "Customers",
      appointments: "Appointments",
      payments: "Payments",
      messages: "Messages",
      services: "Services",
      settings: "Settings",
      logout: "Log Out",
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your application preferences",
      appearance: "Appearance",
      appearanceDesc: "Customize theme and language settings",
      darkMode: "Dark Mode",
      darkModeDesc: "Switch the interface to a dark color theme",
      language: "Language",
      languageDesc: "Select the interface language",
      languageTr: "Turkish",
      languageEn: "English",
      notifications: "Notifications",
      notificationsDesc: "Demo notification preferences",
      emailNotifications: "Email Notifications",
      emailNotificationsDesc: "Receive emails for appointment reminders",
      saved: "Settings saved",
    },
    pages: {
      dashboard: "Dashboard",
      customers: "Customers",
      appointments: "Appointments",
      payments: "Payments",
      messages: "Messages",
      services: "Services",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.tr;

export function getTranslation(locale: Locale) {
  return translations[locale];
}
