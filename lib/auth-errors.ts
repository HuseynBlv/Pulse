export function getFriendlyAuthErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "That email and password combination does not match our records.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Check your inbox and confirm your email before signing in.";
  }

  if (normalized.includes("user already registered")) {
    return "An account with that email already exists. Try signing in instead.";
  }

  if (normalized.includes("password should be at least")) {
    return "Choose a stronger password with at least 6 characters.";
  }

  if (normalized.includes("unable to validate email address")) {
    return "Enter a valid email address so we can continue.";
  }

  if (normalized.includes("email rate limit exceeded")) {
    return "Too many email requests in a short time. Please wait a minute and try again.";
  }

  return `Supabase error: ${message}`;
}
