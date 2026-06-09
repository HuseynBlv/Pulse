import { Text, TextInput, View } from "react-native";

type AuthTextFieldProps = {
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?:
    | "email"
    | "password"
    | "username"
    | "name"
    | "off"
    | "one-time-code"
    | "sms-otp";
  keyboardType?: "default" | "email-address";
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  textContentType?:
    | "none"
    | "emailAddress"
    | "password"
    | "username"
    | "name"
    | "newPassword"
    | "oneTimeCode";
  value: string;
};

export function AuthTextField({
  autoCapitalize = "none",
  autoComplete,
  keyboardType = "default",
  label,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  textContentType,
  value,
}: AuthTextFieldProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-zinc-200">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        placeholder={placeholder}
        placeholderTextColor="#71717A"
        className="h-14 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 text-base text-white"
      />
    </View>
  );
}
