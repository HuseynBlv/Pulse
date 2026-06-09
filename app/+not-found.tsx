import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-3xl font-semibold text-ink">Page not found</Text>
      <Text className="mt-3 text-center text-base text-slate-500">
        The route you requested does not exist in Pulse.
      </Text>
      <Link href="/" asChild>
        <Pressable className="mt-6 rounded-full bg-pulse-600 px-5 py-3">
          <Text className="text-base font-semibold text-white">Return home</Text>
        </Pressable>
      </Link>
    </View>
  );
}
