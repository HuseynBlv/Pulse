import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View } from "react-native";

import { AuthButton } from "../../components/AuthButton";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthScreen } from "../../components/AuthScreen";
import { AuthTextField } from "../../components/AuthTextField";
import { getFriendlyAuthErrorMessage } from "../../lib/auth-errors";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setError(null);

    if (!isSupabaseConfigured) {
      setError("Add your Supabase URL and anon key to `.env` before testing auth.");
      return;
    }

    if (!email.trim() || !password || !confirmPassword) {
      setError("Fill in your email and both password fields to continue.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Those passwords do not match yet. Try typing them again.");
      return;
    }

    if (password.length < 6) {
      setError("Choose a stronger password with at least 6 characters.");
      return;
    }

    setIsLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (signUpError) {
      setError(getFriendlyAuthErrorMessage(signUpError.message));
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
      return;
    }

    router.replace({
      pathname: "/email-confirmation",
      params: { email: email.trim() },
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <AuthScreen
        title="Create your Pulse account"
        description="Start with a simple daily check-in and unlock clearer weekly patterns."
        footer={
          <View className="items-center">
            <Text className="text-sm text-zinc-500">Already have an account?</Text>
            <Link href="/sign-in" className="mt-2 text-sm font-semibold text-[#A78BFA]">
              Sign In
            </Link>
          </View>
        }
      >
        <AuthErrorBanner message={error} />
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
          placeholder="At least 6 characters"
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />
        <AuthTextField
          autoComplete="password"
          label="Confirm password"
          onChangeText={setConfirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry
          textContentType="newPassword"
          value={confirmPassword}
        />
        <AuthButton
          isLoading={isLoading}
          label="Create account"
          loadingLabel="Creating account..."
          onPress={() => {
            void handleSignUp();
          }}
        />
      </AuthScreen>
    </>
  );
}
