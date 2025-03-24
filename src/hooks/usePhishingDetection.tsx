
import { useState } from "react";
import { toast } from "sonner";

// Mock phishing detection API
const mockPhishingDetection = async (email: string) => {
  // Simulate API call
  return new Promise<{
    score: number;
    threatLevel: "safe" | "suspicious" | "dangerous";
    indicators: string[];
    details: {
      senderAnalysis: string;
      contentAnalysis: string;
      linkAnalysis: string;
      urgencyLevel: string;
    };
  }>((resolve) => {
    setTimeout(() => {
      // Generate a random phishing score for demo
      const randomScore = Math.random();
      
      let threatLevel: "safe" | "suspicious" | "dangerous";
      let indicators: string[] = [];
      
      if (randomScore < 0.3) {
        threatLevel = "safe";
        indicators = [
          "Legitimate sender domain",
          "No suspicious links detected",
          "No urgency indicators",
          "Content analysis passed safety checks"
        ];
      } else if (randomScore < 0.7) {
        threatLevel = "suspicious";
        indicators = [
          "Sender domain mismatches display name",
          "Link destinations look questionable",
          "Minor urgency language detected",
          "Requests personal information"
        ];
      } else {
        threatLevel = "dangerous";
        indicators = [
          "Spoofed sender address detected",
          "Malicious links identified",
          "High urgency language detected",
          "Grammar and spelling errors",
          "Requests sensitive credentials"
        ];
      }
      
      resolve({
        score: randomScore,
        threatLevel,
        indicators,
        details: {
          senderAnalysis: `The email ${
            threatLevel === "safe" 
              ? "comes from a legitimate domain with proper authentication." 
              : threatLevel === "suspicious"
                ? "has slight mismatches between display name and actual email address."
                : "appears to be spoofing a legitimate company or service."
          }`,
          contentAnalysis: `Content analysis ${
            threatLevel === "safe" 
              ? "detected no concerning patterns or suspicious language." 
              : threatLevel === "suspicious"
                ? "found some concerning patterns that might indicate phishing."
                : "identified multiple red flags typical of phishing attempts."
          }`,
          linkAnalysis: `Links in this email ${
            threatLevel === "safe" 
              ? "point to legitimate domains with proper SSL certificates." 
              : threatLevel === "suspicious"
                ? "contain some questionable destinations that require caution."
                : "lead to known malicious sites or suspicious domains."
          }`,
          urgencyLevel: `The message ${
            threatLevel === "safe" 
              ? "does not create artificial urgency." 
              : threatLevel === "suspicious"
                ? "contains some urgency indicators that could pressure recipients."
                : "uses high-pressure tactics to force quick action."
          }`
        }
      });
    }, 1500);
  });
};

export const usePhishingDetection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    threatLevel: "safe" | "suspicious" | "dangerous";
    indicators: string[];
    details: {
      senderAnalysis: string;
      contentAnalysis: string;
      linkAnalysis: string;
      urgencyLevel: string;
    };
  } | null>(null);

  const analyzeEmail = async (emailContent: string) => {
    if (!emailContent.trim()) {
      toast.error("Please enter email content to analyze");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await mockPhishingDetection(emailContent);
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
