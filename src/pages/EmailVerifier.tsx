
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { toast } from "sonner";

const EmailVerifier = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    disposable: boolean;
    deliverable: boolean;
    domain: string;
    formatValid: boolean;
  } | null>(null);

  const verifyEmail = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Simulate API call with mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const formatValid = emailRegex.test(email);
      
      // For demo purposes, let's consider some domains as "disposable" or "invalid"
      const domain = email.split('@')[1];
      const disposableDomains = ['tempmail.com', 'fakeemail.com', 'throwaway.com', 'mailinator.com'];
      const isDisposable = disposableDomains.includes(domain);
      
      // Deliverability check (just mocking the response)
      // In a real app, this would call an actual email verification API
      const isDeliverable = formatValid && !isDisposable && Math.random() > 0.2;
      
      // For demo purposes, valid if format correct, not disposable, and deliverable
      const isValid = formatValid && !isDisposable && isDeliverable;
      
      setResult({
        valid: isValid,
        disposable: isDisposable,
        deliverable: isDeliverable,
        domain,
        formatValid
      });
      
      if (isValid) {
        toast.success("Email appears to be valid");
      } else {
        toast.warning("Email validation found issues");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Failed to verify email. Please try again.");
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
                      onClick={verifyEmail} 
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
                      {result.valid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      )}
                      <span className="font-medium">
                        {result.valid 
                          ? "Email appears to be valid" 
                          : "Email validation found issues"}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Format:</span>
                        <span className={result.formatValid ? "text-green-500" : "text-red-500"}>
                          {result.formatValid ? "Valid" : "Invalid"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Domain:</span>
                        <span>{result.domain}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Disposable:</span>
                        <span className={result.disposable ? "text-red-500" : "text-green-500"}>
                          {result.disposable ? "Yes (Not recommended)" : "No"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Deliverable:</span>
                        <span className={result.deliverable ? "text-green-500" : "text-red-500"}>
                          {result.deliverable ? "Likely" : "Unlikely"}
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

export default EmailVerifier;
