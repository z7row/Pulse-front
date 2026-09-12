import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      tagline="A quiet place to read."
      taglineDetail="No ads, no noise — just long-form stories, paced like a walk through the woods."
    >
      <SignupForm />
    </AuthLayout>
  );
}