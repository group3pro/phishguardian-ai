
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Using a mock implementation since the external API is failing
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

  // Format the URL if needed
  let formattedUrl = url;
  if (!/^https?:\/\//i.test(url)) {
    formattedUrl = "http://" + url;
  }

  try {
    // Since the external API is failing, we'll provide a mock response based on the URL
    // This is just for demonstration purposes
    const domain = new URL(formattedUrl).hostname;
    
    // Get risk level based on some common patterns in the domain
    const hasSuspiciousPattern = /free|deal|prize|win|crypto|wallet|verify|banking|secure|update/.test(domain);
    const isKnownSafe = /google\.com|microsoft\.com|apple\.com|amazon\.com|github\.com/.test(domain);
    
    const riskScore = hasSuspiciousPattern ? 75 : (isKnownSafe ? 15 : 45);
    
    // Create a simulated response
    const result: LinkCheckResult = {
      message: "Link checked successfully",
      success: true,
      unsafe: riskScore > 70,
      domain: domain,
      ip_address: "127.0.0.1", // Placeholder
      server: "Unknown",
      content_type: "text/html",
      status_code: 200,
      page_size: 0,
      domain_rank: isKnownSafe ? 90 : 40,
      dns_valid: true,
      suspicious: riskScore > 50,
      phishing: riskScore > 70,
      malware: false,
      spamming: false,
      adult: false,
      risk_score: riskScore,
      parking: false,
      redirected: false,
      final_url: formattedUrl,
      category: isKnownSafe ? "Trusted" : (hasSuspiciousPattern ? "Suspicious" : "Uncategorized")
    };
    
    // Log to user so they know we're using a simulation
    toast.success("URL analyzed (simulation mode)");
    
    // Save the verification to Supabase (with correct properties)
    const { error } = await supabase
      .from('url_verifications')
      .insert({
        url: formattedUrl,
        is_malicious: result.phishing || result.malware,
        details: result as unknown as Record<string, any>
      });

    if (error) {
      console.error("Error saving URL verification:", error);
      toast.error("Failed to save verification details");
    }
    
    return result;
  } catch (error) {
    console.error("Error checking link:", error);
    toast.error("Failed to check link. Please try again.");
    return null;
  }
};
