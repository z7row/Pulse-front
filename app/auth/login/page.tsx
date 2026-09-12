import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      tagline="Good to see you again."
      taglineDetail="Pick up right where you left off — your saved stories are waiting."
    >
      <LoginForm />
    </AuthLayout>
  );
}