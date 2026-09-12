"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nature } from "@/lib/fonts";
import * as Checkbox from "@radix-ui/react-checkbox";
import SocialAuthButtons from "./SocialAuthButtons";
import PasswordStrength from "./PasswordStrength";
import Cookies from "js-cookie";
export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [agreed, setAgreed] = useState(false);
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms to continue");
      return;
    }

    setSubmitting(true);
    try {
const { confirmPassword, ...cleanFormData } = form;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanFormData)
        });
const data = await res.json();

    if (!res.ok) {
      // NestJS عادة بيرجع الخطأ في data.message (سواء string أو array)
      const errorMessage = Array.isArray(data.message) 
        ? data.message.join(", ") 
        : data.message || "حدث خطأ غير متوقع";

      // تقدر تعرض الرسالة في Toast أو State عندك في الواجهة
      // console.error("API Error:", errorMessage);
      setError(errorMessage)
      return;
    }
      // console.log(data.access_token)
      // if (data.access_token) {
      //   Cookies.set("access_token", data.access_token, { expires: 7 });
      // }


      // Signup requires email verification before reaching the blog (per spec).
      router.push(`/auth/verify-email?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className={`${nature.className} text-foreground text-3xl mb-2`}>Get started</h1>
      <p className="text-muted-foreground text-sm mb-2">
        Create your account — it only takes a minute.
      </p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Field
          icon={User}
          type="text"
          placeholder="Full name"
          value={form.name}
          className=""
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          required
        />
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
          <PasswordStrength password={form.password} />
        </div>
        <Field
          icon={Lock}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={(v) => setForm((f) => ({ ...f, confirmPassword: v }))}
          required
        />

        <label className="flex items-end gap-2 text-xs text-muted-foreground">
          <Checkbox.Root
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
            className="mt-0.5 flex h-4 w-4 items-center justify-center rounded border border-border bg-background shadow-sm data-[state=checked]:bg-dark-moss data-[state=checked]:text-white"
          >
            <Checkbox.Indicator className="flex items-center justify-center text-current">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                <path
                  d="M12.2 4.2 6.8 9.6 4.1 6.9 3 8l3.8 3.8 6.2-6.2L12.2 4.2Z"
                  fill="currentColor"
                />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
          I agree to the{" "}
          <Link href="/terms" className="text-accent hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
        </label>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full h-10 rounded-full bg-primary  text-cornsilk hover:bg-dark-moss transition-all"
        >
          {submitting ? "Creating account…" : "Sign Up"}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <SocialAuthButtons />

      <p className="text-sm text-muted-foreground text-center mt-2">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-accent font-medium hover:underline">
          Log in
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
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 pl-11 pr-11 rounded-xl border border-border bg-secondary/40 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-all"
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
