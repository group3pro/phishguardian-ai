
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// Use the provided Clerk publishable key
const PUBLISHABLE_KEY = "pk_test_dGhvcm91Z2gtbW9uc3Rlci03My5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.");
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
