import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import type { MetricScore } from "../types/check-in";

type CheckInRatingCardProps = {
  description: string;
  emoji?: string;
  isSelected: boolean;
  label: string;
  onPress: (value: MetricScore) => void;
  value: MetricScore;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CheckInRatingCard({
  description,
  emoji,
  isSelected,
  label,
  onPress,
  value,
}: CheckInRatingCardProps) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(pressed.value, [0, 1], [1, 0.97]),
      },
    ],
  }));

  return (
    <AnimatedPressable
      onPress={() => onPress(value)}
      onPressIn={() => {
        pressed.value = withSpring(1, { damping: 20, stiffness: 220 });
      }}
      onPressOut={() => {
        pressed.value = withSpring(0, { damping: 20, stiffness: 220 });
      }}
      style={animatedStyle}
      className={`mb-4 rounded-3xl border px-5 py-5 ${
        isSelected
          ? "border-[#7C3AED] bg-[#7C3AED]/15"
          : "border-zinc-800 bg-zinc-950"
      }`}
    >
      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-1">
          <Text className={`text-xl font-semibold ${isSelected ? "text-white" : "text-zinc-100"}`}>
            {label}
          </Text>
          <Text className="mt-2 text-sm leading-6 text-zinc-400">{description}</Text>
        </View>

        <View className="items-center">
          {emoji ? <Text className="text-3xl">{emoji}</Text> : null}
          <Text className="mt-2 text-xs font-medium uppercase tracking-[1.2px] text-zinc-500">
            {value}/5
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}
