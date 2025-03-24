
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Globe, Link2, Loader2, Shield } from "lucide-react";
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
    
    // For now, we'll use the email analysis for all types
    if (activeTab === "email") {
      analyzeEmail(emailContent);
    } else if (activeTab === "website") {
      analyzeEmail(websiteUrl); // We're reusing the email analyzer for demo
    } else if (activeTab === "link") {
      analyzeEmail(linkUrl); // We're reusing the email analyzer for demo
    }
  };

  const handleReset = () => {
    setEmailContent("");
    setWebsiteUrl("");
    setLinkUrl("");
    resetAnalysis();
  };

  return (
    <div className="relative min-h-screen pt-16">
      <AnimatedBackground className="opacity-30" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.firstName || "User"}</h1>
              <p className="text-muted-foreground">Analyze suspicious content with PhishGuardian AI</p>
            </div>
          </div>
          
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Phishing Analysis Tool</CardTitle>
              <CardDescription>
                Enter suspicious content for AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                  </TabsTrigger>
                  <TabsTrigger value="link" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    <span>Link</span>
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
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={handleAnalyze} 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      "Analyze Now"
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
          
          {analysisResult && (
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
