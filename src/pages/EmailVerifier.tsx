
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
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

  return (
    <div className="relative min-h-screen pt-16">
      <AnimatedBackground className="opacity-30" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Email Verifier</h1>
              <p className="text-muted-foreground">Check if an email address is valid and deliverable</p>
            </div>
          </div>
          
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Verify Email Address</CardTitle>
              <CardDescription>
                Enter an email address to verify its validity and deliverability
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
                  <div className="animate-fade-in bg-card border rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      {result.deliverability === "DELIVERABLE" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      )}
                      <span className="font-medium">
                        {result.deliverability === "DELIVERABLE" 
                          ? "Email appears to be valid" 
                          : "Email validation found issues"}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Format:</span>
                        <span className={result.is_valid_format ? "text-green-500" : "text-red-500"}>
                          {result.is_valid_format ? "Valid" : "Invalid"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Domain:</span>
                        <span>{result.domain}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Disposable:</span>
                        <span className={result.is_disposable_email ? "text-red-500" : "text-green-500"}>
                          {result.is_disposable_email ? "Yes (Not recommended)" : "No"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Deliverable:</span>
                        <span className={result.deliverability === "DELIVERABLE" ? "text-green-500" : "text-red-500"}>
                          {result.deliverability === "DELIVERABLE" ? "Likely" : "Unlikely"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Quality Score:</span>
                        <span>{(result.quality_score * 100).toFixed(0)}%</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Free Email:</span>
                        <span>{result.is_free_email ? "Yes" : "No"}</span>
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

export default EmailVerifier;
