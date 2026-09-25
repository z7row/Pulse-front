"use client";

import { useTranslations } from "next-intl";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): { score: number; key: string; color: string } {
  if (!password) return { score: 0, key: "", color: "bg-transparent" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, key: "weak", color: "bg-destructive" };
  if (score <= 3) return { score: 2, key: "fair", color: "bg-earth-yellow" };
  if (score === 4) return { score: 3, key: "good", color: "bg-light-moss" };
  return { score: 4, key: "strong", color: "bg-dark-moss" };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const t = useTranslations("Auth.passwordStrength");
  const { score, key, color } = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? color : "bg-border"
            }`}
          />
        ))}
      </div>
      {key && (
        <span className="text-xs text-muted-foreground mt-1 inline-block">
          {t(key)}
        </span>
      )}
    </div>
  );
}
