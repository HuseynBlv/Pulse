export const METRIC_KEYS = ["sleep", "energy", "anxiety", "focus", "mood"] as const;

export const METRIC_CONFIG = {
  sleep: {
    label: "Sleep",
    hint: "How restorative did last night feel?",
    lowLabel: "Restless",
    highLabel: "Rested",
  },
  energy: {
    label: "Energy",
    hint: "How much fuel do you have for the day?",
    lowLabel: "Drained",
    highLabel: "Charged",
  },
  anxiety: {
    label: "Anxiety",
    hint: "How activated or unsettled does your body feel?",
    lowLabel: "Calm",
    highLabel: "Overloaded",
  },
  focus: {
    label: "Focus",
    hint: "How easy is it to stay with one thing?",
    lowLabel: "Scattered",
    highLabel: "Locked in",
  },
  mood: {
    label: "Mood",
    hint: "How steady and positive does today feel?",
    lowLabel: "Heavy",
    highLabel: "Bright",
  },
} as const;

export type CheckInMetric = (typeof METRIC_KEYS)[number];
export type MetricScore = 1 | 2 | 3 | 4 | 5;

export type DailyCheckIn = {
  check_in_date: string;
  note?: string;
} & Record<CheckInMetric, MetricScore>;
