import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { MetricScorePicker } from "../../components/MetricScorePicker";
import { SectionCard } from "../../components/SectionCard";
import { useCheckIn } from "../../hooks/useCheckIn";
import { METRIC_CONFIG, METRIC_KEYS } from "../../types/check-in";

export default function CheckInScreen() {
  const {
    checkIn,
    error,
    isSubmitting,
    isSupabaseConfigured,
    lastSavedAt,
    resetCheckIn,
    setMetric,
    setNote,
    submitCheckIn,
  } = useCheckIn();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120 }}
    >
      <View className="mb-6">
        <Text className="text-sm font-medium uppercase tracking-[2px] text-pulse-600">
          Pulse
        </Text>
        <Text className="mt-3 text-4xl font-semibold leading-tight text-ink">
          Daily 2-minute check-in
        </Text>
        <Text className="mt-3 text-base leading-7 text-slate-500">
          Track sleep, energy, anxiety, focus, and mood in under two minutes so weekly
          patterns are easy to spot.
        </Text>
      </View>

      <SectionCard
        eyebrow="Today"
        title={checkIn.check_in_date}
        description="Tap a score from 1 to 5 for each signal."
      >
        {METRIC_KEYS.map((metric) => {
          const config = METRIC_CONFIG[metric];

          return (
            <MetricScorePicker
              key={metric}
              hint={config.hint}
              label={config.label}
              lowLabel={config.lowLabel}
              highLabel={config.highLabel}
              value={checkIn[metric]}
              onChange={(value) => setMetric(metric, value)}
            />
          );
        })}
      </SectionCard>

      <SectionCard
        eyebrow="Optional"
        title="Quick context"
        description="Add one short note to make patterns easier to understand later."
      >
        <TextInput
          value={checkIn.note ?? ""}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
          placeholder="What felt heavy, easy, or different today?"
          placeholderTextColor="#94A3B8"
          textAlignVertical="top"
          className="min-h-28 rounded-3xl border border-slate-100 bg-slate-50 px-4 py-4 text-base text-ink"
        />
      </SectionCard>

      <View className="mt-6 gap-3">
        {!isSupabaseConfigured ? (
          <View className="rounded-3xl border border-warning/20 bg-amber-50 px-4 py-4">
            <Text className="text-sm font-medium text-ink">
              Add your Supabase keys to `.env` before saving real check-ins.
            </Text>
          </View>
        ) : null}

        {error ? (
          <View className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4">
            <Text className="text-sm font-medium text-red-700">{error}</Text>
          </View>
        ) : null}

        {lastSavedAt ? (
          <View className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-4">
            <Text className="text-sm font-medium text-emerald-700">
              Check-in saved at {lastSavedAt}.
            </Text>
          </View>
        ) : null}

        <Pressable
          onPress={() => {
            void submitCheckIn();
          }}
          className={`overflow-hidden rounded-full px-5 py-4 text-center text-base font-semibold text-white ${
            isSubmitting ? "bg-pulse-500/70" : "bg-pulse-600"
          }`}
        >
          <Text className="text-center text-base font-semibold text-white">
            {isSubmitting ? "Saving..." : "Save today's check-in"}
          </Text>
        </Pressable>

        <Pressable
          onPress={resetCheckIn}
          className="rounded-full border border-slate-200 px-5 py-4"
        >
          <Text className="text-center text-base font-semibold text-slate-700">Reset form</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
