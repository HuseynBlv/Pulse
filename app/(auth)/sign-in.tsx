import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { AuthButton } from "../../components/AuthButton";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthScreen } from "../../components/AuthScreen";
import { AuthTextField } from "../../components/AuthTextField";
import { getFriendlyAuthErrorMessage } from "../../lib/auth-errors";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!isSupabaseConfigured) {
      setError("Add your Supabase URL and anon key to `.env` before testing auth.");
      return;
    }

    if (!email.trim() || !password) {
      setError("Enter both your email and password before signing in.");
      return;
    }

    setIsLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(getFriendlyAuthErrorMessage(signInError.message));
      return;
    }

    router.replace("/dashboard");
  };

  const handleForgotPassword = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!isSupabaseConfigured) {
      setError("Add your Supabase URL and anon key to `.env` before testing auth.");
      return;
    }

    if (!email.trim()) {
      setError("Enter your email first, then tap Forgot password.");
      return;
    }

    setIsResetLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim());

    setIsResetLoading(false);

    if (resetError) {
      setError(getFriendlyAuthErrorMessage(resetError.message));
      return;
    }

    setSuccessMessage("Password reset email sent. Check your inbox for the next step.");
  };

  return (
    <>
      <StatusBar style="light" />
      <AuthScreen
        title="Welcome back"
        description="Sign in to continue your daily check-ins and weekly insights."
        footer={
          <View className="items-center">
            <Text className="text-sm text-zinc-500">New to Pulse?</Text>
            <Link href="/sign-up" className="mt-2 text-sm font-semibold text-[#A78BFA]">
              Create an account
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
        <AuthTextField
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          textContentType="emailAddress"
          value={email}
        />
        <AuthTextField
          autoComplete="password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          textContentType="password"
          value={password}
        />
        <Pressable disabled={isResetLoading} onPress={() => void handleForgotPassword()}>
          <Text className="text-right text-sm font-medium text-[#A78BFA]">
            {isResetLoading ? "Sending reset email..." : "Forgot password?"}
          </Text>
        </Pressable>
        <AuthButton
          isLoading={isLoading}
          label="Sign In"
          loadingLabel="Signing in..."
          onPress={() => {
            void handleSignIn();
          }}
        />
      </AuthScreen>
    </>
  );
}
