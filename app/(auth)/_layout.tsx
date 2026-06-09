import { Redirect, Stack } from "expo-router";

import { FullScreenLoader } from "../../components/FullScreenLoader";
import { useAuth } from "../../hooks/useAuth";

export default function AuthLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (session) {
    return <Redirect href="/dashboard" />;
  }

  return <Stack screenOptions={{ animation: "fade", headerShown: false }} />;
}
