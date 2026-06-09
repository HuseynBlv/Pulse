import { Redirect } from "expo-router";

import { FullScreenLoader } from "../components/FullScreenLoader";
import { useAuth } from "../hooks/useAuth";

export default function IndexScreen() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <Redirect href={session ? "/dashboard" : "/welcome"} />;
}
