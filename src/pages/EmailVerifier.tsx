
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertTriangle, Loader2, Info, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { verifyEmail, EmailVerificationResult } from "@/services/emailVerificationService";

const EmailVerifier = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmailVerificationResult | null>(null);

  const handleVerifyEmail = async () => {
    if (!email.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const data = await verifyEmail(email);
      if (data) {
        setResult(data);
      }
    } catch (error) {
      console.error("Error in email verification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getQualityScoreColor = (score: number) => {
    if (score > 0.7) return "text-green-500";
    if (score > 0.4) return "text-amber-500";
    return "text-red-500";
  };

  const getQualityScoreText = (score: number) => {
    if (score > 0.7) return "High";
    if (score > 0.4) return "Medium";
    return "Low";
  };

  const getQualityScoreDescription = (score: number) => {
    if (score > 0.7) return "This email appears to be valid and deliverable";
    if (score > 0.4) return "This email might have some deliverability issues";
    return "This email is unlikely to be valid or deliverable";
  };

  return (
    <div className="relative">
      {!result && (
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      )}
      {!result && (
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      )}
      
      <Card className="glassmorphism border-0 shadow-md bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Verification Tool
          </CardTitle>
          <CardDescription>
            Check if an email address is valid and deliverable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleVerifyEmail} 
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </div>

            {result && (
              <div className="animate-fade-in space-y-4">
                {/* Result Header */}
                <div className={`p-4 rounded-lg ${
                  result.deliverability === "DELIVERABLE" 
                    ? "bg-green-500/10 border border-green-500/20" 
                    : result.deliverability === "UNKNOWN"
                      ? "bg-amber-500/10 border border-amber-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                }`}>
                  <div className="flex items-center gap-3">
                    {result.deliverability === "DELIVERABLE" ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : result.deliverability === "UNKNOWN" ? (
                      <Info className="h-6 w-6 text-amber-500" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    )}
                    <div>
                      <h3 className="text-lg font-medium mb-1">
                        {result.deliverability === "DELIVERABLE" 
                          ? "Email Appears Valid" 
                          : result.deliverability === "UNKNOWN"
                            ? "Verification Incomplete"
                            : "Validation Issues Found"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {result.deliverability === "DELIVERABLE" 
                          ? "This email address seems to be valid and deliverable" 
                          : result.deliverability === "UNKNOWN"
                            ? "We couldn't fully verify this email address"
                            : "This email address may not be valid or deliverable"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detail Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Summary Card */}
                  <Card className="overflow-hidden border border-muted">
                    <div className="bg-muted/50 px-4 py-2">
                      <h4 className="text-sm font-medium">Email Summary</h4>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Email:</span>
                          <span className="text-sm font-medium">{result.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Domain:</span>
                          <span className="text-sm font-medium">{result.domain}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="flex items-center">
                                <span className="text-sm text-muted-foreground">Quality Score:</span>
                                <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-60 text-xs">{getQualityScoreDescription(result.quality_score)}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-muted rounded-full mr-2 overflow-hidden">
                              <div 
                                className={`h-full ${
                                  result.quality_score > 0.7 ? "bg-green-500" : 
                                  result.quality_score > 0.4 ? "bg-amber-500" : "bg-red-500"
                                }`} 
                                style={{ width: `${result.quality_score * 100}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${getQualityScoreColor(result.quality_score)}`}>
                              {getQualityScoreText(result.quality_score)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Validation Card */}
                  <Card className="overflow-hidden border border-muted">
                    <div className="bg-muted/50 px-4 py-2">
                      <h4 className="text-sm font-medium">Validation Details</h4>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Format:</span>
                          <div className="flex items-center">
                            {result.is_valid_format ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <X className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm ${result.is_valid_format ? "text-green-500" : "text-red-500"}`}>
                              {result.is_valid_format ? "Valid" : "Invalid"}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Deliverable:</span>
                          <div className="flex items-center">
                            {result.deliverability === "DELIVERABLE" ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            ) : result.deliverability === "UNKNOWN" ? (
                              <Info className="h-4 w-4 text-amber-500 mr-1" />
                            ) : (
                              <X className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm ${
                              result.deliverability === "DELIVERABLE" ? "text-green-500" : 
                              result.deliverability === "UNKNOWN" ? "text-amber-500" : "text-red-500"
                            }`}>
                              {result.deliverability === "DELIVERABLE" ? "Yes" : 
                               result.deliverability === "UNKNOWN" ? "Unknown" : "No"}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Disposable:</span>
                          <div className="flex items-center">
                            {result.is_disposable_email ? (
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            )}
                            <span className={`text-sm ${result.is_disposable_email ? "text-red-500" : "text-green-500"}`}>
                              {result.is_disposable_email ? "Yes (Temporary)" : "No"}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Free Email:</span>
                          <div className="flex items-center">
                            <span className="text-sm">
                              {result.is_free_email ? "Yes (Gmail, Yahoo, etc.)" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerifier;
