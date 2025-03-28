import { useAppSelector } from "@/redux/hook/hooks";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  const checkauth = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!checkauth) {
      router.replace("/auth/login");
    }
  }, [checkauth, router]);

  return <Stack />;
}
