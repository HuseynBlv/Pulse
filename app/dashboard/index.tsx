import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { SectionCard } from "../../components/SectionCard";

export default function DashboardHomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-[#0A0A0A]"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120 }}
    >
      <View className="mb-8">
        <Text className="text-sm font-medium uppercase tracking-[2px] text-[#A78BFA]">Pulse</Text>
        <Text className="mt-3 text-4xl font-semibold leading-tight text-white">
          Check in before the day gets noisy
        </Text>
        <Text className="mt-3 text-base leading-7 text-zinc-400">
          Capture how you slept, how your energy feels, and what your mind needs today.
        </Text>
      </View>

      <View className="rounded-[32px] border border-zinc-900 bg-zinc-950 px-6 py-6">
        <Text className="text-sm font-medium uppercase tracking-[1.8px] text-zinc-500">
          Daily ritual
        </Text>
        <Text className="mt-3 text-3xl font-semibold text-white">5 steps. About 2 minutes.</Text>
        <Text className="mt-3 text-base leading-7 text-zinc-400">
          Move through one question at a time, save your check-in, and come back later for
          patterns.
        </Text>

        <Link href="./check-in" asChild>
          <Pressable className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#7C3AED]">
            <Text className="text-base font-semibold text-white">Start today's check-in</Text>
          </Pressable>
        </Link>
      </View>

      <SectionCard
        eyebrow="Why it helps"
        title="Small entries, clearer trends"
        description="Pulse works best when the daily input feels light enough to keep doing."
      >
        <View className="gap-4">
          <View className="rounded-3xl bg-zinc-900 px-4 py-4">
            <Text className="text-sm font-medium uppercase tracking-[1.4px] text-zinc-500">
              Sleep and energy
            </Text>
            <Text className="mt-2 text-sm leading-6 text-zinc-300">
              Spot when better sleep actually translates into steadier energy.
            </Text>
          </View>
          <View className="rounded-3xl bg-zinc-900 px-4 py-4">
            <Text className="text-sm font-medium uppercase tracking-[1.4px] text-zinc-500">
              Anxiety and focus
            </Text>
            <Text className="mt-2 text-sm leading-6 text-zinc-300">
              Notice which days feel scattered, overloaded, or unexpectedly calm.
            </Text>
          </View>
        </View>
      </SectionCard>
    </ScrollView>
  );
}
