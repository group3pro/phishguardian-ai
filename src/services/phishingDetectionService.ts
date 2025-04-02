
import { toast } from "sonner";

// Using phishing detection API (free tier from PhishStats with limited functionality)
const API_URL = "https://phishstats.info/api/phishing";

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

// Extract URLs from text
const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

// Extract email addresses from text
const extractEmails = (text: string): string[] => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
};

// Analyze text for common phishing keywords
const analyzeText = (text: string): { score: number; keywords: string[] } => {
  const lowercaseText = text.toLowerCase();
  const phishingKeywords = [
    "urgent", "verify", "update", "account", "security", "suspended", "limited", 
    "password", "confirm", "click", "secure", "alert", "immediately", "log-in",
    "unusual activity", "problem", "issue", "win", "prize", "lucky", "congratulations",
    "bank", "paypal", "expired", "money", "credit card", "ssn", "social security"
  ];
  
  const foundKeywords = phishingKeywords.filter(keyword => 
    lowercaseText.includes(keyword)
  );
  
  const score = Math.min(foundKeywords.length / 5, 1); // Normalize score between 0-1
  
  return { score, keywords: foundKeywords };
};

export const analyzePhishingContent = async (content: string): Promise<PhishingAnalysisResult> => {
  if (!content.trim()) {
    toast.error("Please enter content to analyze");
    throw new Error("Empty content");
  }
  
  try {
    // Extract URLs and email addresses
    const urls = extractUrls(content);
    const emails = extractEmails(content);
    const textAnalysis = analyzeText(content);
    
    // Calculate base score from text analysis
    let finalScore = textAnalysis.score * 0.5; // Text analysis is 50% of score
    
    // URLs add to suspicion level
    if (urls.length > 0) {
      finalScore += Math.min(urls.length * 0.15, 0.3); // Max 30% from URLs
    }
    
    // Check for mixed case domains which is often a phishing sign
    const domainRegex = /@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const hasMixedCaseDomains = emails.some(email => {
      const domain = email.match(domainRegex)?.[1];
      return domain && domain !== domain.toLowerCase();
    });
    
    if (hasMixedCaseDomains) {
      finalScore += 0.2;
    }
    
    // Determine threat level
    let threatLevel: "safe" | "suspicious" | "dangerous";
    if (finalScore < 0.3) {
      threatLevel = "safe";
    } else if (finalScore < 0.7) {
      threatLevel = "suspicious";
    } else {
      threatLevel = "dangerous";
    }
    
    // Build indicators
    const indicators: string[] = [];
    
    if (textAnalysis.keywords.length > 0) {
      indicators.push(`Contains suspicious keywords: ${textAnalysis.keywords.slice(0, 5).join(", ")}${textAnalysis.keywords.length > 5 ? '...' : ''}`);
    }
    
    if (urls.length > 0) {
      indicators.push(`Contains ${urls.length} URL${urls.length > 1 ? 's' : ''}`);
    }
    
    if (hasMixedCaseDomains) {
      indicators.push("Contains suspicious mixed-case domains");
    }
    
    if (content.includes("@") && !emails.length) {
      indicators.push("Contains @ symbols not in valid email format");
    }
    
    if (content.includes("login") || content.includes("password") || content.includes("verify")) {
      indicators.push("Requests account verification or login credentials");
    }
    
    if (indicators.length === 0) {
      indicators.push("No obvious phishing indicators detected");
    }
    
    return {
      score: finalScore,
      threatLevel,
      indicators,
      details: {
        senderAnalysis: emails.length > 0 
          ? `Sender domain ${hasMixedCaseDomains ? "contains suspicious mixed-case" : "looks normal"}.`
          : "No sender email detected in content.",
        contentAnalysis: textAnalysis.keywords.length > 0 
          ? `Content contains ${textAnalysis.keywords.length} suspicious keywords.`
          : "Content does not contain common phishing keywords.",
        linkAnalysis: urls.length > 0 
          ? `Found ${urls.length} links in the content.`
          : "No links found in content.",
        urgencyLevel: content.toLowerCase().includes("urgent") || content.toLowerCase().includes("immediately") 
          ? "Content conveys a sense of urgency, which is common in phishing attempts."
          : "No unusual urgency detected in content."
      }
    };
  } catch (error) {
    console.error("Error analyzing content:", error);
    toast.error("Failed to analyze content");
    throw error;
  }
};
