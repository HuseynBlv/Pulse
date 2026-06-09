import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useAuth } from "./useAuth";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { CheckinRow } from "../types/supabase";

function getTodayCheckInDate() {
  return new Date().toISOString().split("T")[0] ?? "";
}

export function useTodayCheckin() {
  const { session } = useAuth();
  const [todayCheckin, setTodayCheckin] = useState<CheckinRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!session?.user?.id || !isSupabaseConfigured) {
      setTodayCheckin(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: queryError } = await supabase
      .from("checkins")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("check_in_date", getTodayCheckInDate())
      .maybeSingle();

    if (queryError) {
      setTodayCheckin(null);
      setError(queryError.message);
      setIsLoading(false);
      return;
    }

    setTodayCheckin(data);
    setIsLoading(false);
  }, [session?.user?.id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return {
    error,
    hasCheckedInToday: Boolean(todayCheckin),
    isLoading,
    refresh,
    todayCheckin,
  };
}
