
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
    
    const { data: apiConfig } = await supabase
      .from('email_verification_config')
      .select('api_url')
      .single();

    if (!apiConfig?.api_url) {
      toast.error("Email verification service is not configured");
      return null;
    }
    
    const response = await fetch(`${apiConfig.api_url}${encodeURIComponent(email)}`);

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
  } catch (error) {
    console.error("Error verifying email:", error);
    toast.error("Failed to verify email. Please try again.");
    return null;
  }
};

