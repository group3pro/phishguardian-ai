
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// For development: allows the app to run without a Clerk key
// In production, always use your actual Clerk publishable key
const isDevelopment = import.meta.env.DEV;
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                        (isDevelopment ? "pk_test_placeholder_key_for_development" : null);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

// Log instructions in development mode
if (isDevelopment && !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn(
    "⚠️ Using placeholder Clerk key for development. For full functionality, please set VITE_CLERK_PUBLISHABLE_KEY environment variable with your actual Clerk publishable key."
  );
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    clerkJSVersion="5.56.0-snapshot.v20250312225817"
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    signInFallbackRedirectUrl="/dashboard"
    signUpFallbackRedirectUrl="/dashboard"
    afterSignOutUrl="/">
    <App />
  </ClerkProvider>
);
