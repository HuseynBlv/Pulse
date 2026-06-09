import { type PropsWithChildren } from "react";
import { Text, View } from "react-native";

type SectionCardProps = PropsWithChildren<{
  description: string;
  eyebrow: string;
  title: string;
}>;

export function SectionCard({ children, description, eyebrow, title }: SectionCardProps) {
  return (
    <View className="mb-5 rounded-[28px] bg-white px-5 py-5 shadow-sm">
      <Text className="text-xs font-medium uppercase tracking-[1.8px] text-pulse-600">
        {eyebrow}
      </Text>
      <Text className="mt-2 text-2xl font-semibold text-ink">{title}</Text>
      <Text className="mt-2 text-sm leading-6 text-slate-500">{description}</Text>
      <View className="mt-5">{children}</View>
    </View>
  );
}
