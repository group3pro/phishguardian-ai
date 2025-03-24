
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Brain, 
  Lock, 
  Activity, 
  RefreshCw, 
  BarChart3, 
  Terminal, 
  AlertTriangle, 
  CheckCircle, 
  MousePointerClick, 
  ArrowRight 
} from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import FeatureCard from "@/components/ui/FeatureCard";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="relative pt-24 overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 pb-20 md:pt-20 md:pb-32 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm rounded-full bg-primary/10 text-primary animate-fade-in">
          <Shield className="h-4 w-4 mr-2" />
          <span>AI-powered email protection</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight animate-fade-in text-balance">
          Protect Your Inbox with <span className="text-gradient">AI-Powered</span> Phishing Detection
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in text-balance">
          Our advanced AI system detects and blocks sophisticated phishing attempts that traditional filters miss.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Button asChild size="lg" className="gap-2">
            <Link to="/scanner">
              Try Email Scanner <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-3xl animate-fade-in">
          <div className="text-center px-4 py-5 glassmorphism rounded-xl">
            <p className="text-3xl font-bold text-primary">99.7%</p>
            <p className="text-sm text-muted-foreground">Detection Rate</p>
          </div>
          <div className="text-center px-4 py-5 glassmorphism rounded-xl">
            <p className="text-3xl font-bold text-primary">0.001%</p>
            <p className="text-sm text-muted-foreground">False Positives</p>
          </div>
          <div className="text-center px-4 py-5 glassmorphism rounded-xl">
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground">Protection</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Advanced AI Protection Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Our system uses sophisticated machine learning and natural language processing to identify and block malicious emails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Brain}
            title="Machine Learning Detection"
            description="Continuously learning algorithms identify new phishing patterns and techniques as they emerge."
          />
          <FeatureCard
            icon={Terminal}
            title="NLP Content Analysis"
            description="Natural Language Processing analyzes email content to detect suspicious language patterns."
          />
          <FeatureCard
            icon={Lock}
            title="Link & Attachment Scanning"
            description="Deep scanning of links and attachments to identify malicious content before you click."
          />
          <FeatureCard
            icon={Activity}
            title="Real-time Protection"
            description="Instant analysis and protection against phishing attempts as they arrive in your inbox."
          />
          <FeatureCard
            icon={RefreshCw}
            title="Adaptive Security"
            description="Self-improving system that adapts to new threats and phishing techniques automatically."
          />
          <FeatureCard
            icon={BarChart3}
            title="Reduced False Positives"
            description="Smart classification ensures legitimate emails aren't incorrectly flagged as threats."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How PhishGuardian AI Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Our multi-layered approach ensures comprehensive protection against even the most sophisticated phishing attempts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="glassmorphism border-primary/10 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600" />
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MousePointerClick className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-3">1. Email Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI scans incoming emails, analyzing sender details, email content, links, and attachments for suspicious patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-primary/10 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600" />
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-3">2. Threat Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models compare against millions of known phishing attempts to identify potential threats.
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-primary/10 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600" />
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-3">3. Protection Action</h3>
                <p className="text-sm text-muted-foreground">
                  Suspicious emails are flagged or quarantined, while detailed threat analysis is provided to users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto glassmorphism rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                Experience AI-powered phishing protection
              </h2>
              <p className="text-muted-foreground mb-6 text-balance">
                Try our advanced email scanner now to analyze suspicious emails and protect yourself from phishing attacks.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link to="/scanner">
                  Try Scanner Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />
              <div className="relative w-32 h-32 rounded-full glassmorphism flex items-center justify-center shadow-sm">
                <Shield className="h-16 w-16 text-primary/80" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
