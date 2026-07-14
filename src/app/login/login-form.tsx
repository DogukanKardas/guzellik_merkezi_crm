"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Giriş başarısız");
      setLoading(false);
      return;
    }

    const redirect = searchParams.get("redirect") ?? "/";
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#faf7f5] text-[#3d2f2f]">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-[52%]">
        <div className="absolute inset-0 bg-[#f3ebe6]" />
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#e8d5cf]/60 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#dcc4bc]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIHN0cm9rZT0iI2M5YTBhMCIgc3Ryb2tlLW9wYWNpdHk9Ii4yNSIvPjwvZz48L3N2Zz4=')] opacity-40" />

        <div className="relative z-10 flex flex-col justify-between p-14 xl:p-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#9a7b73]">
              Güzellik & Bakım
            </p>
            <h1
              className="mt-6 font-[family-name:var(--font-playfair)] text-5xl font-medium leading-tight text-[#4a3535] xl:text-6xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Güzellik
              <br />
              Merkezi
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#7a6360]">
              Randevularınızı, müşterilerinizi ve ödemelerinizi tek panelden
              yönetin. Sade, hızlı ve düzenli bir çalışma deneyimi.
            </p>
          </div>

          <div className="space-y-4 border-t border-[#dcc4bc]/50 pt-8">
            <div className="flex gap-8 text-sm text-[#8a706c]">
              <div>
                <p className="font-medium text-[#5c4542]">Randevu</p>
                <p>Takvim & durum</p>
              </div>
              <div>
                <p className="font-medium text-[#5c4542]">Müşteri</p>
                <p>Kayıt & geçmiş</p>
              </div>
              <div>
                <p className="font-medium text-[#5c4542]">Mesaj</p>
                <p>IG & WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 lg:hidden">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9a7b73]">
              Güzellik Merkezi
            </p>
            <h1
              className="mt-3 text-3xl font-medium text-[#4a3535]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Hoş geldiniz
            </h1>
          </div>

          <div className="hidden lg:block">
            <h2
              className="text-3xl font-medium text-[#4a3535]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Hoş geldiniz
            </h2>
            <p className="mt-2 text-sm text-[#8a706c]">
              Panele erişmek için giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-[#5c4542]"
              >
                Kullanıcı adı
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="h-11 border-[#e8dcd6] bg-white text-[#3d2f2f] placeholder:text-[#b8a59f] focus-visible:border-[#b8897a] focus-visible:ring-[#b8897a]/20"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-[#5c4542]"
              >
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-11 border-[#e8dcd6] bg-white text-[#3d2f2f] placeholder:text-[#b8a59f] focus-visible:border-[#b8897a] focus-visible:ring-[#b8897a]/20"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#9b6b6b] text-white shadow-sm transition-colors hover:bg-[#865959] disabled:opacity-70"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="mt-8 rounded-xl border border-[#ebe0da] bg-white/70 px-4 py-3 text-center">
            <p className="text-xs text-[#8a706c]">Demo hesabı</p>
            <p className="mt-1 text-sm font-medium text-[#5c4542]">
              admin · demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
