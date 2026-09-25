"use client";

import Cookies from "js-cookie";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { nature } from "@/lib/fonts";
import AuthLayout from "@/components/auth/AuthLayout";

export default function VerifyEmailPage() {
  const t = useTranslations("Auth.verifyEmail");
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email";

  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setErrorMessage(t("errorEmpty"));
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (!res.ok) {
        const errorMessage = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || t("errorGeneric");
        setErrorMessage(errorMessage);
        return;
      }

      if (data.access_token) {
        Cookies.set("access_token", data.access_token, { expires: 7 });
      }
      router.push("/blog");
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResent(true);
    setTimeout(() => setResent(false), 30000);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/resend-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  return (
    <AuthLayout tagline={t("tagline")} taglineDetail={t("taglineDetail")}>
      <div className="text-center sm:text-left">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 sm:mx-0">
          <Mail className="h-6 w-6 text-accent" />
        </div>

        <h1 className={`${nature.className} mb-3 text-3xl text-foreground`}>
          {t("title")}
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {t("subtitlePrefix")}{" "}
          <span className="font-medium text-foreground">{email}</span>
          {t("subtitleSuffix")}
        </p>

        <form onSubmit={handleVerify}>
          <div className="mb-6 flex justify-between gap-2 sm:justify-start sm:gap-3" dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => { inputRefs.current[index] = el; }}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="h-12 w-11 rounded-lg border border-[#FEFAE0]/15 bg-background text-center text-xl font-bold text-foreground transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:h-14 sm:w-12"
              />
            ))}
          </div>

          {errorMessage && (
            <p className="mb-4 text-xs font-medium text-red-500">{errorMessage}</p>
          )}

          <Button
            type="submit"
            disabled={loading || otp.join("").length < 6}
            className="mb-4 h-11 w-full rounded-full bg-accent text-accent-foreground transition-all hover:bg-accent/80 sm:w-auto sm:px-8"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("verifyCode")}
          </Button>
        </form>

        <div className="mt-4 text-xs text-muted-foreground">
          {t("noCode")}{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resent}
            className="font-medium text-foreground underline hover:text-accent disabled:opacity-50"
          >
            {resent ? t("resent") : t("resend")}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
