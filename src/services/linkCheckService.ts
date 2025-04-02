
import { toast } from "sonner";

// Using ipqualityscore.com API for link checking (free tier)
const API_KEY = "qiVZNhIMV0znVD2Uk6yK6ygzz0JRDPxX"; // Free tier key for demo purposes
const API_URL = "https://www.ipqualityscore.com/api/json/url/";

export interface LinkCheckResult {
  message: string;
  success: boolean;
  unsafe: boolean;
  domain: string;
  ip_address: string;
  server: string;
  content_type: string;
  status_code: number;
  page_size: number;
  domain_rank: number;
  dns_valid: boolean;
  suspicious: boolean;
  phishing: boolean;
  malware: boolean;
  spamming: boolean;
  adult: boolean;
  risk_score: number;
  parking: boolean;
  redirected: boolean;
  final_url: string;
  category: string;
}

export const checkLink = async (url: string): Promise<LinkCheckResult | null> => {
  if (!url.trim()) {
    toast.error("Please enter a URL");
    return null;
  }

  let formattedUrl = url;
  if (!/^https?:\/\//i.test(url)) {
    formattedUrl = "http://" + url;
  }

  try {
    const response = await fetch(
      `${API_URL}${API_KEY}/${encodeURIComponent(formattedUrl)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Link check failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking link:", error);
    toast.error("Failed to check link. Please try again.");
    return null;
  }
};
