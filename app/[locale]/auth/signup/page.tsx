import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const t = useTranslations("Auth.signupPage");

  return (
    <AuthLayout tagline={t("tagline")} taglineDetail={t("taglineDetail")}>
      <SignupForm />
    </AuthLayout>
  );
}
