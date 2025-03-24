
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmailAnalyzer from "@/components/ui/EmailAnalyzer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Shield, AlertTriangle, Ban, Search } from "lucide-react";

const Scanner = () => {
  return (
    <div className="relative pt-24 min-h-screen">
      <AnimatedBackground className="opacity-50" />

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-sm rounded-full bg-primary/10 text-primary">
            <Search className="h-4 w-4 mr-2" />
            <span>Email Scanner</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            AI-Powered Phishing Email Scanner
          </h1>
          <p className="text-muted-foreground text-balance">
            Paste any suspicious email content to analyze it for potential phishing attempts
          </p>
        </div>

        <Card className="glassmorphism mb-10 shadow-sm">
          <CardContent className="pt-6">
            <EmailAnalyzer />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <Card className="glassmorphism">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Safe Content</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Legitimate emails with proper authentication, no suspicious links, and standard business language.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <CardTitle className="text-lg">Suspicious Content</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Emails with minor red flags like questionable links, slight sender inconsistencies, or moderate urgency.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3">
                <Ban className="h-5 w-5 text-red-500" />
              </div>
              <CardTitle className="text-lg">Dangerous Content</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Clear phishing attempts with spoofed senders, malicious links, high urgency, and requests for sensitive information.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
