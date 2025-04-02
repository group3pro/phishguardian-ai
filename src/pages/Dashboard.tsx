
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Globe, Link2, Loader2, Shield, MessageSquare } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { usePhishingDetection } from "@/hooks/usePhishingDetection";
import PhishingScoreCard from "@/components/ui/PhishingScoreCard";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("email");
  const [emailContent, setEmailContent] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [emailToVerify, setEmailToVerify] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  
  const { analyzeEmail, isLoading, analysisResult, resetAnalysis } = usePhishingDetection();

  const handleAnalyze = () => {
    if (activeTab === "email" && !emailContent.trim()) {
      toast.error("Please enter email content to analyze");
      return;
    }
    
    if (activeTab === "website" && !websiteUrl.trim()) {
      toast.error("Please enter a website URL to analyze");
      return;
    }
    
    if (activeTab === "link" && !linkUrl.trim()) {
      toast.error("Please enter a link to analyze");
      return;
    }

    if (activeTab === "verify-email" && !emailToVerify.trim()) {
      toast.error("Please enter an email to verify");
      return;
    }
    
    if (activeTab === "chatbot" && !chatMessage.trim()) {
      toast.error("Please enter a message to send");
      return;
    }
    
    // For now, we'll use the email analysis for all types
    if (activeTab === "email") {
      analyzeEmail(emailContent);
    } else if (activeTab === "website") {
      analyzeEmail(websiteUrl); // We're reusing the email analyzer for demo
    } else if (activeTab === "link") {
      analyzeEmail(linkUrl); // We're reusing the email analyzer for demo
    } else if (activeTab === "verify-email") {
      // Email verification simulation
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1500)),
        {
          loading: 'Verifying email...',
          success: () => {
            // Simple validation for demonstration
            const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToVerify);
            return isValidFormat 
              ? `${emailToVerify} appears to be a valid email format` 
              : `${emailToVerify} doesn't appear to be a valid email format`;
          },
          error: 'Failed to verify email',
        }
      );
    } else if (activeTab === "chatbot") {
      // Chatbot simulation
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1500)),
        {
          loading: 'Processing your question...',
          success: () => {
            setChatMessage("");
            return "This is a simulated chatbot response. In a real implementation, this would connect to an AI service.";
          },
          error: 'Failed to get response',
        }
      );
    }
  };

  const handleReset = () => {
    setEmailContent("");
    setWebsiteUrl("");
    setLinkUrl("");
    setEmailToVerify("");
    setChatMessage("");
    resetAnalysis();
  };

  return (
    <div className="relative min-h-screen pt-16 pb-8">
      <AnimatedBackground className="opacity-30" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.firstName || "User"}</h1>
              <p className="text-muted-foreground">Access all PhishGuardian AI security tools in one place</p>
            </div>
          </div>
          
          <Card className="glassmorphism shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Security Tools Dashboard</CardTitle>
              <CardDescription>
                Select a tool to analyze or verify suspicious content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6 gap-1">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">Website</span>
                  </TabsTrigger>
                  <TabsTrigger value="link" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Link</span>
                  </TabsTrigger>
                  <TabsTrigger value="verify-email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email Verifier</span>
                  </TabsTrigger>
                  <TabsTrigger value="chatbot" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Chatbot</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4">
                  <div>
                    <Textarea 
                      placeholder="Paste suspicious email content here..." 
                      className="min-h-[200px]"
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="website" className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Enter website URL (e.g., https://suspicious-site.com)" 
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="link" className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Enter suspicious link" 
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="verify-email" className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Enter email address to verify" 
                      type="email"
                      value={emailToVerify}
                      onChange={(e) => setEmailToVerify(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="chatbot" className="space-y-4">
                  <div>
                    <Textarea 
                      placeholder="Ask a question about phishing or cybersecurity..." 
                      className="min-h-[150px]"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button 
                    onClick={handleAnalyze} 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        {activeTab === "email" || activeTab === "website" || activeTab === "link" 
                          ? "Analyzing..." 
                          : activeTab === "verify-email" 
                            ? "Verifying..." 
                            : "Processing..."}
                      </>
                    ) : (
                      activeTab === "email" || activeTab === "website" || activeTab === "link" 
                        ? "Analyze Now" 
                        : activeTab === "verify-email" 
                          ? "Verify Email" 
                          : "Send Message"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    Reset
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {analysisResult && (activeTab === "email" || activeTab === "website" || activeTab === "link") && (
            <div className="mt-8 animate-fade-in">
              <PhishingScoreCard result={analysisResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
