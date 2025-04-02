
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Shield, AlertTriangle, Loader2, CheckCircle, X } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { checkLink, LinkCheckResult } from "@/services/linkCheckService";

const LinkChecker = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LinkCheckResult | null>(null);

  const handleCheckLink = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setResult(null);

    try {
      const data = await checkLink(url);
      if (data) {
        setResult(data);
      }
    } catch (error) {
      console.error("Error checking link:", error);
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
                      onClick={handleCheckLink} 
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
                      !result.suspicious && !result.malware && !result.phishing
                        ? "bg-green-500/10 border border-green-500/20" 
                        : "bg-red-500/10 border border-red-500/20"
                    }`}>
                      {!result.suspicious && !result.malware && !result.phishing ? (
                        <Shield className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {!result.suspicious && !result.malware && !result.phishing 
                            ? "This link appears to be safe" 
                            : `Warning: Suspicious link detected!`}
                        </p>
                        <p className="text-sm opacity-80">
                          {!result.suspicious && !result.malware && !result.phishing 
                            ? "Our analysis didn't detect any significant threats" 
                            : "This link shows characteristics commonly associated with malicious sites"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm mb-2">Risk score:</p>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            result.risk_score < 30 ? "bg-green-500" : 
                            result.risk_score < 50 ? "bg-blue-500" : 
                            result.risk_score < 75 ? "bg-amber-500" : "bg-red-500"
                          }`} 
                          style={{ width: `${result.risk_score}%` }}
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
                        <span className="text-muted-foreground">Domain:</span>
                        <span>{result.domain}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">DNS Valid:</span>
                        <span className="flex items-center">
                          {result.dns_valid ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Valid
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-red-500 mr-1" /> Invalid
                            </>
                          )}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Redirected:</span>
                        <span>{result.redirected ? "Yes" : "No"}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Phishing:</span>
                        <span className={result.phishing ? "text-red-500" : "text-green-500"}>
                          {result.phishing ? "Detected" : "Not Detected"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Malware:</span>
                        <span className={result.malware ? "text-red-500" : "text-green-500"}>
                          {result.malware ? "Detected" : "Not Detected"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{result.category || "Uncategorized"}</span>
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
