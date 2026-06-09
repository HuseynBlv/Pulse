import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View } from "react-native";

import { AuthButton } from "../../components/AuthButton";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthScreen } from "../../components/AuthScreen";
import { getFriendlyAuthErrorMessage } from "../../lib/auth-errors";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

export default function EmailConfirmationScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const email = typeof params.email === "string" ? params.email : "";
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!isSupabaseConfigured) {
      setError("Add your Supabase URL and anon key to `.env` before testing auth.");
      return;
    }

    if (!email) {
      setError("We could not find your email for resend. Return to sign up and try again.");
      return;
    }

    setIsLoading(true);

    const { error: resendError } = await supabase.auth.resend({
      email,
      type: "signup",
    });

    setIsLoading(false);

    if (resendError) {
      setError(getFriendlyAuthErrorMessage(resendError.message));
      return;
    }

    setSuccessMessage("Confirmation email sent again. Check your inbox and spam folder.");
  };

  return (
    <>
      <StatusBar style="light" />
      <AuthScreen
        title="Confirm your email"
        description={
          email
            ? `We sent a confirmation link to ${email}. Open it, confirm your account, then return here to sign in.`
            : "We sent a confirmation link to your inbox. Confirm your account, then return here to sign in."
        }
        footer={
          <View className="items-center">
            <Text className="text-sm text-zinc-500">Already confirmed?</Text>
            <Link href="/sign-in" className="mt-2 text-sm font-semibold text-[#A78BFA]">
              Go to Sign In
            </Link>
          </View>
        }
      >
        <AuthErrorBanner message={error} />
        {successMessage ? (
          <View className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <Text className="text-sm leading-6 text-emerald-200">{successMessage}</Text>
          </View>
        ) : null}
        <View className="rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-5">
          <Text className="text-sm uppercase tracking-[1.6px] text-zinc-500">Next step</Text>
          <Text className="mt-3 text-base leading-7 text-zinc-300">
            1. Open the email from Supabase.
          </Text>
          <Text className="mt-2 text-base leading-7 text-zinc-300">
            2. Tap the confirmation link.
          </Text>
          <Text className="mt-2 text-base leading-7 text-zinc-300">
            3. Come back to Pulse and sign in.
          </Text>
        </View>
        <AuthButton
          isLoading={isLoading}
          label="Resend confirmation email"
          loadingLabel="Resending..."
          onPress={() => {
            void handleResend();
          }}
        />
      </AuthScreen>
    </>
  );
}
