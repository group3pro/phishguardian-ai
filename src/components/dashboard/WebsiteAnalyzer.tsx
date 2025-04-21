
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { checkLink } from "@/services/linkCheckService";
import type { LinkCheckResult } from "@/services/linkCheckService";
import { WebsiteAnalysisResult } from "./WebsiteAnalysisResult";

export const WebsiteAnalyzer = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkCheckResult, setLinkCheckResult] = useState<LinkCheckResult | null>(null);

  const handleAnalyze = async () => {
    if (!websiteUrl.trim()) {
      toast.error("Please enter a website URL to analyze");
      return;
    }

    setIsLoading(true);
    setLinkCheckResult(null);
    
    try {
      const result = await checkLink(websiteUrl);
      if (result) {
        setLinkCheckResult(result);
      }
    } catch (error) {
      console.error("Error checking website:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setWebsiteUrl("");
    setLinkCheckResult(null);
  };

  return (
    <div className="space-y-4">
      <Input 
        placeholder="Enter website URL (e.g., https://suspicious-site.com)" 
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
      />

      <div className="flex gap-2">
        <Button 
          onClick={handleAnalyze} 
          className="flex-1"
          disabled={isLoading || !websiteUrl.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : (
            "Analyze Website"
          )}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleReset}
          disabled={isLoading || (!websiteUrl.trim() && !linkCheckResult)}
        >
          Reset
        </Button>
      </div>

      {linkCheckResult && (
        <WebsiteAnalysisResult result={linkCheckResult} />
      )}
    </div>
  );
};
