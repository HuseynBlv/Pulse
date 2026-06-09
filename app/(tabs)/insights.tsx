import { ScrollView, Text, View } from "react-native";

import { SectionCard } from "../../components/SectionCard";
import { isSupabaseConfigured } from "../../lib/supabase";

const weeklyHighlights = [
  {
    label: "Average energy",
    value: "3.8 / 5",
    note: "Best on days after 7+ hours of sleep.",
  },
  {
    label: "Highest anxiety",
    value: "Wednesday",
    note: "Usually paired with low focus scores.",
  },
  {
    label: "Strongest pattern",
    value: "Sleep -> Mood",
    note: "Mood tends to rise when sleep is 4 or 5.",
  },
];

export default function InsightsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120 }}
    >
      <View className="mb-6">
        <Text className="text-sm font-medium uppercase tracking-[2px] text-pulse-600">
          Weekly view
        </Text>
        <Text className="mt-3 text-4xl font-semibold leading-tight text-ink">
          Spot patterns before they snowball
        </Text>
        <Text className="mt-3 text-base leading-7 text-slate-500">
          This screen is ready for charts and trend logic once your `daily_checkins` table is
          populated.
        </Text>
      </View>

      <SectionCard
        eyebrow="Connection"
        title={isSupabaseConfigured ? "Supabase ready" : "Supabase not configured"}
        description="Use EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in `.env`."
      >
        <View className="rounded-3xl bg-slate-50 px-4 py-4">
          <Text className="text-sm leading-6 text-slate-600">
            Once connected, this tab can fetch the latest 7 days of check-ins and render trends,
            streaks, averages, and correlation notes.
          </Text>
        </View>
      </SectionCard>

      <SectionCard
        eyebrow="Sample insights"
        title="Starter content"
        description="These placeholders help you shape the UI before wiring up analytics."
      >
        <View className="gap-4">
          {weeklyHighlights.map((item) => (
            <View key={item.label} className="rounded-3xl bg-slate-50 px-4 py-4">
              <Text className="text-sm font-medium uppercase tracking-[1.5px] text-slate-500">
                {item.label}
              </Text>
              <Text className="mt-2 text-2xl font-semibold text-ink">{item.value}</Text>
              <Text className="mt-2 text-sm leading-6 text-slate-600">{item.note}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScrollView>
  );
}
