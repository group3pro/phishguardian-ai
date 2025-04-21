
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { usePhishingDetection } from "@/hooks/usePhishingDetection";
import PhishingScoreCard from "@/components/ui/PhishingScoreCard";

export const EmailAnalyzer = () => {
  const [emailContent, setEmailContent] = useState("");
  const { analyzeEmail, isLoading, analysisResult, resetAnalysis } = usePhishingDetection();

  const handleAnalyze = () => {
    if (!emailContent.trim()) {
      toast.error("Please enter email content to analyze");
      return;
    }
    analyzeEmail(emailContent);
  };

  const handleReset = () => {
    setEmailContent("");
    resetAnalysis();
  };

  return (
    <div className="space-y-4">
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

      {analysisResult && (
        <div className="animate-fade-in">
          <PhishingScoreCard result={analysisResult} />
        </div>
      )}
    </div>
  );
};
