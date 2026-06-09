import { Text, View } from "react-native";

export function PulseLogo() {
  return (
    <View className="flex-row items-center">
      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]">
        <Text className="text-xl font-semibold text-white">P</Text>
      </View>
      <View className="ml-4">
        <Text className="text-lg font-semibold text-white">Pulse</Text>
        <Text className="text-sm text-zinc-500">Mental health check-ins</Text>
      </View>
    </View>
  );
}
