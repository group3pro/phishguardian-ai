
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface EmailVerificationResult {
  email: string;
  deliverability: string;
  quality_score: number;
  is_valid_format: boolean;
  is_free_email: boolean;
  is_disposable_email: boolean;
  domain: string;
}

export const verifyEmail = async (email: string): Promise<EmailVerificationResult | null> => {
  if (!email.trim()) {
    toast.error("Please enter an email address");
    return null;
  }

  try {
    toast.info("Verifying email address...");
    
    const { data: apiConfig, error: configError } = await supabase
      .from('email_verification_config')
      .select('api_url')
      .single();

    if (configError || !apiConfig?.api_url) {
      toast.error("Email verification service is not configured");
      return null;
    }
    
    try {
      const response = await fetch(`${apiConfig.api_url}${encodeURIComponent(email)}`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error("Email verification failed");
      }

      const data = await response.json();
      
      const result: EmailVerificationResult = {
        email: data.email,
        deliverability: data.validFormat && data.deliverable ? "DELIVERABLE" : "UNDELIVERABLE",
        quality_score: data.validFormat ? 0.8 : 0.2, // Rough estimation based on format
        is_valid_format: data.validFormat,
        is_free_email: data.freeEmail,
        is_disposable_email: data.disposableEmail,
        domain: data.domain
      };

      // Save verification to Supabase - fix the type issue with JSON
      const { error } = await supabase.from('email_verifications').insert({
        email: result.email,
        is_valid: result.deliverability === "DELIVERABLE",
        details: result as unknown as Record<string, any> // Convert to a JSON compatible format
      });

      if (error) {
        console.error("Error saving email verification:", error);
        toast.error("Failed to save verification details");
      }

      toast.success("Email verification complete");
      return result;
    } catch (fetchError) {
      console.error("API fetch error:", fetchError);
      
      // Fallback: Implement basic email validation when API is inaccessible
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidFormat = emailPattern.test(email);
      
      // Extract domain for basic checks
      const domain = email.split('@')[1];
      const commonDisposableDomains = ['mailinator.com', 'tempmail.com', 'disposable.com', 'yopmail.com', 'guerrillamail.com'];
      const commonFreeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
      
      const isDisposable = commonDisposableDomains.includes(domain);
      const isFreeEmail = commonFreeDomains.includes(domain);
      
      const result: EmailVerificationResult = {
        email: email,
        deliverability: isValidFormat ? "DELIVERABLE" : "UNDELIVERABLE",
        quality_score: isValidFormat ? (isDisposable ? 0.3 : 0.7) : 0.1,
        is_valid_format: isValidFormat,
        is_free_email: isFreeEmail,
        is_disposable_email: isDisposable,
        domain: domain
      };
      
      // Save verification to Supabase with fallback notation
      const { error } = await supabase.from('email_verifications').insert({
        email: result.email,
        is_valid: result.is_valid_format,
        details: { 
          ...result,
          verification_note: "API unavailable - basic validation only" 
        } as unknown as Record<string, any>
      });

      if (error) {
        console.error("Error saving email verification:", error);
      }
      
      toast.success("Email basic verification complete (offline mode)");
      return result;
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    toast.error("Failed to verify email. Please try again.");
    return null;
  }
};
