
import { useState } from "react";
import { toast } from "sonner";
import { analyzePhishingContent, PhishingAnalysisResult } from "@/services/phishingDetectionService";

export const usePhishingDetection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PhishingAnalysisResult | null>(null);

  const analyzeEmail = async (emailContent: string) => {
    if (!emailContent.trim()) {
      toast.error("Please enter email content to analyze");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await analyzePhishingContent(emailContent);
      setAnalysisResult(result);
      
      if (result.threatLevel === "dangerous") {
        toast.error("High phishing threat detected!");
      } else if (result.threatLevel === "suspicious") {
        toast.warning("This email looks suspicious");
      } else {
        toast.success("Email appears to be safe");
      }
    } catch (error) {
      console.error("Error analyzing email:", error);
      toast.error("Failed to analyze email");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeEmail,
    isLoading,
    analysisResult,
    resetAnalysis: () => setAnalysisResult(null)
  };
};
