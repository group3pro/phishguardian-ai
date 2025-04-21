
import { toast } from "sonner";
import { analyzeEmailWithGemini } from "./geminiService";
import { supabase } from "@/integrations/supabase/client";

export interface PhishingAnalysisResult {
  score: number;
  threatLevel: "safe" | "suspicious" | "dangerous";
  indicators: string[];
  details: {
    senderAnalysis: string;
    contentAnalysis: string;
    linkAnalysis: string;
    urgencyLevel: string;
  };
}

export const analyzePhishingContent = async (content: string): Promise<PhishingAnalysisResult> => {
  if (!content.trim()) {
    toast.error("Please enter content to analyze");
    throw new Error("Empty content");
  }
  
  try {
    // Use Gemini to analyze the email content
    const result = await analyzeEmailWithGemini(content);
    
    // Save analysis to Supabase
    const { error } = await supabase.from('email_analysis').insert({
      email_content: content,
      analysis_result: result,
      threat_level: result.threatLevel
    });

    if (error) {
      console.error("Error saving analysis to Supabase:", error);
      toast.error("Failed to save analysis");
    }
    
    // Validate the response structure
    if (!result.score || !result.threatLevel || !result.indicators || !result.details) {
      throw new Error("Invalid analysis result structure");
    }
    
    // Return the analysis result
    return result as PhishingAnalysisResult;
  } catch (error) {
    console.error("Error analyzing content:", error);
    toast.error("Failed to analyze content");
    
    // Provide a fallback response in case of API failure
    return {
      score: 0.5,
      threatLevel: "suspicious",
      indicators: ["Analysis failed, please try again later"],
      details: {
        senderAnalysis: "Analysis unavailable due to an error",
        contentAnalysis: "Analysis unavailable due to an error",
        linkAnalysis: "Analysis unavailable due to an error",
        urgencyLevel: "Analysis unavailable due to an error"
      }
    };
  }
};
