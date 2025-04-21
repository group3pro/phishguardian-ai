
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import type { LinkCheckResult } from "@/services/linkCheckService";

interface WebsiteAnalysisResultProps {
  result: LinkCheckResult;
}

export const WebsiteAnalysisResult: React.FC<WebsiteAnalysisResultProps> = ({ result }) => {
  const getStatusIcon = () => {
    if (!result.suspicious && !result.malware && !result.phishing) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Website Analysis Results</CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg ${
          !result.suspicious && !result.malware && !result.phishing
            ? "bg-green-500/10 border border-green-500/20" 
            : "bg-red-500/10 border border-red-500/20"
        }`}>
          <div className="flex items-center gap-3">
            {!result.suspicious && !result.malware && !result.phishing ? (
              <Shield className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <div>
              <p className="font-medium">
                {!result.suspicious && !result.malware && !result.phishing 
                  ? "This website appears to be safe" 
                  : "Warning: Suspicious website detected!"}
              </p>
              <p className="text-sm opacity-80">
                {!result.suspicious && !result.malware && !result.phishing 
                  ? "Our analysis didn't detect any significant threats" 
                  : "This website shows characteristics commonly associated with malicious sites"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Domain Information</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domain:</span>
                <span className="font-medium">{result.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{result.category || "Uncategorized"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Server:</span>
                <span className="font-medium">{result.server || "Unknown"}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Security Flags</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phishing:</span>
                <span className={result.phishing ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                  {result.phishing ? "Detected" : "Not Detected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Malware:</span>
                <span className={result.malware ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                  {result.malware ? "Detected" : "Not Detected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Score:</span>
                <span className={
                  result.risk_score > 75 ? "text-red-500 font-medium" : 
                  result.risk_score > 50 ? "text-amber-500 font-medium" : 
                  "text-green-500 font-medium"
                }>
                  {result.risk_score}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
