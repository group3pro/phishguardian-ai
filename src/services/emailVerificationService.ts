
import { toast } from "sonner";

// Email verification API - using Abstract API (free tier)
const API_KEY = "2dd8e75a60104f29961b408e5bd24019"; // Free tier key for demo purposes
const API_URL = "https://emailvalidation.abstractapi.com/v1/";

export interface EmailVerificationResult {
  email: string;
  deliverability: string;
  quality_score: number;
  is_valid_format: boolean;
  is_free_email: boolean;
  is_disposable_email: boolean;
  is_role_email: boolean;
  is_catchall_email: boolean;
  is_mx_found: boolean;
  is_smtp_valid: boolean;
  domain: string;
}

export const verifyEmail = async (email: string): Promise<EmailVerificationResult | null> => {
  if (!email.trim()) {
    toast.error("Please enter an email address");
    return null;
  }

  try {
    const response = await fetch(
      `${API_URL}?api_key=${API_KEY}&email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Email verification failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying email:", error);
    toast.error("Failed to verify email. Please try again.");
    return null;
  }
};
