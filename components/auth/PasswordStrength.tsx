"use client";

interface PasswordStrengthProps {
  password: string;
}

// Simple heuristic: length + character variety. Good enough for client-side
// feedback — real strength/breach checking should still happen server-side.
function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "bg-transparent" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-destructive" };
  if (score <= 3) return { score: 2, label: "Fair", color: "bg-earth-yellow" };
  if (score === 4) return { score: 3, label: "Good", color: "bg-light-moss" };
  return { score: 4, label: "Strong", color: "bg-dark-moss" };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label, color } = getStrength(password);

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
      {label && <span className="text-xs text-muted-foreground mt-1 inline-block">{label} password</span>}
    </div>
  );
}
