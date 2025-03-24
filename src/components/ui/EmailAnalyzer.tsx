
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePhishingDetection } from "@/hooks/usePhishingDetection";
import PhishingScoreCard from "./PhishingScoreCard";
import { Loader2 } from "lucide-react";

const EmailAnalyzer = () => {
  const [emailContent, setEmailContent] = useState("");
  const { analyzeEmail, isLoading, analysisResult, resetAnalysis } = usePhishingDetection();

  const handleAnalyze = () => {
    analyzeEmail(emailContent);
  };

  const handleReset = () => {
    setEmailContent("");
    resetAnalysis();
  };

  const handleSampleEmail = () => {
    const samples = [
      `Dear Customer,

We've detected unusual activity on your account. Please verify your information immediately by clicking the link below to prevent your account from being suspended.

http://secure-verification.com/account/verify

Regards,
Account Security Team`,

      `Hi Team,

Attached is the updated presentation for tomorrow's meeting. Please review and let me know if you have any questions.

Thanks,
Sarah Johnson
Marketing Director`,

      `URGENT NOTICE: Your PayMent has been SUSPENDED!

We need you to update your account informations IMMEDIATELY or your access will be TERMINATED.

Click here: paypal-secure-update.info/verify

Do not ignore this message!!!`
    ];

    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setEmailContent(randomSample);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Email Content Analyzer</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSampleEmail}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Load Sample
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Paste the suspicious email content below to analyze for phishing threats
          </p>
        </div>

        <Textarea
          placeholder="Paste email content here..."
          className="min-h-[200px] glassmorphism"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <div className="flex gap-2">
          <Button 
            onClick={handleAnalyze} 
            className="flex-1"
            disabled={isLoading || !emailContent.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              "Analyze Email"
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={isLoading || (!emailContent.trim() && !analysisResult)}
          >
            Reset
          </Button>
        </div>
      </div>

      {analysisResult && (
        <div className="mt-8 animate-fade-in">
          <PhishingScoreCard result={analysisResult} />
        </div>
      )}
    </div>
  );
};

export default EmailAnalyzer;
