
import React from "react";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const SignIn = () => {
  return (
    <div className="relative min-h-screen pt-16 flex items-center justify-center">
      <AnimatedBackground className="opacity-30" />
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-md mx-auto glassmorphism p-8 rounded-xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In to PhishGuardian</h1>
          <ClerkSignIn
            appearance={{
              elements: {
                rootBox: "w-full mx-auto",
                card: "bg-transparent shadow-none",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
