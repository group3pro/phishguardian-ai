
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2 } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { toast } from "sonner";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your cybersecurity assistant. Ask me anything about phishing, security threats, or best practices to stay safe online.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API call with mock responses about cybersecurity
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const securityResponses = [
        "Phishing emails often create a sense of urgency to trick you into acting quickly without thinking.",
        "Always verify the sender's email address carefully. Phishers often use domains that look similar to legitimate ones.",
        "Be cautious of unsolicited emails asking for personal information or credentials.",
        "Enable two-factor authentication wherever possible to add an extra layer of security.",
        "Keep your software and operating systems updated to protect against known vulnerabilities.",
        "Use strong, unique passwords for each of your accounts.",
        "Hover over links before clicking to verify the actual URL destination.",
        "Be wary of emails with poor grammar or spelling errors, as these are common in phishing attempts.",
        "Never share sensitive information via email, even if the request seems legitimate.",
        "If an offer seems too good to be true, it probably is - be skeptical of unexpected winnings or rewards."
      ];
      
      const randomResponse = securityResponses[Math.floor(Math.random() * securityResponses.length)];
      
      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-16">
      <AnimatedBackground className="opacity-30" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Security Chatbot</h1>
              <p className="text-muted-foreground">Ask questions about cybersecurity and get instant answers</p>
            </div>
          </div>
          
          <Card className="glassmorphism min-h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Chat with Security Assistant</CardTitle>
              <CardDescription>
                Get answers about phishing, scams, and online security
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[400px] pr-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${
                        message.role === "assistant"
                          ? "bg-secondary/60 rounded-tl-none"
                          : "bg-primary text-primary-foreground rounded-tr-none"
                      } p-3 rounded-lg`}
                    >
                      <div className="w-6 h-6 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your security question..."
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
