
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Globe, Link2, MessageSquare, Shield } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { EmailAnalyzer } from "@/components/dashboard/EmailAnalyzer";
import { WebsiteAnalyzer } from "@/components/dashboard/WebsiteAnalyzer";
import { SecurityChat } from "@/components/dashboard/SecurityChat";
import EmailVerifier from "@/pages/EmailVerifier";  // Import the EmailVerifier page

const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("email");

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
                <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-6 gap-1">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">Website</span>
                  </TabsTrigger>
                  <TabsTrigger value="chatbot" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Chatbot</span>
                  </TabsTrigger>
                  <TabsTrigger value="email-verify" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email Verify</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <EmailAnalyzer />
                </TabsContent>
                
                <TabsContent value="website">
                  <WebsiteAnalyzer />
                </TabsContent>
                
                <TabsContent value="chatbot">
                  <SecurityChat />
                </TabsContent>
                
                <TabsContent value="email-verify">
                  <EmailVerifier />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

