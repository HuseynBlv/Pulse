import { Redirect, Tabs } from "expo-router";

import { FullScreenLoader } from "../../components/FullScreenLoader";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!session) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#A78BFA",
        tabBarInactiveTintColor: "#71717A",
        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopColor: "#18181B",
          height: 68,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Check-in",
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
        }}
      />
    </Tabs>
  );
}
