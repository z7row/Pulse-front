"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { nature } from "@/lib/fonts";
import SocialAuthButtons from "./SocialAuthButtons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const t = useTranslations("Auth.login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      router.push("/blog");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(t("invalidCredentials"));
      const data = await res.json();
      if (data.access_token) {
        Cookies.set("access_token", data.access_token, { expires: 7 });
      }
      router.push("/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("genericError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className={`${nature.className} text-foreground text-3xl mb-2`}>{t("title")}</h1>
      <p className="mb-8 text-muted-foreground text-sm">{t("subtitle")}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          icon={Mail}
          type="email"
          placeholder={t("emailPlaceholder")}
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          required
        />

        <div>
          <Field
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            value={form.password}
            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
            required
            trailingIcon={showPassword ? EyeOff : Eye}
            onTrailingClick={() => setShowPassword((s) => !s)}
          />
          <div className="flex justify-end mt-2">
            <Link href="/forgot-password" className="text-accent text-xs hover:underline">
              {t("forgotPassword")}
            </Link>
          </div>
        </div>

        {error && <p className="text-destructive text-xs">{error}</p>}

        <Button
          type="submit"
          disabled={submitting}
          className="h-10 w-full text-cornsilk bg-primary rounded-full hover:bg-dark-moss transition-all"
        >
          {submitting ? t("submitting") : t("submit")}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-border flex-1" />
        <span className="text-muted-foreground text-xs">{t("orContinueWith")}</span>
        <div className="h-px bg-border flex-1" />
      </div>

      <SocialAuthButtons />

      <p className="mt-8 text-center text-muted-foreground text-sm">
        {t("noAccount")}{" "}
        <Link href="/auth/signup" className="font-medium text-accent hover:underline">
          {t("signupLink")}
        </Link>
      </p>
    </div>
  );
}

function Field({
  icon: Icon,
  trailingIcon: TrailingIcon,
  onTrailingClick,
  value,
  onChange,
  ...rest
}: {
  icon: React.ElementType;
  trailingIcon?: React.ElementType;
  onTrailingClick?: () => void;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div className="relative">
      <Icon className="absolute h-4 w-4 text-muted-foreground -translate-y-1/2 left-4 top-1/2" />
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full pl-11 pr-11 text-foreground text-sm placeholder:text-muted-foreground bg-secondary/40 border border-border rounded-xl focus:border-accent transition-all focus:outline-none"
      />
      {TrailingIcon && (
        <button
          type="button"
          onClick={onTrailingClick}
          className="absolute text-muted-foreground hover:text-foreground -translate-y-1/2 right-4 top-1/2"
        >
          <TrailingIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
