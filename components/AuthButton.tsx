import { ActivityIndicator, Pressable, Text } from "react-native";

type AuthButtonProps = {
  isLoading?: boolean;
  label: string;
  loadingLabel?: string;
  onPress: () => void;
};

export function AuthButton({
  isLoading = false,
  label,
  loadingLabel = "Please wait...",
  onPress,
}: AuthButtonProps) {
  return (
    <Pressable
      disabled={isLoading}
      onPress={onPress}
      className={`h-14 flex-row items-center justify-center rounded-2xl ${
        isLoading ? "bg-[#7C3AED]/70" : "bg-[#7C3AED]"
      }`}
    >
      {isLoading ? <ActivityIndicator color="#FFFFFF" /> : null}
      <Text className={`text-base font-semibold text-white ${isLoading ? "ml-3" : ""}`}>
        {isLoading ? loadingLabel : label}
      </Text>
    </Pressable>
  );
}
