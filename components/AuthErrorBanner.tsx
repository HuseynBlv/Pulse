import { Text, View } from "react-native";

type AuthErrorBannerProps = {
  message: string | null;
};

export function AuthErrorBanner({ message }: AuthErrorBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <View className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
      <Text className="text-sm leading-6 text-red-200">{message}</Text>
    </View>
  );
}
