import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import { AuthButton } from "../../components/AuthButton";
import { AuthScreen } from "../../components/AuthScreen";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="light" />
      <AuthScreen
        title="A calmer way to check in every day."
        description="Track sleep, energy, anxiety, focus, and mood in two minutes. Pulse helps you notice patterns before they build up."
        footer={
          <View className="items-center">
            <Text className="text-sm text-zinc-500">Already have an account?</Text>
            <Link href="/sign-in" className="mt-2 text-sm font-semibold text-[#A78BFA]">
              Sign In
            </Link>
          </View>
        }
      >
        <AuthButton label="Get Started" onPress={() => router.push("/sign-up")} />
      </AuthScreen>
    </>
  );
}
