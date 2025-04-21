
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
      // Show specific toast to indicate API call is in progress
      toast.loading("Contacting verification service...", {
        id: "email-verification"
      });
      
      // Add optional API key if available
      const headers: HeadersInit = {
        'Accept': 'application/json'
      };
      
      const trumail_api_key = await supabase.functions.invoke('get-secret', {
        body: { name: 'TRUMAIL_API_KEY' }
      }).then(response => response.data?.value).catch(() => null);
      
      if (trumail_api_key) {
        headers['Authorization'] = `Bearer ${trumail_api_key}`;
      }
      
      // Set timeout to handle slow API responses
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout
      
      const response = await fetch(`${apiConfig.api_url}${encodeURIComponent(email)}`, {
        headers,
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      // Remove the loading toast
      toast.dismiss("email-verification");

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      
      // Check if the response has the expected format
      if (!data.hasOwnProperty('email') || 
          !data.hasOwnProperty('validFormat') || 
          !data.hasOwnProperty('domain')) {
        throw new Error("Invalid API response format");
      }
      
      const result: EmailVerificationResult = {
        email: data.email,
        deliverability: data.validFormat && data.deliverable ? "DELIVERABLE" : "UNDELIVERABLE",
        quality_score: data.validFormat ? 0.8 : 0.2, // Rough estimation based on format
        is_valid_format: data.validFormat,
        is_free_email: data.freeEmail || false,
        is_disposable_email: data.disposableEmail || false,
        domain: data.domain
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
      toast.error("Email verification service unavailable");
      
      // Don't return a fake result, instead return a clear error result
      const domain = email.split('@')[1] || '';
      
      // Only validate the format but clearly indicate this is NOT a full verification
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidFormat = emailPattern.test(email);
      
      const result: EmailVerificationResult = {
        email: email,
        deliverability: "UNKNOWN", // Changed from DELIVERABLE to UNKNOWN
        quality_score: 0,  // Zero score to indicate no real verification
        is_valid_format: isValidFormat,
        is_free_email: false, // We don't know, so default to false
        is_disposable_email: false, // We don't know, so default to false
        domain: domain
      };
      
      // Save the error case to Supabase with clear indication this is not verified
      const { error } = await supabase.from('email_verifications').insert({
        email: result.email,
        is_valid: false,
        details: { 
          ...result,
          verification_status: "ERROR",
          error_message: "Verification service unavailable"
        } as unknown as Record<string, any>
      });

      if (error) {
        console.error("Error saving verification error:", error);
      }
      
      return result;
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    toast.error("Failed to verify email. Please try again.");
    return null;
  }
};
