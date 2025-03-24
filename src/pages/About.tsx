
import React from "react";
import { Shield, Brain, Eye, AlertTriangle, Lock, RefreshCw } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="relative pt-24 min-h-screen">
      <AnimatedBackground className="opacity-50" />

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-sm rounded-full bg-primary/10 text-primary">
            <Shield className="h-4 w-4 mr-2" />
            <span>About Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How PhishGuardian AI Works
          </h1>
          <p className="text-muted-foreground text-balance">
            Learn about our advanced AI-powered phishing detection technology and how it keeps you safe
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Technology Overview */}
          <section className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4">Advanced AI Technology</h2>
              <p className="text-muted-foreground mb-4">
                PhishGuardian AI uses sophisticated machine learning algorithms and natural language processing to identify and block malicious emails that traditional filters often miss.
              </p>
              <p className="text-muted-foreground">
                Our system analyzes thousands of data points in each email, including sender information, content patterns, link destinations, and linguistic cues to accurately identify phishing attempts.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
                <div className="relative w-48 h-48 rounded-full glassmorphism flex items-center justify-center">
                  <Brain className="h-20 w-20 text-primary/70" />
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Key Protection Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glassmorphism rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Real-time Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Our system analyzes emails in real-time, providing immediate protection against phishing attempts as they arrive in your inbox.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Sophisticated Threat Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Multi-layered analysis identifies complex phishing patterns that evolve over time, keeping you protected against new threats.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Link & Content Scanning</h3>
                    <p className="text-sm text-muted-foreground">
                      Deep scanning of links, attachments, and content to identify malicious elements before they can cause harm.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Adaptive Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Self-improving system that continuously learns from new threats, adapting to evolving phishing techniques automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">The Technology Behind PhishGuardian</h2>
            <div className="glassmorphism rounded-xl p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Machine Learning Classification</h3>
                <p className="text-muted-foreground">
                  Our core engine uses advanced machine learning classification algorithms trained on millions of phishing emails and legitimate communications. This enables the system to identify patterns that indicate phishing attempts, even when they use sophisticated tactics to evade detection.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Natural Language Processing</h3>
                <p className="text-muted-foreground">
                  We employ state-of-the-art NLP techniques to analyze the linguistic content of emails, detecting suspicious language patterns, urgency indicators, and other textual red flags commonly used in phishing attempts.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Behavioral Analysis</h3>
                <p className="text-muted-foreground">
                  Our system goes beyond content analysis by examining sender behavior patterns, email metadata, and contextual signals to identify suspicious communications that might otherwise appear legitimate.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Continuous Improvement</h3>
                <p className="text-muted-foreground">
                  PhishGuardian AI continuously learns from new phishing attempts, incorporating feedback loops and regular model updates to stay ahead of evolving threats and techniques used by malicious actors.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center pb-8">
            <h2 className="text-2xl font-bold mb-6">Try PhishGuardian AI Today</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Experience the power of our advanced AI phishing detection technology. Analyze suspicious emails and protect yourself from sophisticated phishing attempts.
            </p>
            <Button asChild size="lg">
              <Link to="/scanner">Try Email Scanner</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
