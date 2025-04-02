
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Shield, AlertTriangle, Loader2, CheckCircle, X } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { toast } from "sonner";

const LinkChecker = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isSafe: boolean;
    threatType: string | null;
    score: number;
    details: {
      domainAge: string;
      ssl: boolean;
      redirects: number;
      blacklisted: boolean;
      suspiciousPatterns: boolean;
    };
  } | null>(null);

  const checkLink = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Add http:// if missing
      let formattedUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        formattedUrl = "http://" + url;
      }
      
      // Simulate API call with mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, create a suspicious rating based on some patterns
      const hasSpecialChars = /[~!@#$%^&*()=+{}[\]|\\:;'",<>?]/.test(formattedUrl);
      const hasManySubdomains = (formattedUrl.match(/\./g) || []).length > 2;
      const hasNumbers = /\d/.test(formattedUrl.replace(/https?:\/\//, '').split('/')[0]);
      const isVeryLong = formattedUrl.length > 100;
      const hasCommonBrandName = /paypal|apple|microsoft|amazon|netflix|google|bank/i.test(formattedUrl);
      const hasSuspiciousWords = /secure|verify|account|login|signin|update|confirm/i.test(formattedUrl);
      
      // Calculate suspiciousness score (0-100)
      let suspiciousScore = 0;
      if (hasSpecialChars) suspiciousScore += 20;
      if (hasManySubdomains) suspiciousScore += 15;
      if (hasNumbers) suspiciousScore += 10;
      if (isVeryLong) suspiciousScore += 15;
      if (hasCommonBrandName && hasSuspiciousWords) suspiciousScore += 30;
      
      // Randomly add some more points for demo variety
      suspiciousScore += Math.floor(Math.random() * 20);
      
      // Cap at 100
      suspiciousScore = Math.min(suspiciousScore, 100);
      
      // For the demo, determine if it's blacklisted
      const blacklisted = suspiciousScore > 75;
      
      // Determine threat type
      let threatType = null;
      if (suspiciousScore > 75) {
        threatType = "Phishing";
      } else if (suspiciousScore > 50) {
        threatType = "Suspicious";
      }
      
      setResult({
        isSafe: suspiciousScore < 50,
        threatType,
        score: suspiciousScore,
        details: {
          domainAge: Math.floor(Math.random() * 365) + " days",
          ssl: Math.random() > 0.3,
          redirects: Math.floor(Math.random() * 3),
          blacklisted,
          suspiciousPatterns: hasSpecialChars || hasManySubdomains || isVeryLong
        }
      });
      
      if (suspiciousScore < 30) {
        toast.success("Link appears to be safe");
      } else if (suspiciousScore < 50) {
        toast.info("Link appears to be low risk");
      } else if (suspiciousScore < 75) {
        toast.warning("Link appears to be suspicious");
      } else {
        toast.error("Warning! This link is potentially dangerous");
      }
    } catch (error) {
      console.error("Error checking link:", error);
      toast.error("Failed to check link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-16">
      <AnimatedBackground className="opacity-30" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Link2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Suspicious Link Checker</h1>
              <p className="text-muted-foreground">Verify if a link is safe before clicking</p>
            </div>
          </div>
          
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Analyze URL</CardTitle>
              <CardDescription>
                Enter a URL to check if it's potentially dangerous or malicious
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter URL (e.g., example.com or https://example.com)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={checkLink} 
                      disabled={isLoading || !url.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
                        </>
                      ) : (
                        "Check"
                      )}
                    </Button>
                  </div>
                </div>

                {result && (
                  <div className="animate-fade-in">
                    <div className={`flex items-center gap-3 p-4 rounded-lg mb-4 ${
                      result.isSafe 
                        ? "bg-green-500/10 border border-green-500/20" 
                        : "bg-red-500/10 border border-red-500/20"
                    }`}>
                      {result.isSafe ? (
                        <Shield className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {result.isSafe 
                            ? "This link appears to be safe" 
                            : `Warning: ${result.threatType || "Suspicious"} link detected!`}
                        </p>
                        <p className="text-sm opacity-80">
                          {result.isSafe 
                            ? "Our analysis didn't detect any significant threats" 
                            : "This link shows characteristics commonly associated with malicious sites"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm mb-2">Threat score:</p>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            result.score < 30 ? "bg-green-500" : 
                            result.score < 50 ? "bg-blue-500" : 
                            result.score < 75 ? "bg-amber-500" : "bg-red-500"
                          }`} 
                          style={{ width: `${result.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Safe</span>
                        <span>Dangerous</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Detailed Analysis:</h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Domain Age:</span>
                        <span>{result.details.domainAge}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">SSL Certificate:</span>
                        <span className="flex items-center">
                          {result.details.ssl ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Valid
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-red-500 mr-1" /> Missing
                            </>
                          )}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Redirects:</span>
                        <span>{result.details.redirects}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Blacklisted:</span>
                        <span className={result.details.blacklisted ? "text-red-500" : "text-green-500"}>
                          {result.details.blacklisted ? "Yes" : "No"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Suspicious Patterns:</span>
                        <span className={result.details.suspiciousPatterns ? "text-amber-500" : "text-green-500"}>
                          {result.details.suspiciousPatterns ? "Detected" : "None"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkChecker;
