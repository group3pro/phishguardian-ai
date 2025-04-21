
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Shield, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

  const getRiskLevelText = (score: number) => {
    if (score < 30) return "Low Risk";
    if (score < 70) return "Medium Risk";
    return "High Risk";
  };

  const getRiskLevelColor = (score: number) => {
    if (score < 30) return "text-green-500";
    if (score < 70) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="glassmorphism animate-fade-in">
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
              <Shield className="h-6 w-6 text-green-500" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            )}
            <div>
              <p className="font-medium text-lg">
                {!result.suspicious && !result.malware && !result.phishing 
                  ? "This website appears to be safe" 
                  : "Warning: Suspicious website detected!"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {!result.suspicious && !result.malware && !result.phishing 
                  ? "Our analysis didn't detect any significant threats" 
                  : "This website shows characteristics commonly associated with malicious sites"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Risk Assessment</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Risk Score</span>
                    <span className={getRiskLevelColor(result.risk_score)}>
                      {getRiskLevelText(result.risk_score)}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        result.risk_score < 30 ? "bg-green-500" : 
                        result.risk_score < 70 ? "bg-amber-500" : "bg-red-500"
                      }`} 
                      style={{ width: `${result.risk_score}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between bg-background/50 p-2 rounded">
                    <span className="text-xs">Phishing</span>
                    <div className="flex items-center">
                      {result.phishing ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 p-2 rounded">
                    <span className="text-xs">Malware</span>
                    <div className="flex items-center">
                      {result.malware ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="border border-muted">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-3">Website Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">URL</span>
                    <span className="font-medium truncate max-w-[200px]" title={result.final_url}>{result.final_url}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Domain</span>
                    <span className="font-medium">{result.domain}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{result.category || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center text-sm text-muted-foreground">
                          Domain Rank
                          <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs w-48">Higher domain rank indicates a more established website.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="font-medium">{result.domain_rank || "Unknown"}/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border border-muted">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-3">Security Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">DNS Valid</span>
                    <span className={result.dns_valid ? "text-green-500" : "text-red-500"}>
                      {result.dns_valid ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Redirected</span>
                    <span className={result.redirected ? "text-amber-500" : "text-green-500"}>
                      {result.redirected ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Server</span>
                    <span className="font-medium">{result.server || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Adult Content</span>
                    <span className={result.adult ? "text-red-500" : "text-green-500"}>
                      {result.adult ? "Detected" : "None"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spam Activity</span>
                    <span className={result.spamming ? "text-red-500" : "text-green-500"}>
                      {result.spamming ? "Detected" : "None"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Safety Tips</h4>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">•</div>
                  <p>Always verify the website URL before entering personal information</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">•</div>
                  <p>Look for HTTPS and a padlock icon in the address bar</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">•</div>
                  <p>Be wary of websites asking for sensitive information via email links</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
