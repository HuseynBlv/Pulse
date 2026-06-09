import { useState } from "react";

import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { METRIC_KEYS, type DailyCheckIn, type CheckInMetric, type MetricScore } from "../types/check-in";
import type { CheckinInsert } from "../types/supabase";

function createDefaultCheckIn(): DailyCheckIn {
  return {
    check_in_date: new Date().toISOString().split("T")[0] ?? "",
    sleep: 3,
    energy: 3,
    anxiety: 3,
    focus: 3,
    mood: 3,
    note: "",
  };
}

export function useCheckIn() {
  const [checkIn, setCheckIn] = useState<DailyCheckIn>(createDefaultCheckIn);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const setMetric = (metric: CheckInMetric, value: MetricScore) => {
    setCheckIn((current) => ({
      ...current,
      [metric]: value,
    }));
  };

  const setNote = (note: string) => {
    setCheckIn((current) => ({
      ...current,
      note,
    }));
  };

  const resetCheckIn = () => {
    setCheckIn(createDefaultCheckIn());
    setError(null);
    setLastSavedAt(null);
  };

  const submitCheckIn = async () => {
    setError(null);
    setLastSavedAt(null);

    if (!isSupabaseConfigured) {
      setError("Add your Supabase env vars before saving check-ins.");
      return false;
    }

    setIsSubmitting(true);

    const payload = METRIC_KEYS.reduce(
      (accumulator, metric) => {
        accumulator[metric] = checkIn[metric];
        return accumulator;
      },
      {
        check_in_date: checkIn.check_in_date,
        note: checkIn.note?.trim() || null,
      } as Pick<CheckinInsert, "check_in_date" | "note"> & Record<CheckInMetric, MetricScore>,
    );

    const { error: insertError } = await supabase.from("checkins").insert(payload);

    setIsSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return false;
    }

    setLastSavedAt(
      new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    );

    return true;
  };

  return {
    checkIn,
    error,
    isSubmitting,
    isSupabaseConfigured,
    lastSavedAt,
    resetCheckIn,
    setMetric,
    setNote,
    submitCheckIn,
  };
}
