import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FullScreenLoaderProps = {
  label?: string;
};

export function FullScreenLoader({ label = "Loading Pulse..." }: FullScreenLoaderProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <View className="flex-1 items-center justify-center px-6">
        <ActivityIndicator color="#7C3AED" size="large" />
        <Text className="mt-4 text-sm font-medium tracking-[1.2px] text-zinc-400">{label}</Text>
      </View>
    </SafeAreaView>
  );
}
