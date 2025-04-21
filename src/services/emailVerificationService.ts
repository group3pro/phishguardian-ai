
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
      
      // Map GetProspect API response to our interface
      const result: EmailVerificationResult = {
        email: email,
        deliverability: data.deliverable ? "DELIVERABLE" : "UNDELIVERABLE",
        quality_score: data.score || 0,
        is_valid_format: data.format_valid || false,
        is_free_email: data.free || false,
        is_disposable_email: data.disposable || false,
        domain: data.domain || email.split('@')[1]
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
      toast.error("Email verification failed");
      return null;
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    toast.error("Failed to verify email. Please try again.");
    return null;
  }
};
