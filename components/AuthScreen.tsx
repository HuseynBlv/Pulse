import { type PropsWithChildren, type ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PulseLogo } from "./PulseLogo";

type AuthScreenProps = PropsWithChildren<{
  description: string;
  footer?: ReactNode;
  title: string;
}>;

export function AuthScreen({ children, description, footer, title }: AuthScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-between">
            <View>
              <PulseLogo />
              <Text className="mt-12 text-4xl font-semibold leading-tight text-white">
                {title}
              </Text>
              <Text className="mt-4 text-base leading-7 text-zinc-400">{description}</Text>
              <View className="mt-10 gap-4">{children}</View>
            </View>

            {footer ? <View className="mt-10 pb-4">{footer}</View> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
