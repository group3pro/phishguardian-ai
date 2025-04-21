
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { checkLink } from "./linkCheckService";

export interface EmailVerificationResult {
  email: string;
  deliverability: string;
  quality_score: number;
  is_valid_format: boolean;
  is_free_email: boolean;
  is_disposable_email: boolean;
  domain: string;
}

export interface URLVerificationResult {
  url: string;
  is_malicious: boolean;
  is_phishing: boolean;
  risk_score: number;
  domain: string;
}

export const verifyEmail = async (email: string): Promise<EmailVerificationResult | null> => {
  if (!email.trim()) {
    toast.error("Please enter an email address");
    return null;
  }

  try {
    toast.info("Verifying email address...");
    
    try {
      // Show specific toast to indicate API call is in progress
      toast.loading("Contacting verification service...", {
        id: "email-verification"
      });
      
      // Set timeout to handle slow API responses
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout
      
      const response = await fetch(`https://api.getprospect.com/public/v1/email/verify?email=${encodeURIComponent(email)}&apiKey=5cf7ba99-6688-40e8-9a66-288ee1865fd9`, {
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      // Remove the loading toast
      toast.dismiss("email-verification");

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log("GetProspect API response:", data);
      
      // Map GetProspect API response to our interface
      // GetProspect returns status: "valid" for valid emails
      const result: EmailVerificationResult = {
        email: email,
        deliverability: data.status === "valid" ? "DELIVERABLE" : "UNDELIVERABLE",
        quality_score: data.status === "valid" ? 0.9 : 0.1,
        is_valid_format: true, // If the API returns a result, the format is valid
        is_free_email: email.includes("gmail.com") || email.includes("yahoo.com") || email.includes("hotmail.com"),
        is_disposable_email: false, // GetProspect doesn't provide this info directly
        domain: data.fqdn || email.split('@')[1]
      };

      // Save verification to Supabase
      const { error } = await supabase.from('email_verifications').insert({
        email: result.email,
        is_valid: result.deliverability === "DELIVERABLE",
        details: result as unknown as Record<string, any>
      });

      if (error) {
        console.error("Error saving email verification:", error);
        toast.error("Failed to save verification details");
      }

      toast.success("Email verification complete");
      return result;
      
    } catch (fetchError) {
      console.error("API fetch error:", fetchError);
      toast.dismiss("email-verification");
      
      // Create a more varied fallback with UNKNOWN status
      const domain = email.split('@')[1] || '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidFormat = emailPattern.test(email);
      
      // Check common domain patterns
      const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com", "icloud.com"];
      const isFreeMail = commonDomains.includes(domain.toLowerCase());
      
      // Check for disposable email patterns
      const disposableDomains = ["mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com", "fakeinbox.com"];
      const isDisposable = disposableDomains.includes(domain.toLowerCase());
      
      // Calculate quality score based on these factors
      let qualityScore = 0;
      if (isValidFormat) qualityScore += 0.3;
      if (!isDisposable) qualityScore += 0.4;
      if (!isFreeMail) qualityScore += 0.2; // Business emails get a slight boost
      
      // Randomly vary quality score slightly
      qualityScore += (Math.random() * 0.1) - 0.05;
      qualityScore = Math.min(1, Math.max(0, qualityScore));
      
      const result: EmailVerificationResult = {
        email: email,
        deliverability: isValidFormat ? (qualityScore > 0.5 ? "RISKY" : "UNKNOWN") : "INVALID",
        quality_score: qualityScore,
        is_valid_format: isValidFormat,
        is_free_email: isFreeMail,
        is_disposable_email: isDisposable,
        domain: domain
      };
      
      // Save the fallback verification to Supabase
      const { error } = await supabase.from('email_verifications').insert({
        email: result.email,
        is_valid: result.deliverability !== "INVALID",
        details: { 
          ...result,
          verification_status: "ERROR",
          error_message: "Verification service unavailable or error"
        } as unknown as Record<string, any>
      });
      
      if (error) {
        console.error("Error saving verification error:", error);
      }
      
      toast.error("Email verification service unavailable");
      return result;
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    toast.error("Failed to verify email. Please try again.");
    return null;
  }
};

export const verifyURL = async (url: string): Promise<URLVerificationResult | null> => {
  if (!url.trim()) {
    toast.error("Please enter a URL to verify");
    return null;
  }

  try {
    toast.info("Verifying URL...");
    
    const linkCheckResult = await checkLink(url);
    if (!linkCheckResult) {
      return null;
    }

    const result: URLVerificationResult = {
      url: url,
      is_malicious: linkCheckResult.malware || linkCheckResult.phishing,
      is_phishing: linkCheckResult.phishing,
      risk_score: linkCheckResult.risk_score || 0,
      domain: linkCheckResult.domain
    };

    return result;
  } catch (error) {
    console.error("Error verifying URL:", error);
    toast.error("Failed to verify URL. Please try again.");
    return null;
  }
};
