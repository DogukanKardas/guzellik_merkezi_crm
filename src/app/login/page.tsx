import { Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import LoginForm from "./login-form";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function LoginPage() {
  return (
    <div className={playfair.variable}>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-[#faf7f5] text-[#5c4a4a]">
            Yükleniyor...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
