
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Mail, ArrowRight, Lock, AlertTriangle, Database } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const Index = () => {
  return (
    <div className="relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm rounded-full bg-primary/10 text-primary">
              <Shield className="h-4 w-4 mr-2" />
              <span>AI-Powered Protection</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Secure Your Inbox with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                PhishGuardian AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced phishing detection powered by machine learning to keep your communications safe from threats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <Link to="/sign-up">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/sign-in">
                  <Button size="lg" variant="outline" className="gap-2">
                    Sign In <Lock className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2">
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
              <Link to="/scanner">
                <Button size="lg" variant="outline" className="gap-2">
                  Try Scanner <Mail className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">AI-Powered Protection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our advanced technology detects and blocks sophisticated phishing attempts in real-time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={AlertTriangle}
                title="Phishing Detection"
                description="Advanced algorithms identify malicious emails, websites, and links with high accuracy."
              />
              <FeatureCard
                icon={Database}
                title="Machine Learning"
                description="Our AI continuously improves from new threats to enhance protection against evolving attacks."
              />
              <FeatureCard
                icon={Lock}
                title="Real-time Protection"
                description="Instant analysis of suspicious content to keep you safe from emerging threats."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Yourself?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PhishGuardian to keep their communications safe
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <Link to="/sign-up">
                  <Button size="lg" className="gap-2">
                    Create Free Account <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2">
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
