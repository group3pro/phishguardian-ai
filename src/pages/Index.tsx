
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Mail, ArrowRight, Lock, AlertTriangle, Database, MessageSquare, Link2 } from "lucide-react";
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={Mail}
                title="Email Analysis"
                description="Check suspicious emails for phishing attempts and security threats."
              />
              <FeatureCard
                icon={Link2}
                title="Link Checker"
                description="Verify if links are safe before clicking to avoid malicious websites."
              />
              <FeatureCard
                icon={MessageSquare}
                title="Security Chatbot"
                description="Get instant answers to your cybersecurity questions."
              />
              <FeatureCard
                icon={AlertTriangle}
                title="Email Verification"
                description="Verify if an email address is real, legitimate, and deliverable."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Security Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Protect yourself against cyber threats with our suite of security tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/scanner" className="group">
                <div className="border rounded-lg p-6 h-full transition-all hover:shadow-md hover:border-primary/40 hover:bg-muted/50">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Content Scanner</h3>
                  <p className="text-muted-foreground mb-4">Analyze email content to detect phishing attempts and threats.</p>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Try Scanner
                  </Button>
                </div>
              </Link>

              <Link to="/link-checker" className="group">
                <div className="border rounded-lg p-6 h-full transition-all hover:shadow-md hover:border-primary/40 hover:bg-muted/50">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Link2 className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Suspicious Link Checker</h3>
                  <p className="text-muted-foreground mb-4">Verify if links are safe before clicking to protect your digital identity.</p>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Check Links
                  </Button>
                </div>
              </Link>

              <Link to="/email-verifier" className="group">
                <div className="border rounded-lg p-6 h-full transition-all hover:shadow-md hover:border-primary/40 hover:bg-muted/50">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Address Verification</h3>
                  <p className="text-muted-foreground mb-4">Verify if an email address is legitimate, deliverable, and not disposable.</p>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Verify Emails
                  </Button>
                </div>
              </Link>

              <Link to="/chatbot" className="group">
                <div className="border rounded-lg p-6 h-full transition-all hover:shadow-md hover:border-primary/40 hover:bg-muted/50">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Security Chatbot</h3>
                  <p className="text-muted-foreground mb-4">Get instant answers to your cybersecurity questions and concerns.</p>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Chat Now
                  </Button>
                </div>
              </Link>
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
