"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nature } from "@/lib/fonts";
import SocialAuthButtons from "./SocialAuthButtons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


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
    // console.log("TODO: wire up login request", form);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form)
        });
      if (!res.ok) throw new Error("Invalid email or password");
      const data = await res.json();
    // console.log(data.access_token)
      if (data.access_token) {
        Cookies.set("access_token", data.access_token, { expires: 7 });
      }
      router.push("/blog")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className={`${nature.className} text-foreground text-3xl mb-2`}>Welcome back</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Log in to keep reading where you left off.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          required
        />

        <div>
          <Field
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
            required
            trailingIcon={showPassword ? EyeOff : Eye}
            onTrailingClick={() => setShowPassword((s) => !s)}
          />
          <div className="flex justify-end mt-2">
            <Link href="/forgot-password" className="text-xs text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full h-10 rounded-full bg-primary  text-cornsilk hover:bg-dark-moss transition-all"
        >
          {submitting ? "Logging in…" : "Log In"}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <SocialAuthButtons />

      <p className="text-sm text-muted-foreground text-center mt-8">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-accent font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

// Small shared input with a leading icon and optional trailing action icon
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
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-11 pr-11 rounded-xl border border-border bg-secondary/40 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-all"
      />
      {TrailingIcon && (
        <button
          type="button"
          onClick={onTrailingClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <TrailingIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
