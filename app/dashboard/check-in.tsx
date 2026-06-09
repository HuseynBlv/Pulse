import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, Text, TextInput, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  type SharedValue,
  useSharedValue,
} from "react-native-reanimated";

import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { CheckInRatingCard } from "../../components/CheckInRatingCard";
import { useCheckIn } from "../../hooks/useCheckIn";
import type { CheckInMetric, DailyCheckIn, MetricScore } from "../../types/check-in";

type StepDefinition = {
  description: string;
  key: CheckInMetric;
  options: Array<{
    description: string;
    emoji?: string;
    label: string;
    value: MetricScore;
  }>;
  title: string;
};

const steps: StepDefinition[] = [
  {
    key: "sleep",
    title: "How was your sleep quality?",
    description: "Choose the option that feels closest to last night.",
    options: [
      { value: 1, emoji: "😴", label: "1", description: "Barely slept or deeply unrested" },
      { value: 2, emoji: "😪", label: "2", description: "Rest was patchy or too short" },
      { value: 3, emoji: "😐", label: "3", description: "It was okay, nothing special" },
      { value: 4, emoji: "🙂", label: "4", description: "Pretty solid and restorative" },
      { value: 5, emoji: "✨", label: "5", description: "Deep, calm, and fully recharged" },
    ],
  },
  {
    key: "energy",
    title: "How is your energy right now?",
    description: "Think about your body and mental fuel for today.",
    options: [
      { value: 1, label: "Very low", description: "Running on empty" },
      { value: 2, label: "Low", description: "Getting through it, but heavy" },
      { value: 3, label: "Steady", description: "Enough fuel for the basics" },
      { value: 4, label: "High", description: "Motivated and ready to move" },
      { value: 5, label: "Very high", description: "Strong, clear, and energized" },
    ],
  },
  {
    key: "anxiety",
    title: "How intense is your anxiety today?",
    description: "For this one, higher means more difficult.",
    options: [
      { value: 1, label: "Very calm", description: "Grounded and settled" },
      { value: 2, label: "Mostly calm", description: "A little tension, still manageable" },
      { value: 3, label: "Mixed", description: "Noticeable but not overwhelming" },
      { value: 4, label: "High", description: "Hard to ignore or shake off" },
      { value: 5, label: "Very high", description: "Loud, disruptive, or consuming" },
    ],
  },
  {
    key: "focus",
    title: "How focused do you feel?",
    description: "How easy is it to stay with one thought or task?",
    options: [
      { value: 1, label: "Scattered", description: "Thoughts are all over the place" },
      { value: 2, label: "Wobbly", description: "Attention is slippery today" },
      { value: 3, label: "Okay", description: "You can focus with some effort" },
      { value: 4, label: "Strong", description: "Attention feels fairly stable" },
      { value: 5, label: "Locked in", description: "Clear, sharp, and present" },
    ],
  },
  {
    key: "mood",
    title: "How would you describe your overall mood?",
    description: "Pick the closest fit, then add an optional note if it helps.",
    options: [
      { value: 1, label: "Very low", description: "Heavy, down, or emotionally flat" },
      { value: 2, label: "Low", description: "Tender, off, or drained" },
      { value: 3, label: "Neutral", description: "Balanced or somewhere in the middle" },
      { value: 4, label: "Good", description: "Steady, warm, or hopeful" },
      { value: 5, label: "Great", description: "Light, bright, or deeply okay" },
    ],
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DailyCheckInScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const [currentStep, setCurrentStep] = useState(0);
  const {
    checkIn,
    error,
    isSubmitting,
    setMetric,
    setNote,
    submitCheckIn,
  } = useCheckIn();

  const current = steps[currentStep];
  const canMoveForward = useMemo(() => {
    const value = checkIn[current.key];
    return value >= 1 && value <= 5;
  }, [checkIn, current.key]);

  const updateStep = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, steps.length - 1));
      setCurrentStep(next);
    },
    [setCurrentStep],
  );

  const scrollToStep = useCallback(
    (index: number) => {
      scrollRef.current?.scrollTo({ x: index * width, y: 0, animated: true });
      updateStep(index);
    },
    [updateStep, width],
  );

  const handleBack = () => {
    if (currentStep === 0) {
      router.back();
      return;
    }

    scrollToStep(currentStep - 1);
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      scrollToStep(currentStep + 1);
      return;
    }

    const didSave = await submitCheckIn();

    if (didSave) {
      router.replace("/dashboard");
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const next = Math.round(event.contentOffset.x / width);
      runOnJS(updateStep)(next);
    },
  });

  const progressStyle = useAnimatedStyle(() => ({
    width: progressWidth.value
      ? interpolate(
          scrollX.value,
          [0, width * (steps.length - 1)],
          [progressWidth.value / steps.length, progressWidth.value],
          Extrapolation.CLAMP,
        )
      : 0,
  }));

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <StatusBar style="light" />
      <View className="flex-1 px-5 pb-6">
        <View className="pt-2">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={handleBack}>
              <Text className="text-sm font-semibold text-zinc-400">
                {currentStep === 0 ? "Close" : "Back"}
              </Text>
            </Pressable>
            <Text className="text-sm font-medium text-zinc-500">
              Step {currentStep + 1} of {steps.length}
            </Text>
          </View>

          <View
            onLayout={(event) => {
              progressWidth.value = event.nativeEvent.layout.width;
            }}
            className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-900"
          >
            <Animated.View className="h-full rounded-full bg-[#7C3AED]" style={progressStyle} />
          </View>
        </View>

        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          className="flex-1"
        >
          {steps.map((step, index) => (
            <CheckInStepPage
              key={step.key}
              checkIn={checkIn}
              index={index}
              scrollX={scrollX}
              screenWidth={width}
              setMetric={setMetric}
              setNote={setNote}
              step={step}
            />
          ))}
        </Animated.ScrollView>

        <View className="pt-4">
          <AuthErrorBanner message={error} />
          <View className="mt-4 flex-row gap-3">
            <Pressable
              onPress={handleBack}
              className="h-14 flex-1 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950"
            >
              <Text className="text-base font-semibold text-zinc-100">
                {currentStep === 0 ? "Cancel" : "Back"}
              </Text>
            </Pressable>

            <AnimatedPressable
              disabled={!canMoveForward || isSubmitting}
              onPress={() => {
                void handleNext();
              }}
              entering={FadeIn.duration(180)}
              exiting={FadeOut.duration(120)}
              className={`h-14 flex-1 items-center justify-center rounded-2xl ${
                !canMoveForward || isSubmitting ? "bg-[#7C3AED]/60" : "bg-[#7C3AED]"
              }`}
            >
              <Text className="text-base font-semibold text-white">
                {isSubmitting
                  ? "Saving..."
                  : currentStep === steps.length - 1
                    ? "Complete"
                    : "Next"}
              </Text>
            </AnimatedPressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

