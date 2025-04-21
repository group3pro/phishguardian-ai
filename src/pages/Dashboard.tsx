import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Globe, Link2, Loader2, Shield, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { usePhishingDetection } from "@/hooks/usePhishingDetection";
import PhishingScoreCard from "@/components/ui/PhishingScoreCard";
import { toast } from "sonner";
import { verifyEmail, EmailVerificationResult } from "@/services/emailVerificationService";
import { checkLink, LinkCheckResult } from "@/services/linkCheckService";
import { getAIResponse, ChatMessage } from "@/services/chatbotService";

const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("email");
  const [emailContent, setEmailContent] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [emailToVerify, setEmailToVerify] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "assistant", content: "Ask me anything about cybersecurity!" }
  ]);

  const [emailVerifyResult, setEmailVerifyResult] = useState<EmailVerificationResult | null>(null);
  const [linkCheckResult, setLinkCheckResult] = useState<LinkCheckResult | null>(null);
  
  const { analyzeEmail, isLoading, analysisResult, resetAnalysis } = usePhishingDetection();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const handleAnalyze = async () => {
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
    
    if (activeTab === "email") {
      analyzeEmail(emailContent);
    } else if (activeTab === "website" || activeTab === "link") {
      const urlToCheck = activeTab === "website" ? websiteUrl : linkUrl;
      setLinkLoading(true);
      setLinkCheckResult(null);
      try {
        const result = await checkLink(urlToCheck);
        if (result) {
          setLinkCheckResult(result);
        }
      } catch (error) {
        console.error("Error checking link:", error);
      } finally {
        setLinkLoading(false);
      }
    } else if (activeTab === "verify-email") {
      setVerifyLoading(true);
      setEmailVerifyResult(null);
      try {
        const result = await verifyEmail(emailToVerify);
        if (result) {
          setEmailVerifyResult(result);
        }
      } catch (error) {
        console.error("Error verifying email:", error);
      } finally {
        setVerifyLoading(false);
      }
    } else if (activeTab === "chatbot") {
      setChatLoading(true);
      const userMessage: ChatMessage = {
        role: "user",
        content: chatMessage
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      setChatMessage("");
      
      try {
        const response = await getAIResponse([...chatHistory, userMessage]);
        setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
      } catch (error) {
        console.error("Error getting chatbot response:", error);
        toast.error("Failed to get a response");
      } finally {
        setChatLoading(false);
      }
    }
  };

  const handleReset = () => {
    if (activeTab === "email") {
      setEmailContent("");
      resetAnalysis();
    } else if (activeTab === "website") {
      setWebsiteUrl("");
      resetAnalysis();
    } else if (activeTab === "link") {
      setLinkUrl("");
      setLinkCheckResult(null);
    } else if (activeTab === "verify-email") {
      setEmailToVerify("");
      setEmailVerifyResult(null);
    } else if (activeTab === "chatbot") {
      setChatHistory([{ role: "assistant", content: "Ask me anything about cybersecurity!" }]);
    }
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
                  <div className="border rounded-md p-3 h-[200px] overflow-y-auto mb-3">
                    {chatHistory.map((message, index) => (
                      <div 
                        key={index}
                        className={`flex mb-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                      >
                        <div 
                          className={`p-2 rounded-lg max-w-[80%] ${
                            message.role === "assistant" 
                              ? "bg-secondary/60 text-foreground" 
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Input 
                      placeholder="Ask a question about phishing or cybersecurity..." 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button 
                    onClick={handleAnalyze} 
                    className="flex-1"
                    disabled={isLoading || verifyLoading || linkLoading || chatLoading}
                  >
                    {(isLoading || verifyLoading || linkLoading || chatLoading) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        {activeTab === "email" || activeTab === "website" 
                          ? "Analyzing..." 
                          : activeTab === "verify-email" 
                            ? "Verifying..." 
                            : activeTab === "link"
                              ? "Checking..."
                              : "Processing..."}
                      </>
                    ) : (
                      activeTab === "email" || activeTab === "website" 
                        ? "Analyze Now" 
                        : activeTab === "verify-email" 
                          ? "Verify Email" 
                          : activeTab === "link"
                            ? "Check Link"
                            : "Send Message"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isLoading || verifyLoading || linkLoading || chatLoading}
                  >
                    Reset
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {analysisResult && (activeTab === "email" || activeTab === "website") && (
            <div className="mt-8 animate-fade-in">
              <PhishingScoreCard result={analysisResult} />
            </div>
          )}

          {linkCheckResult && activeTab === "link" && (
            <div className="mt-8 animate-fade-in">
              <Card className="glassmorphism shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Link Analysis Results</CardTitle>
                    <div className="flex items-center space-x-2">
                      {!linkCheckResult.suspicious && !linkCheckResult.malware && !linkCheckResult.phishing ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${
                    !linkCheckResult.suspicious && !linkCheckResult.malware && !linkCheckResult.phishing
                      ? "bg-green-500/10 border border-green-500/20" 
                      : "bg-red-500/10 border border-red-500/20"
                  }`}>
                    {!linkCheckResult.suspicious && !linkCheckResult.malware && !linkCheckResult.phishing ? (
                      <Shield className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        {!linkCheckResult.suspicious && !linkCheckResult.malware && !linkCheckResult.phishing 
                          ? "This link appears to be safe" 
                          : `Warning: Suspicious link detected!`}
                      </p>
                      <p className="text-sm opacity-80">
                        {!linkCheckResult.suspicious && !linkCheckResult.malware && !linkCheckResult.phishing 
                          ? "Our analysis didn't detect any significant threats" 
                          : "This link shows characteristics commonly associated with malicious sites"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Domain Information</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Domain:</span>
                          <span className="font-medium">{linkCheckResult.domain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-medium">{linkCheckResult.category || "Uncategorized"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Server:</span>
                          <span className="font-medium">{linkCheckResult.server || "Unknown"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Security Flags</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phishing:</span>
                          <span className={linkCheckResult.phishing ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                            {linkCheckResult.phishing ? "Detected" : "Not Detected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Malware:</span>
                          <span className={linkCheckResult.malware ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                            {linkCheckResult.malware ? "Detected" : "Not Detected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Suspicious:</span>
                          <span className={linkCheckResult.suspicious ? "text-amber-500 font-medium" : "text-green-500 font-medium"}>
                            {linkCheckResult.suspicious ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {emailVerifyResult && activeTab === "verify-email" && (
            <div className="mt-8 animate-fade-in">
              <Card className="glassmorphism shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Email Verification Results</CardTitle>
                    <div className="flex items-center space-x-2">
                      {emailVerifyResult.deliverability === "DELIVERABLE" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : emailVerifyResult.deliverability === "UNKNOWN" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    emailVerifyResult.deliverability === "DELIVERABLE" && !emailVerifyResult.is_disposable_email
                      ? "bg-green-500/10 border border-green-500/20" 
                      : emailVerifyResult.deliverability === "UNKNOWN"
                        ? "bg-amber-500/10 border border-amber-500/20"
                        : "bg-red-500/10 border border-red-500/20"
                  }`}>
                    <p className="font-medium">
                      {emailVerifyResult.deliverability === "DELIVERABLE" 
                        ? "Email appears to be valid and deliverable" 
                        : emailVerifyResult.deliverability === "UNKNOWN"
                          ? "Email verification service unavailable - format check only"
                          : "This email may have deliverability issues"}
                    </p>
                    <p className="text-sm opacity-80 mt-1">
                      {emailVerifyResult.deliverability !== "UNKNOWN" 
                        ? `Quality score: ${(emailVerifyResult.quality_score * 100).toFixed(0)}%`
                        : "No quality score available - verification service down"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 text-sm">
                      <h4 className="font-medium">Format Analysis</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Format Valid:</span>
                          <span className={emailVerifyResult.is_valid_format ? "text-green-500" : "text-red-500"}>
                            {emailVerifyResult.is_valid_format ? "Yes" : "No"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Domain:</span>
                          <span>{emailVerifyResult.domain}</span>
                        </div>
                        {emailVerifyResult.deliverability !== "UNKNOWN" && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Free Email:</span>
                            <span>{emailVerifyResult.is_free_email ? "Yes" : "No"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <h4 className="font-medium">Security Flags</h4>
                      <div className="space-y-1">
                        {emailVerifyResult.deliverability !== "UNKNOWN" && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Disposable Email:</span>
                            <span className={emailVerifyResult.is_disposable_email ? "text-red-500" : "text-green-500"}>
                              {emailVerifyResult.is_disposable_email ? "Yes (Not recommended)" : "No"}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Verification:</span>
                          <span className={
                            emailVerifyResult.deliverability === "DELIVERABLE" ? "text-green-500" : 
                            emailVerifyResult.deliverability === "UNKNOWN" ? "text-amber-500" : "text-red-500"
                          }>
                            {emailVerifyResult.deliverability === "DELIVERABLE" ? "Verified" : 
                             emailVerifyResult.deliverability === "UNKNOWN" ? "Service Unavailable" : "Failed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
