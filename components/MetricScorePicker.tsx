import { Pressable, Text, View } from "react-native";

import type { MetricScore } from "../types/check-in";

const scores: MetricScore[] = [1, 2, 3, 4, 5];

type MetricScorePickerProps = {
  hint: string;
  highLabel: string;
  label: string;
  lowLabel: string;
  onChange: (value: MetricScore) => void;
  value: MetricScore;
};

export function MetricScorePicker({
  hint,
  highLabel,
  label,
  lowLabel,
  onChange,
  value,
}: MetricScorePickerProps) {
  return (
    <View className="mb-5 rounded-3xl bg-slate-50 px-4 py-4">
      <Text className="text-lg font-semibold text-ink">{label}</Text>
      <Text className="mt-1 text-sm leading-6 text-slate-500">{hint}</Text>

      <View className="mt-4 flex-row gap-2">
        {scores.map((score) => {
          const isActive = value === score;

          return (
            <Pressable
              key={score}
              onPress={() => onChange(score)}
              className={`h-11 flex-1 items-center justify-center rounded-2xl border ${
                isActive
                  ? "border-pulse-600 bg-pulse-600"
                  : "border-slate-200 bg-white"
              }`}
            >
              <Text className={`text-base font-semibold ${isActive ? "text-white" : "text-ink"}`}>
                {score}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-3 flex-row justify-between">
        <Text className="text-xs font-medium uppercase tracking-[1.2px] text-slate-400">
          {lowLabel}
        </Text>
        <Text className="text-xs font-medium uppercase tracking-[1.2px] text-slate-400">
          {highLabel}
        </Text>
      </View>
    </View>
  );
}
