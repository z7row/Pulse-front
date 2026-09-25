import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Auth.loginPage");

  return (
    <AuthLayout tagline={t("tagline")} taglineDetail={t("taglineDetail")}>
      <LoginForm />
    </AuthLayout>
  );
}
