import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { SectionCard } from "../../components/SectionCard";
import { useTodayCheckin } from "../../hooks/useTodayCheckin";

export default function DashboardHomeScreen() {
  const { error, hasCheckedInToday, isLoading, todayCheckin } = useTodayCheckin();

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

        {isLoading ? (
          <>
            <Text className="mt-3 text-3xl font-semibold text-white">Checking today's status...</Text>
            <Text className="mt-3 text-base leading-7 text-zinc-400">
              Pulling your latest check-in from Supabase.
            </Text>
          </>
        ) : hasCheckedInToday && todayCheckin ? (
          <>
            <Text className="mt-3 text-3xl font-semibold text-white">Today's check-in is done</Text>
            <Text className="mt-3 text-base leading-7 text-zinc-400">
              You already checked in today, so the next entry opens tomorrow.
            </Text>

            <View className="mt-6 flex-row flex-wrap gap-3">
              <MetricPill label="Sleep" value={todayCheckin.sleep} />
              <MetricPill label="Energy" value={todayCheckin.energy} />
              <MetricPill label="Anxiety" value={todayCheckin.anxiety} />
              <MetricPill label="Focus" value={todayCheckin.focus} />
              <MetricPill label="Mood" value={todayCheckin.mood} />
            </View>

            {todayCheckin.note ? (
              <View className="mt-5 rounded-3xl border border-zinc-800 bg-[#0A0A0A] px-4 py-4">
                <Text className="text-xs font-medium uppercase tracking-[1.4px] text-zinc-500">
                  Note
                </Text>
                <Text className="mt-2 text-sm leading-6 text-zinc-300">{todayCheckin.note}</Text>
              </View>
            ) : null}
          </>
        ) : (
          <>
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
          </>
        )}

        {error ? (
          <View className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <Text className="text-sm leading-6 text-red-200">
              We could not load today's check-in. {error}
            </Text>
          </View>
        ) : null}
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

function MetricPill({ label, value }: { label: string; value: number }) {
  return (
    <View className="min-w-[92px] rounded-2xl border border-zinc-800 bg-[#0A0A0A] px-4 py-4">
      <Text className="text-xs font-medium uppercase tracking-[1.3px] text-zinc-500">{label}</Text>
      <Text className="mt-2 text-2xl font-semibold text-white">{value}/5</Text>
    </View>
  );
}