type CheckInStepPageProps = {
  checkIn: DailyCheckIn;
  index: number;
  screenWidth: number;
  scrollX: SharedValue<number>;
  setMetric: (metric: CheckInMetric, value: MetricScore) => void;
  setNote: (note: string) => void;
  step: StepDefinition;
};

function CheckInStepPage({
  checkIn,
  index,
  screenWidth,
  scrollX,
  setMetric,
  setNote,
  step,
}: CheckInStepPageProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth];

    return {
      opacity: interpolate(scrollX.value, input, [0.4, 1, 0.4], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(scrollX.value, input, [18, 0, 18], Extrapolation.CLAMP),
        },
        {
          scale: interpolate(scrollX.value, input, [0.96, 1, 0.96], Extrapolation.CLAMP),
        },
      ],
    };
  });

  return (
    <View style={{ width: screenWidth }} className="flex-1 py-8">
      <Animated.View style={animatedStyle} className="flex-1 justify-center">
        <View className="items-center px-2">
          <Text className="text-center text-4xl font-semibold leading-tight text-white">
            {step.title}
          </Text>
          <Text className="mt-4 max-w-[320px] text-center text-base leading-7 text-zinc-400">
            {step.description}
          </Text>
        </View>

        <View className="mt-10">
          {step.options.map((option) => (
            <CheckInRatingCard
              key={`${step.key}-${option.value}`}
              description={option.description}
              emoji={option.emoji}
              isSelected={checkIn[step.key] === option.value}
              label={option.label}
              onPress={(value) => setMetric(step.key, value)}
              value={option.value}
            />
          ))}
        </View>

        {step.key === "mood" ? (
          <View className="mt-4 rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-5">
            <Text className="text-sm font-medium uppercase tracking-[1.4px] text-zinc-500">
              Optional note
            </Text>
            <TextInput
              value={checkIn.note ?? ""}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              placeholder="What is influencing your mood today?"
              placeholderTextColor="#71717A"
              textAlignVertical="top"
              className="mt-4 min-h-28 text-base leading-6 text-white"
            />
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
}
